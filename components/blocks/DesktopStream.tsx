"use client";
import { useEffect, useRef, useState } from "react";

// Janus WebSocket URL
const SIGNALING_SERVER_URL = "ws://82.157.19.21:28188"; // Updated to use your public port

const DesktopStream = ({ userId }: { userId: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    console.log("DesktopStream component rendered, userId:", userId); // ADD THIS LINE

    // Establish WebSocket connection with Janus server
    wsRef.current = new WebSocket(SIGNALING_SERVER_URL, 'janus-protocol');

    wsRef.current.onopen = () => {
      console.log("WebSocket onopen"); // ADD THIS LINE
      setStatus("Connected to signaling server");

      // Step 1: Create a session with Janus
      wsRef.current?.send(
        JSON.stringify({
          janus: "create",
          transaction: Math.random().toString(36).substring(7), // Unique transaction ID
        })
      );
    };

    wsRef.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
      setStatus("Failed to connect to the signaling server");
    };

    wsRef.current.onclose = (event) => {
      console.log("WebSocket onclose:", event.code, event.reason);
      setStatus("WebSocket connection closed");
    };

    wsRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      console.log("Received from Janus:", data);

      if (data.janus === "success") {
        if (data.janus === "success" && data.data?.handle_id) {
            const handleId = data.data.handle_id;
            console.log("Received handle_id:", handleId);
          }
        if (data.plugindata?.plugin === "janus.plugin.streaming") {
          // Step 2: Attach to streaming plugin (for desktop stream)
          const streamId = ""; // Specify the stream you want to access
          wsRef.current?.send(
            JSON.stringify({
              janus: "attach",
              session_id: data.data.id,
              plugin: "janus.plugin.streaming",
              transaction: Math.random().toString(36).substring(7),
            })
          );
        }
      }

      // Handle incoming ICE candidates from Janus and WebRTC signaling
      if (data.janus === "webrtcup") {
        peerRef.current = new RTCPeerConnection({
          iceServers: [{ urls: "stun.voip.eutelia.it:3478" }],
        });

        peerRef.current.onicecandidate = (event) => {
          if (event.candidate) {
            console.log("ICE Candidate:", event.candidate);
            wsRef.current?.send(
              JSON.stringify({
                janus: "message",
                session_id: data.data.id,
                handle_id: data.data.handle_id,
                body: { candidate: event.candidate },
                transaction: Math.random().toString(36).substring(7),
              })
            );
          }
        };

        peerRef.current.ontrack = (event) => {
          if (videoRef.current && event.streams[0]) {
            videoRef.current.srcObject = event.streams[0]; // Display the incoming video stream
          }
        };

        // Step 3: Create the WebRTC offer
        try {
            const offer = await peerRef.current.createOffer();
            await peerRef.current.setLocalDescription(offer);
            wsRef.current?.send(
                JSON.stringify({
                  janus: "message",
                  session_id: data.data.id,
                  handle_id: data.data.handle_id,
                  body: { request: "start", offer },
                  transaction: Math.random().toString(36).substring(7),
                })
              );
          } catch (error) {
            console.error("Error creating WebRTC offer:", error);
          }
      }

      if (data.janus === "event") {
        if (data.plugindata?.plugin === "janus.plugin.streaming") {
          if (data.plugindata.data?.started) {
            setStatus("Stream started");
          }
        }
      }
    };

    // Clean up WebSocket and PeerConnection when the component unmounts
    return () => {
      if (peerRef.current) {
        peerRef.current.close();
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [userId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-xl mb-4">{status}</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-4xl rounded-lg shadow-lg bg-black"
      />
    </div>
  );
};

export default DesktopStream;
