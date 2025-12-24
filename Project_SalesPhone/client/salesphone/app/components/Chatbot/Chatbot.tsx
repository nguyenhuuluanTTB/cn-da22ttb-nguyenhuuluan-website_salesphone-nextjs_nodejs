"use client"

import { useState, useEffect } from 'react';
import styles from './Chatbot.module.scss';
import { IoChatbubbleEllipsesSharp, IoClose, IoSend } from "react-icons/io5";

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Array<{role: 'user' | 'bot', content: string}>>([
        { role: 'bot', content: 'Xin chào! Tôi là trợ lý SalesPhone. Tôi có thể giúp gì cho bạn? 😊' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            setIsAuthenticated(!!token);
        };

        checkAuth();

        // Listen for storage changes
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'token') {
                checkAuth();
            }
        };

        window.addEventListener('storage', handleStorageChange);
        
        // Check periodically
        const interval = setInterval(checkAuth, 1000);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
            clearInterval(interval);
        };
    }, []);

    const handleOpenChat = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Show auth popup
            window.dispatchEvent(new Event('showAuthPopup'));
            return;
        }
        setIsOpen(true);
    };

    const sendMessage = async () => {
        if (!input.trim()) return;

        // Check authentication before sending
        const token = localStorage.getItem('token');
        if (!token) {
            window.dispatchEvent(new Event('showAuthPopup'));
            setIsOpen(false);
            return;
        }

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/chatbot/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ prompt: userMessage })
            });

            const data = await response.json();
            
            setMessages(prev => [...prev, { 
                role: 'bot', 
                content: data.reply || 'Xin lỗi, tôi không thể trả lời lúc này.' 
            }]);
        } catch (error) {
            console.error('Chat error:', error);
            setMessages(prev => [...prev, { 
                role: 'bot', 
                content: 'Xin lỗi, có lỗi xảy ra. Vui lòng thử lại sau.' 
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <button 
                className={`${styles.chatButton} ${isOpen ? styles.hidden : ''}`}
                onClick={handleOpenChat}
            >
                <IoChatbubbleEllipsesSharp size={28} />
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    {/* Header */}
                    <div className={styles.chatHeader}>
                        <div className={styles.headerContent}>
                            <IoChatbubbleEllipsesSharp size={24} />
                            <span>Trợ lý SalesPhone</span>
                        </div>
                        <button 
                            className={styles.closeButton}
                            onClick={() => setIsOpen(false)}
                        >
                            <IoClose size={24} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className={styles.chatMessages}>
                        {messages.map((msg, index) => (
                            <div 
                                key={index} 
                                className={`${styles.message} ${styles[msg.role]}`}
                            >
                                {msg.role === 'bot' ? (
                                    <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                                ) : (
                                    <div>{msg.content}</div>
                                )}
                            </div>
                        ))}
                        {loading && (
                            <div className={`${styles.message} ${styles.bot}`}>
                                <div className={styles.typing}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className={styles.chatInput}>
                        <input
                            type="text"
                            placeholder="Nhập câu hỏi của bạn..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading || !isAuthenticated}
                        />
                        <button 
                            onClick={sendMessage}
                            disabled={loading || !input.trim() || !isAuthenticated}
                        >
                            <IoSend size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
