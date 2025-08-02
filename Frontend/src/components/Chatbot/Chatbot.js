import React, { useState, useRef, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext'; // 1. Import the Auth Context hook
import './Chatbot.css';

const Chatbot = () => {
    const { user } = useAuthContext(); // 2. Get the logged-in user data

    // ... (keep all the existing useState, useRef, useEffect hooks)
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your financial assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages]);


    const handleSendMessage = async () => {
        const userMessage = inputValue.trim();
        if (!userMessage) return;

        setMessages(prevMessages => [...prevMessages, { text: userMessage, sender: 'user' }]);
        setInputValue('');
        setIsLoading(true);

        try {
            // 3. Prepare the payload, including the userId if the user is logged in
            const payload = {
                query: userMessage,
            };

            if (user && user.id) {
                payload.userId = user.id;
            }

            const response = await fetch('http://localhost:8080/chatbot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload), // Send the payload
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const botMessage = data.response || "Sorry, I couldn't get a response.";

            setMessages(prevMessages => [...prevMessages, { text: botMessage, sender: 'bot' }]);

        } catch (error) {
            console.error('Error fetching from backend:', error);
            setMessages(prevMessages => [...prevMessages, { text: 'Error: Could not connect to the service.', sender: 'bot' }]);
        } finally {
            setIsLoading(false);
        }
    };
    
    // ... (keep the handleKeyPress and the return statement exactly as they are)
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSendMessage();
        }
    };


    return (
        <div className="chatbot-container">
            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h2>AI Finance Assistant</h2>
                        <button className="close-btn" onClick={() => setIsOpen(false)}>✕</button>
                    </div>
                    <div className="chat-body" ref={chatWindowRef}>
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender}-message`}>
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && (
                            <div className="message bot-message typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        )}
                    </div>
                    <div className="chat-input-container">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about stocks, news..."
                        />
                        <button onClick={handleSendMessage}>Send</button>
                    </div>
                </div>
            )}
            <button className="chat-toggle-button" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? '✕' : '💬'}
            </button>
        </div>
    );
};


export default Chatbot;