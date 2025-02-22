package main

import (
	"encoding/json"
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
)

// Define message types for signaling
const (
	RegisterMessage     = "register"
	OfferMessage        = "offer"
	AnswerMessage       = "answer"
	ICECandidateMessage = "ice-candidate"
)

type Message struct {
	Type    string `json:"type"`
	UserId  string `json:"userId,omitempty"`  // optional, for registration
	Target  string `json:"target,omitempty"`  // target userId for targeted messages
	Payload string `json:"payload,omitempty"` // signaling data, like SDP or ICE candidates
}

var (
	upgrader    = websocket.Upgrader{CheckOrigin: func(r *http.Request) bool { return true }} // Allow all connections
	clients     = make(map[*websocket.Conn]string)                                            // Store clients' WebSocket connections and their associated userIds
	clientsLock sync.Mutex
)

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
	// Upgrade HTTP connection to WebSocket
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Error upgrading WebSocket connection:", err)
		return
	}
	defer conn.Close()

	// Register the client (initially with an empty userId)
	clientsLock.Lock()
	clients[conn] = ""
	clientsLock.Unlock()

	log.Printf("New connection established from %s", conn.RemoteAddr())

	// Handle incoming messages from the client
	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			log.Println("Error reading WebSocket message:", err)
			break
		}

		// Handle the received message
		handleMessage(conn, msg)
	}

	// Unregister client when they disconnect
	clientsLock.Lock()
	delete(clients, conn)
	clientsLock.Unlock()
}

func handleMessage(conn *websocket.Conn, msg []byte) {
	var message Message
	if err := json.Unmarshal(msg, &message); err != nil {
		log.Println("Error unmarshalling message:", err)
		return
	}

	// Handle different message types
	switch message.Type {
	case RegisterMessage:
		handleRegister(conn, message)
	case OfferMessage:
		handleOffer(conn, message)
	case AnswerMessage:
		handleAnswer(conn, message)
	case ICECandidateMessage:
		handleICECandidate(conn, message)
	default:
		log.Println("Unknown message type:", message.Type)
	}
}

func handleRegister(conn *websocket.Conn, message Message) {
	// Register the user by assigning their userId
	clientsLock.Lock()
	clients[conn] = message.UserId
	clientsLock.Unlock()

	log.Printf("User %s registered successfully", message.UserId)
}

func handleOffer(conn *websocket.Conn, message Message) {
	// Forward the offer to the target peer (by userId)
	clientsLock.Lock()
	for clientConn, userId := range clients {
		if userId == message.Target {
			// Convert the payload to []byte and send it to the target peer
			if err := clientConn.WriteMessage(websocket.TextMessage, []byte(message.Payload)); err != nil {
				log.Println("Error forwarding offer to peer:", err)
			}
			log.Printf("Offer forwarded to user %s", message.Target)
			break
		}
	}
	clientsLock.Unlock()
}

func handleAnswer(conn *websocket.Conn, message Message) {
	// Forward the answer to the user who originally sent the offer
	clientsLock.Lock()
	for clientConn, userId := range clients {
		if userId == message.Target {
			// Convert the payload to []byte and send it to the target peer
			if err := clientConn.WriteMessage(websocket.TextMessage, []byte(message.Payload)); err != nil {
				log.Println("Error forwarding answer to peer:", err)
			}
			log.Printf("Answer forwarded to user %s", message.Target)
			break
		}
	}
	clientsLock.Unlock()
}

func handleICECandidate(conn *websocket.Conn, message Message) {
	// Forward the ICE candidate to the target peer
	clientsLock.Lock()
	for clientConn, userId := range clients {
		if userId == message.Target {
			// Convert the payload to []byte and send it to the target peer
			if err := clientConn.WriteMessage(websocket.TextMessage, []byte(message.Payload)); err != nil {
				log.Println("Error forwarding ICE candidate to peer:", err)
			}
			log.Printf("ICE candidate forwarded to user %s", message.Target)
			break
		}
	}
	clientsLock.Unlock()
}

func main() {
	http.HandleFunc("/ws", handleWebSocket) // WebSocket endpoint

	// Start the WebSocket server
	log.Println("WebSocket Server: Running on ws://localhost:8080/ws")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatalf("Error starting WebSocket server: %v", err)
	}
}
