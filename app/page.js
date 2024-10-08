    /**
     * By Gul Amiz Ibrahimi
     * Define the Home component
     * This component will be the main page of the application
     * It will contain the chat interface
     * The chat interface will display messages from the user and the assistant
     * The user can type a message and send it to the assistant
     * The assistant will respond with a placeholder message after a delay
     * The chat interface will display the messages in a convo style format and the user message would be displayed.
     * The user's messages will be displayed on the right side
     * The assistant's messages will be displayed on the left side
     * The chat interface will have a title, message input field, and send button
     */

    'use client';

    // Import the required modules from Material-UI library, React, and Bootstrap
    import { Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import './globals.css';

    // Export the Home component
    export default function Home() {
    // Define the messages state
    const [messages, setMessages] = useState([
        {
        role: 'assistant',
        content: "Hi! I'm your personal assistant. How can I help you today?",
        },
    ]);

    // Define the message state
    const [message, setMessage] = useState('');

    // Function to handle sending a message
    const sendMessage = async () => {
        if (message.trim()) {
        setMessage(''); // Clear the input field

        // Add the user's message to the chat
        setMessages((messages) => [
            ...messages,
            { role: 'user', content: message },
            { role: 'assistant', content: '' }, // Placeholder for the assistant's response
        ]);

        try {
            // Send the message to the API
            const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: {
                prompt: `You are a helpful, knowledgeable assistant designed to support users navigating a platform focused on education, mentorship, and community building. The user asked: "${message}". Your response should be:
                    - Friendly and conversational, making users feel welcome and supported, especially within a learning and mentorship context.
                    - Clear, concise, and direct, providing actionable guidance and helpful suggestions related to platform features (such as community forums, mentorship programs, resources, events, etc.).
                    - Empathetic and personalized, especially for users who may need extra support, such as students or mentees.
                    - Focused on providing resources, next steps, or pointing users to relevant areas of the platform (e.g., profile management, resource library, event registration, mentor matching).
                    - Engaging and motivating, encouraging users to take full advantage of platform features without being overly formal or corporate.
                    - Adaptable to different user needs, whether a mentor, student, or administrator.

                    Provide an informative yet supportive response that helps users engage with the platform effectively and encourages their involvement in the community.`,
                },
            }),
            });
            // Handle the response from the API
            const data = await response.json();
            const assistantMessage = data.content || "I'm sorry, can I help with something else?";

            // Update the assistant's message
            setMessages((messages) => {
            const updatedMessages = [...messages];
            updatedMessages[updatedMessages.length - 1].content = assistantMessage;
            return updatedMessages;
            });

        } catch (error) {
            console.error('Error communicating with the API:', error);
            setMessages((messages) => [
            ...messages,
            { role: 'assistant', content: "There was an error. Please try again later." },
            ]);
        }
        }
    };

    // Return the chat interface with updated styling
    return (
        <Box
        width="100vw"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={3}
        sx={{ backgroundColor: 'var(--background-color)', fontFamily: 'var(--default-font)' }}
        >
        <Stack
            direction="column"
            width="100%"
            maxWidth="600px"
            height="80%"
            borderRadius={4}
            boxShadow={3}
            overflow="hidden"
            sx={{ bgcolor: 'var(--surface-color)' }}
        >
            <Box
            p={3}
            sx={{ 
                bgcolor: 'var(--accent-color)', 
                color: 'var(--contrast-color)', 
                borderRadius: '4px 4px 0 0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
            >
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: 'var(--heading-font)' }}>
                Elite Assistant
            </Typography>
            <i className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></i>
            </Box>

            <Stack
            direction="column"
            spacing={2}
            flexGrow={1}
            p={2}
            sx={{ overflowY: 'auto', backgroundColor: 'var(--light-background)' }}
            >
            {messages.map((msg, index) => (
                <Box
                key={index}
                display="flex"
                justifyContent={msg.role === 'assistant' ? 'flex-start' : 'flex-end'}
                >
                <Box
                    sx={{
                    p: 2,
                    borderRadius: 2,
                    boxShadow: 1,
                    maxWidth: '75%',
                    bgcolor: msg.role === 'assistant' ? 'var(--accent-color)' : '#34A853',
                    color: 'var(--contrast-color)',
                    alignSelf: msg.role === 'assistant' ? 'flex-start' : 'flex-end',
                    fontFamily: 'var(--default-font)',
                    }}
                >
                    {msg.content}
                </Box>
                </Box>
            ))}
            </Stack>

            <Stack
            direction="row"
            spacing={1}
            p={2}
            sx={{ bgcolor: 'var(--surface-color)', borderTop: '1px solid #ddd' }}
            >
            <TextField
                label="Type your message..."
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="outlined"
                sx={{
                bgcolor: '#f1f3f4',
                borderRadius: 2,
                '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                },
                '& .MuiInputLabel-root': {
                    color: 'var(--default-color)',
                },
                }}
            />

            <IconButton
                color="primary"
                onClick={sendMessage}
                disabled={!message.trim()}
                sx={{ borderRadius: '50%', bgcolor: 'var(--accent-color)', color: 'var(--contrast-color)' }}
            >
                <i className="bi bi-send"></i>
            </IconButton>
            </Stack>
        </Stack>
        </Box>
    );
    }
