'use client'
// components/NoVNC.tsx

import React, { useEffect, useRef, useState } from "react";
import RFB from "novnc-core";  // Import RFB from noVNC module

interface NoVNCProps {
    host?: string;
    port?: string;
    password?: string;
    path?: string;
    viewOnly?: boolean;
    scale?: boolean;
}

const NoVNC: React.FC<NoVNCProps> = ({
    host = window.location.hostname,
    port = window.location.port,
    password,
    path = "websockify",
    viewOnly = false,
    scale = false
}) => {
    const [statusMessage, setStatusMessage] = useState<string>("Loading");
    const screenRef = useRef<HTMLDivElement>(null);
    const rfbRef = useRef<RFB | null>(null);

    useEffect(() => {
        // This function extracts the value of a URL query parameter
        const readQueryVariable = (name: string, defaultValue: string): string => {
            const re = new RegExp('.*[?&]' + name + '=([^&#]*)');
            const match = document.location.href.match(re);
            return match ? decodeURIComponent(match[1]) : defaultValue;
        };

        const status = (message: string) => {
            setStatusMessage(message);
        };

        const sendCtrlAltDel = () => {
            rfbRef.current?.sendCtrlAltDel();
        };

        const handleConnect = () => {
            status(`Connected to ${rfbRef.current?.desktopName}`);
        };

        const handleDisconnect = (e: Event) => {
            if ((e as CustomEvent).detail.clean) {
                status("Disconnected");
            } else {
                status("Something went wrong, connection is closed");
            }
        };

        const handleCredentialsRequired = () => {
            const passwordInput = prompt("Password required:");
            if (passwordInput) {
                rfbRef.current?.sendCredentials({ password: passwordInput });
            }
        };

        const handleDesktopName = (e: CustomEvent) => {
            if (e.detail.name) {
                status(`Connected to ${e.detail.name}`);
            }
        };

        const connectToServer = () => {
            status("Connecting...");

            // Build the WebSocket URL used to connect
            const protocol = window.location.protocol === "https:" ? "wss" : "ws";
            let url = `${protocol}://${host}`;
            if (port) url += `:${port}`;
            url += `/${path}`;

            rfbRef.current = new RFB(screenRef.current!, url, {
                credentials: { password },
                viewOnly,
                scaleViewport: scale,
            });

            rfbRef.current.addEventListener("connect", handleConnect);
            rfbRef.current.addEventListener("disconnect", handleDisconnect);
            rfbRef.current.addEventListener("credentialsrequired", handleCredentialsRequired);
            rfbRef.current.addEventListener("desktopname", handleDesktopName);
        };

        connectToServer();

        return () => {
            if (rfbRef.current) {
                rfbRef.current.removeEventListener("connect", handleConnect);
                rfbRef.current.removeEventListener("disconnect", handleDisconnect);
                rfbRef.current.removeEventListener("credentialsrequired", handleCredentialsRequired);
                rfbRef.current.removeEventListener("desktopname", handleDesktopName);
                rfbRef.current.disconnect();
            }
        };
    }, [host, port, password, path, viewOnly, scale]);

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            <div id="top_bar" style={{ backgroundColor: "#6e84a3", color: "white", fontWeight: "bold", padding: "6px 5px 4px 5px", borderBottom: "1px outset" }}>
                <div id="status" style={{ textAlign: "center" }}>{statusMessage}</div>
            </div>
            <div id="screen" ref={screenRef} style={{ flex: 1, overflow: "hidden" }}>
                {/* The remote screen will appear here */}
            </div>
        </div>
    );
};

export default NoVNC;
