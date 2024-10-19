import express from 'express';
import { createServer } from 'http';
import connectToDatabase from './db.js';
import websocket from './websocket.js';
import user from './routes/user_route.mjs'
import cors from 'cors';
import message from './routes/message_route.mjs';
import 'dotenv/config';
const port = process.env.PORT;
const app = express();
app.use(express.json());
// app.use(cors());
const allowedOrigins = ['https://web-chat-1-1tia.onrender.com'];
app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true, // If you need to include credentials
}));
const server = createServer(app);

//Establidh api
app.use("/api/user",user);
app.use("/api/message",message);
// Establish MongoDB connection
connectToDatabase();

// WebSocket setup
websocket(server);

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
