import React, { useState, useEffect, useContext, useRef } from 'react';
import { SocketContext } from '../context/socketContext';
import { AuthContext } from "../context/authContext";

  
import { Box, Paper, Typography, TextField, Button, Stack, Avatar, IconButton, InputBase, Divider } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
const Chat = () => {
    // 1. Setup Context and State
    const { socketRef } = useContext(SocketContext);
    const {user} = useContext(AuthContext);
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState([]);
    const scrollRef = useRef(null);

    // Use a stable room ID (the URL path is usually best for "shared" pages)
    const roomId = "aadfdfa"; 
    const socket = socketRef.current;
    // 2. Handle Socket Events & Room Joining
    useEffect(() => {
      
        if (!socket) return;

        // Join the specific room
        socket.emit('join-chat', roomId);
      
        // Handler functions
        const handleUserJoined = (id) => {
            console.log("New user connected:", id);
        };

        const handleReceiveMessage = (data) => {
            // Only add if it's not from 'Me' to avoid duplicates 
            // (since you add to log locally in sendMessage)
            setChatLog((prev) => [...prev, data]);
            
        };

        // Attach listeners
        socket.on('user-joind-chat', handleUserJoined);
        socket.on('receive-message', handleReceiveMessage);

        // Cleanup on unmount
        return () => {
            socket.off('user-joind-chat', handleUserJoined);
            socket.off('receive-message', handleReceiveMessage);
        };
    }, [socketRef, roomId]);

    // 3. Auto-scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chatLog]);

    // 4. Send Message Logic
    const sendMessage = (e) => {
        e.preventDefault();
        
        if (message.trim() && socket) {
            const messageData = {
                data: message,
                path: roomId, // Send the room ID so server knows where to broadcast
                sender: socket.id, // Use socket ID to identify sender (or "Me" for local display)
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            socket.emit('send-message', messageData);
            
            setChatLog((prev) => [...prev, messageData]);
            setMessage('');
        }
    };

 

// Note: Ensure you have your logic (sendMessage, message, setMessage, chatLog, socket, user, roomId, scrollRef) defined above this return.
return (
  <Box sx={{ 
    mx: 'auto', 
    fontFamily: "'Inter', sans-serif"
  }}>
    <Paper 
      elevation={24} 
      sx={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        bgcolor: 'rgba(13, 17, 23, 0.95)', // Deep Space Blue
        backdropFilter: 'blur(10px)',
        color: 'white',
      
        border: '1px solid rgba(255, 255, 255, 0.1)',
        overflow: 'hidden',
        boxShadow: '0 0 40px rgba(37, 99, 235, 0.2)'
      }}
    >
      {/* --- HEADER --- */}
      <Box sx={{ 
        p: 2.5, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        background: 'linear-gradient(90deg, rgba(30, 41, 59, 0.5) 0%, rgba(15, 23, 42, 0.5) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Avatar sx={{ bgcolor: '#2563eb', fontWeight: 'bold', fontSize: '1rem' }}>L</Avatar>
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2, letterSpacing: '0.5px' }}>
              LexBridge <span style={{ color: '#60a5fa', fontWeight: 400 }}>Mentorship</span>
            </Typography>
            <Typography variant="caption" sx={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <FiberManualRecordIcon sx={{ fontSize: 10 }} /> Active Room: {roomId}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* --- CHAT AREA --- */}
      <Box sx={{ 
        flexGrow: 1, 
        overflowY: 'auto', 
        p: 3,
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 80%)',
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '10px' }
      }}>
        <Stack spacing={3}>
          {chatLog.map((msg, index) => {
            const isMe = msg.sender === socket.id;
            return (
              <Box 
                key={index} 
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isMe ? 'flex-end' : 'flex-start',
                }}
              > 
                <Box sx={{ 
                  maxWidth: '75%',
                  p: 2, 
                  borderRadius: isMe ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  background: isMe 
                    ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)' 
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isMe ? 'none' : '1px solid rgba(255,255,255,0.1)',
                  boxShadow: isMe ? '0 4px 15px rgba(37, 99, 235, 0.3)' : 'none',
                }}>
                   {!isMe && (
                    <Typography variant="caption" sx={{ fontWeight: 800, color: '#60a5fa', display: 'block', mb: 0.5, textTransform: 'uppercase', fontSize: '0.65rem' }}>
                      {user.username}
                    </Typography>
                  )}
                  <Typography variant="body2" sx={{ lineHeight: 1.5, color: 'rgba(255,255,255,0.95)' }}>
                    {msg.data}
                  </Typography>
                </Box>
                <Typography variant="caption" sx={{ mt: 0.5, opacity: 0.4, fontSize: '0.7rem', mx: 1 }}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            );
          })}
          <div ref={scrollRef} />
        </Stack>
      </Box>

      {/* --- INPUT AREA --- */}
      <Box 
        component="form" 
        onSubmit={sendMessage} 
        sx={{ 
          p: 2, 
          bgcolor: 'rgba(15, 23, 42, 0.8)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          bgcolor: 'rgba(255,255,255,0.03)', 
          borderRadius: '12px',
          px: 2,
          py: 1,
          border: '1px solid rgba(255,255,255,0.1)',
          transition: 'all 0.3s ease',
          '&:focus-within': {
            borderColor: '#2563eb',
            boxShadow: '0 0 10px rgba(37, 99, 235, 0.2)',
            bgcolor: 'rgba(255,255,255,0.05)'
          }
        }}>
          <InputBase
            fullWidth
            placeholder="Write a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            sx={{ color: 'white', fontSize: '0.95rem' }}
          />
          <IconButton 
            type="submit" 
            disabled={!message.trim()}
            sx={{ 
              color: '#2563eb', 
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1) rotate(-10deg)', color: '#60a5fa' },
              '&.Mui-disabled': { color: 'rgba(255,255,255,0.1)' }
            }}
          >
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  </Box>
);
};

export default Chat;