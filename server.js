const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());

// Serve static files from public directory
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Store messages in memory (persists while server runs)
let messages = [];
let connectedUsers = new Set();

// Serve the HTML file
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, 'public', 'index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send('index.html not found. Path: ' + indexPath);
    }
});

// REST API to get all messages
app.get('/api/messages', (req, res) => {
    res.json(messages);
});

// WebSocket connection handling
wss.on('connection', (ws) => {
    console.log('Client connected. Total connections:', wss.clients.size);

    // Send all existing messages to new client
    ws.send(JSON.stringify({
        type: 'load_messages',
        messages: messages
    }));

    // Handle incoming messages
    ws.on('message', (data) => {
        try {
            const message = JSON.parse(data);
            
            if (message.type === 'new_message') {
                // Add timestamp and id
                const newMsg = {
                    id: Date.now(),
                    user: message.user,
                    text: message.text,
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    date: new Date().toLocaleDateString()
                };
                
                messages.push(newMsg);
                console.log('Message saved:', newMsg);

                // Broadcast to all connected clients
                broadcast({
                    type: 'message',
                    data: newMsg
                });
            }
        } catch (error) {
            console.error('Error processing message:', error);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected. Total connections:', wss.clients.size);
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

function broadcast(message) {
    const data = JSON.stringify(message);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
}

// Admin API to clear messages
app.post('/api/admin/clear', (req, res) => {
    messages = [];
    broadcast({
        type: 'messages_cleared'
    });
    res.json({ success: true });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('WebSocket server ready for connections');
});
