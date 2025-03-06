'use client'; // Mark this component as a client component

import React, { useEffect, useRef, useCallback } from 'react';

interface JanusMessage {
  janus: string;
  session_id?: number;
  sender?: number;
  transaction?: string;
  data?: {
    id: number;
  };
  plugindata?: {
    data?: {
      streaming?: string;
      error?: string;
    };
  };
  candidate?: RTCIceCandidate;
  sdp?: RTCSessionDescriptionInit;
}

const StreamClientComponent = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const ws = useRef<WebSocket | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);

  // Function to send a message over the WebSocket
  const sendJanusMessage = useCallback((socket: WebSocket, message: object) => {
    console.log('Sending message to Janus:', message);
    socket.send(JSON.stringify(message));
  }, []);

  // Function to handle incoming Janus messages
  const handleJanusMessage = useCallback((msg: JanusMessage) => {
    console.log('Received message from Janus:', msg);

    if (msg.janus === 'success' && msg.transaction === 'create-session') {
      const session_id = msg.data?.id;
      console.log('Janus Session Created:', session_id);
      if (session_id) {
        // Attach to Streaming Plugin
        sendJanusMessage(ws.current!, {
          janus: 'attach',
          plugin: 'janus.plugin.streaming',
          session_id: session_id,
          transaction: 'attach-streaming'
        });
      }
    } else if (msg.janus === 'success' && msg.transaction === 'attach-streaming') {
      const plugin_handle_id = msg.data?.id;
      console.log('Streaming Plugin attached:', plugin_handle_id);
      if (plugin_handle_id) {
        // Watch Stream (Mountpoint ID "ffmpeg-stream-test" in this example)
        sendJanusMessage(ws.current!, {
          janus: 'message',
          session_id: msg.session_id!,
          handle_id: plugin_handle_id,
          transaction: 'watch-stream',
          body: {
            request: 'watch',
            id: 1 // Mountpoint ID from janus.plugin.streaming.jcfg
          }
        });
      }
    } else if (msg.janus === 'webrtc_offer') {
      console.log('Received WebRTC Offer:', msg.sdp);
      startPeerConnection(msg);
    } else if (msg.janus === 'event' && msg.plugindata?.data?.streaming === 'started') {
      console.log('Streaming started');
    } else if (msg.janus === 'event' && msg.plugindata?.data?.error) {
      console.error('Janus Streaming Error:', msg.plugindata.data.error);
    } else if (msg.janus === 'trickle' && msg.candidate) {
      if (pc.current) {
        pc.current.addIceCandidate(new RTCIceCandidate(msg.candidate));
        console.log('Added ICE candidate:', msg.candidate);
      }
    }
    // Handle other Janus messages as needed (e.g., errors, stream status updates)
  }, [sendJanusMessage]);

  // Function to start the WebRTC peer connection
  const startPeerConnection = useCallback(async (offerMsg: JanusMessage) => {
    pc.current = new RTCPeerConnection();

    pc.current.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
        console.log('Track added:', event);
      }
    };

    pc.current.onicecandidate = (event) => {
      if (event.candidate) {
        sendJanusMessage(ws.current!, {
          janus: 'trickle',
          session_id: offerMsg.session_id!,
          handle_id: offerMsg.sender!,
          candidate: event.candidate,
          transaction: 'trickle-ice'
        });
        console.log('Sent ICE candidate to Janus:', event.candidate);
      }
    };

    if (offerMsg.sdp) {
      await pc.current.setRemoteDescription(new RTCSessionDescription(offerMsg.sdp));
      const answer = await pc.current.createAnswer();
      await pc.current.setLocalDescription(answer);

      sendJanusMessage(ws.current!, {
        janus: 'message',
        session_id: offerMsg.session_id!,
        handle_id: offerMsg.sender!,
        transaction: 'send-answer',
        body: {
          request: 'start',
        },
        jsep: {
          type: 'answer',
          sdp: answer.sdp
        }
      });
      console.log('Sent SDP answer to Janus:', answer.sdp);
    }
  }, [sendJanusMessage]);

  useEffect(() => {
    // Initialize WebSocket connection on component mount
    ws.current = new WebSocket('ws://82.157.19.21:28188', 'janus-protocol');

    ws.current.onopen = () => {
      console.log('WebSocket connected');
      // 1. Create Janus Session
      if (ws.current) {
        sendJanusMessage(ws.current, {
          janus: 'create',
          transaction: 'create-session' // Example transaction ID
        });
      }
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      handleJanusMessage(msg);
    };

    ws.current.onclose = () => {
      console.log('WebSocket closed');
    };

    ws.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.close();
      }
    };
  }, [handleJanusMessage, sendJanusMessage]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" autoPlay controls muted />
    </div>
  );
};

export default StreamClientComponent;
