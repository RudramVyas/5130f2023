import express from "express";
import cors from 'cors';
import { readdirSync } from 'fs';
import csrf from "csurf";
import cookieParser from "cookie-parser";
const helmet = require("helmet");
const morgan = require("morgan");
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io';
require('dotenv').config();

// csrf protection
const csrfProtection = csrf({ cookie: true });

// Define CORS options
const corsOptions = {
  origin: 'http://localhost:3000', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, 
};

// Create express application
const app = express();
const server = http.createServer(app);
const io = new Server(server);

// WebSocket handling
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages
  socket.on('message', (data) => {
    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});




// Connect to the database
mongoose.connect(process.env.DATABASE).then(() => console.log('**Db connect**'))
  .catch((err) => console.log("db error => ", err));

// Apply middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Route
readdirSync('./routes').map(
  (r) => app.use('/api', require(`./routes/${r}`))
);

// CSRF 
app.use(csrfProtection);

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Port
const port = 8000;

server.listen(port, () => console.log("server is running on 8000"));
