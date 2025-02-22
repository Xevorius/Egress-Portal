package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/exec"
	"sync"

	"github.com/gorilla/websocket"
	"github.com/pion/webrtc/v3"
)

var clients = make(map[*websocket.Conn]string) // mapping WebSocket connection to userId
var clientsLock = sync.Mutex{}

type Message struct {
	Type    string `json:"type"`
	UserId  string `json:"userId"`
	Payload string `json:"payload"`
	Target  string `json:"target"`
}

// Handle incoming WebRTC signaling messages
func handleWebRTCMessage(conn *websocket.Conn, message Message) {
	switch message.Type {
	case "offer":
		handleOffer(conn, message)
	case "answer":
		handleAnswer(conn, message)
	case "ice_candidate":
		handleICECandidate(conn, message)
	}
}

// Handle offer message from WebSocket
func handleOffer(conn *websocket.Conn, message Message) {
	peerConnection, err := webrtc.NewPeerConnection(webrtc.Configuration{})
	if err != nil {
		log.Println("Error creating peer connection:", err)
		return
	}

	// Creating a local video track for sending to peer
	videoTrack, err := webrtc.NewTrackLocalStaticSample(
		webrtc.RTPCodecCapability{MimeType: webrtc.MimeTypeVP8},
		"video", "stream",
	)
	if err != nil {
		log.Println("Error creating video track:", err)
		return
	}

	// Add the track to the peer connection
	_, err = peerConnection.AddTrack(videoTrack)
	if err != nil {
		log.Println("Error adding track to peer connection:", err)
		return
	}

	// Handle ICE candidates
	peerConnection.OnICECandidate(func(candidate *webrtc.ICECandidate) {
		if candidate == nil {
			return
		}

		// Send ICE candidates to the signaling server
		message := Message{
			Type:    "ice_candidate",
			UserId:  message.UserId,
			Payload: candidate.ToJSON().Candidate,
			Target:  message.Target,
		}

		sendWebSocketMessage(conn, message)
	})

	// Set the remote description from the offer message
	err = peerConnection.SetRemoteDescription(webrtc.SessionDescription{
		Type: webrtc.SDPTypeOffer,
		SDP:  message.Payload,
	})
	if err != nil {
		log.Println("Error setting remote description:", err)
		return
	}

	// Create the answer and send it back to the browser
	answer, err := peerConnection.CreateAnswer(nil)
	if err != nil {
		log.Println("Error creating answer:", err)
		return
	}

	err = peerConnection.SetLocalDescription(answer)
	if err != nil {
		log.Println("Error setting local description:", err)
		return
	}

	// Send the answer back via WebSocket
	message.Type = "answer"
	message.Payload = answer.SDP
	sendWebSocketMessage(conn, message)

	// Start FFmpeg stream in a goroutine
	go startFFmpegStream(videoTrack)
}

// Handle answer message from WebSocket
func handleAnswer(conn *websocket.Conn, message Message) {
	peerConnection, err := webrtc.NewPeerConnection(webrtc.Configuration{})
	if err != nil {
		log.Println("Error creating peer connection:", err)
		return
	}

	// Set the remote description from the answer message
	err = peerConnection.SetRemoteDescription(webrtc.SessionDescription{
		Type: webrtc.SDPTypeAnswer,
		SDP:  message.Payload,
	})
	if err != nil {
		log.Println("Error setting remote description:", err)
		return
	}
}

// Handle ICE candidate message from WebSocket
func handleICECandidate(conn *websocket.Conn, message Message) {
	peerConnection, err := webrtc.NewPeerConnection(webrtc.Configuration{})
	if err != nil {
		log.Println("Error creating peer connection:", err)
		return
	}

	// Parse and add the ICE candidate to the peer connection
	candidate := webrtc.ICECandidateInit{
		Candidate: message.Payload,
	}

	err = peerConnection.AddICECandidate(candidate)
	if err != nil {
		log.Println("Error adding ICE candidate:", err)
	}
}

// Send WebSocket message to the target user
func sendWebSocketMessage(conn *websocket.Conn, message Message) {
	clientsLock.Lock()
	defer clientsLock.Unlock()

	// Send the message to the target user
	for clientConn, userId := range clients {
		if userId == message.Target {
			err := clientConn.WriteMessage(websocket.TextMessage, []byte(message.Payload))
			if err != nil {
				log.Println("Error sending message:", err)
			}
		}
	}
}

// Start FFmpeg stream and pipe it to WebRTC track
func startFFmpegStream(videoTrack *webrtc.TrackLocalStaticSample) {
	cmd := exec.Command("ffmpeg", "-f", "gdigrab", "-framerate", "30", "-i", "desktop", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-f", "rtp", "rtp://localhost:8085")
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	err := cmd.Run()
	if err != nil {
		log.Println("Error running FFmpeg:", err)
	}
}

// WebSocket upgrade handler
func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	// Upgrade HTTP connection to WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading WebSocket connection:", err)
		return
	}
	defer conn.Close()

	// Register new WebSocket client
	clientsLock.Lock()
	clients[conn] = r.URL.Query().Get("userId")
	clientsLock.Unlock()

	// Listen for incoming WebSocket messages
	for {
		_, messageBytes, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading WebSocket message:", err)
			break
		}

		var message Message
		err = json.Unmarshal(messageBytes, &message)
		if err != nil {
			log.Println("Error unmarshalling message:", err)
			continue
		}

		handleWebRTCMessage(conn, message)
	}

	// Unregister client on connection close
	clientsLock.Lock()
	delete(clients, conn)
	clientsLock.Unlock()
}

func main() {
	// Setup the WebSocket server
	http.HandleFunc("/ws", handleWebSocket)

	// Run the HTTP server
	log.Println("WebSocket server running at ws://localhost:8080/ws")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal("Failed to start WebSocket server:", err)
	}
}
