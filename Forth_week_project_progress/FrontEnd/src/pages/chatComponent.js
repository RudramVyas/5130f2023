import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Typography, Container } from '@mui/material';
import io from 'socket.io-client';

const socket = io('http://localhost:8000');

const ChatComponent = ({ userId }) => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    socket.on('message', (data) => {
      setChatHistory((prevHistory) => [...prevHistory, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === '') return;

    const newMessage = {
      sender: userId,
      receiver: 'otherUserId',
      content: message,
      timestamp: new Date(),
    };

    socket.emit('message', newMessage);

    setChatHistory((prevHistory) => [...prevHistory, newMessage]);

    setMessage('');
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" component="h2">
          Chat Room
        </Typography>
        <div style={{ height: '300px', overflowY: 'scroll', marginBottom: '20px' }}>
          {chatHistory.map((msg, index) => (
            <div key={index}>
              <Typography variant="body1">
                {msg.sender}: {msg.content}
              </Typography>
            </div>
          ))}
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="message"
          label="Type your message"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={sendMessage}>
          Send
        </Button>
      </Paper>
    </Container>
  );
};

export default ChatComponent;
