// websocket-server.js
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 }); // Choose the WebSocket port (e.g., 8080)
console.log("WebSocket server started on ws://localhost:8080");

// Store WebSocket connection to Go server
let goServerWebSocket = null;

wss.on('connection', ws => {
    console.log('WebSocket connection established');

    ws.on('message', message => {
        console.log('Received message:', message);
        try {
            const data = JSON.parse(message);
            if (data.type === "register") {
                console.log(`User ${data.userId} registered (via WebSocket)`);
                // For now, just log registration.  In a more complex setup, you might want to maintain a list of connected clients.
            }

            // Simple routing:  Assume all messages from Next.js are for Go server.
            // In a more complex scenario, you might need to inspect message type/target and route accordingly.
            if (goServerWebSocket && goServerWebSocket.readyState === WebSocket.OPEN) {
                console.log("Forwarding message to Go server:", message);
                goServerWebSocket.send(message); // Forward message to Go server
            } else {
                console.log("Go server not connected or not open, cannot forward message:", message);
                // Optionally handle case where Go server is not available (e.g., queue messages, send error back to client).
            }


        } catch (error) {
            console.error("Error parsing message:", error);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });

    ws.on('error', error => {
        console.error('WebSocket error:', error);
    });
});

// **TODO: Implement WebSocket connection from Go server to this Node.js server.**
// **This is the next step:  Establish WebSocket connection from Go server.**
// **For now, the Node.js server is only listening for Next.js client connections.**

// --- Placeholder for Go server WebSocket connection ---
function connectToGoServer() {
    goServerWebSocket = new WebSocket('ws://localhost:8081'); // Assume Go server will run on ws://localhost:8081

    goServerWebSocket.onopen = () => {
        console.log('WebSocket connected to Go server');
        // Optionally send a "register" or "hello" message to the Go server upon connection.
        // goServerWebSocket.send(JSON.stringify({ type: "server-register", serverType: "webrtc-media-server" }));
    };

    goServerWebSocket.onmessage = message => {
        console.log('Received message from Go server:', message.data);
        // **TODO: Route messages from Go server to appropriate clients.**
        // **For now, just log messages from Go server.**
    };

    goServerWebSocket.onclose = () => {
        console.log('WebSocket connection to Go server closed');
        goServerWebSocket = null; // Reset goServerWebSocket when connection is closed
        // Optionally attempt to reconnect to Go server after a delay.
        // setTimeout(connectToGoServer, 3000); // Reconnect after 3 seconds (example).
    };

    goServerWebSocket.onerror = error => {
        console.error('WebSocket error (Go server):', error);
        goServerWebSocket = null; // Reset goServerWebSocket on error
    };
}

// Attempt to connect to Go server when Node.js server starts
connectToGoServer();