import Chat from '../models/chat';
import { io } from '../app'; // Assuming you've exported the 'io' instance from your main application file

// Send a message
export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    // Validate input data

    // Create a new chat message
    const newMessage = new Chat({
      sender,
      receiver,
      content,
      timestamp: new Date(),
    });

    // Save the message to the database
    await newMessage.save();

    // You can also emit the message to connected clients using WebSocket
    // For example, using socket.io
    io.emit('message', newMessage);

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error sending message. Try again.' });
  }
};

// Retrieve chat history for a specific user
export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch chat history for the user from the database
    const chatHistory = await Chat.find({ $or: [{ sender: userId }, { receiver: userId }] });

    res.json({ success: true, chatHistory });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching chat history. Try again.' });
  }
};
