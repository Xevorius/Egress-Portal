"use client";
import { useEffect, useRef, useState } from "react";

const SIGNALING_SERVER_URL = "ws://localhost:8080";
const USER_ID = "user-123"; // Replace with actual user ID

const DesktopStream = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    wsRef.current = new WebSocket(SIGNALING_SERVER_URL);
    wsRef.current.onopen = () => {
      setStatus("Connected to signaling server");
      wsRef.current?.send(JSON.stringify({ type: "register", userId: USER_ID }));
    };

    wsRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "offer") {
        setStatus("Received video stream offer");
        await peerRef.current?.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await peerRef.current?.createAnswer();
        await peerRef.current?.setLocalDescription(answer);

        wsRef.current?.send(JSON.stringify({ type: "answer", answer, target: "gstreamer" }));
      }

      if (data.type === "ice-candidate") {
        await peerRef.current?.addIceCandidate(new RTCIceCandidate(data.candidate));
      }
    };

    // Set up WebRTC Peer Connection
    peerRef.current = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    peerRef.current.onicecandidate = (event) => {
      if (event.candidate) {
        wsRef.current?.send(
          JSON.stringify({ type: "ice-candidate", candidate: event.candidate, target: "gstreamer" })
        );
      }
    };

    peerRef.current.ontrack = (event) => {
      if (videoRef.current && event.streams[0]) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    return () => {
      peerRef.current?.close();
      wsRef.current?.close();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-xl mb-4">{status}</h1>
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-4xl rounded-lg shadow-lg bg-black" />
    </div>
  );
};

export default DesktopStream;