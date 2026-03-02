import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Chatbot = () => {
    const { t, language, toggleLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    // Initial greeting when language changes or first open
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([{ text: t('chatbot.greeting'), sender: 'bot' }]);
        }
    }, [language, messages.length, t]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
        setInput('');

        // Simulate AI response based on keywords
        setTimeout(() => {
            let botResponse = t('chatbot.defaultResponse');
            const lower = userMsg.toLowerCase();

            if (lower.includes('waterfall') || lower.includes('phoolpad') || lower.includes('झरना')) {
                botResponse = t('chatbot.waterfallResponse');
            } else if (lower.includes('temple') || lower.includes('danteshwari') || lower.includes('मंदिर')) {
                botResponse = t('chatbot.templeResponse');
            } else if (lower.includes('food') || lower.includes('eat') || lower.includes('खाना')) {
                botResponse = t('chatbot.foodResponse');
            } else if (lower.includes('hotel') || lower.includes('stay') || lower.includes('होटल')) {
                botResponse = t('chatbot.stayResponse');
            }

            setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
        }, 1000);
    };

    return (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 100 }}>
            {isOpen && (
                <div className="card animate-fade-in" style={{
                    width: '350px',
                    height: '450px',
                    backgroundColor: 'var(--bg-card)',
                    marginBottom: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1px solid var(--text-light)',
                    color: 'var(--text-dark)'
                }}>
                    {/* Header */}
                    <div style={{
                        padding: '12px 16px',
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        borderTopLeftRadius: 'var(--radius-md)',
                        borderTopRightRadius: 'var(--radius-md)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MessageSquare size={20} />
                            <h3 style={{ fontSize: '0.9rem', color: 'white', margin: 0 }}>{t('chatbot.title')}</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <button
                                onClick={toggleLanguage}
                                style={{
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    fontSize: '0.75rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    padding: '4px 8px',
                                    borderRadius: 'var(--radius-sm)',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <Languages size={14} />
                                {language === 'en' ? 'हिंदी' : 'English'}
                            </button>
                            <button onClick={() => setIsOpen(false)} style={{ color: 'white', background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={{
                        flex: 1,
                        padding: '16px',
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                        backgroundColor: 'var(--bg-color)'
                    }}>
                        {messages.map((msg, idx) => (
                            <div key={idx} style={{
                                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: msg.sender === 'user' ? 'var(--primary)' : 'var(--bg-card)',
                                color: msg.sender === 'user' ? 'white' : 'var(--text-dark)',
                                padding: '10px 14px',
                                borderRadius: 'var(--radius-md)',
                                maxWidth: '80%',
                                boxShadow: 'var(--shadow-sm)',
                                fontSize: '0.875rem',
                                border: msg.sender === 'bot' ? '1px solid var(--text-light)' : 'none'
                            }}>
                                {msg.text}
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSend} style={{
                        padding: '12px',
                        borderTop: '1px solid var(--text-light)',
                        display: 'flex',
                        gap: '8px',
                        backgroundColor: 'var(--bg-card)',
                        borderBottomLeftRadius: 'var(--radius-md)',
                        borderBottomRightRadius: 'var(--radius-md)'
                    }}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('chatbot.placeholder')}
                            style={{
                                flex: 1,
                                padding: '10px 14px',
                                borderRadius: 'var(--radius-full)',
                                border: '1px solid var(--text-light)',
                                outline: 'none',
                                backgroundColor: 'var(--bg-color)',
                                color: 'var(--text-dark)',
                                fontSize: '0.875rem',
                                fontFamily: 'var(--font-body)'
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                backgroundColor: 'var(--primary)',
                                color: 'white',
                                width: '38px',
                                height: '38px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <Send size={16} />
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="animate-fade-in"
                    style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: 'var(--shadow-lg)',
                        transition: 'transform 0.2s',
                        cursor: 'pointer',
                        border: 'none'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <MessageSquare size={28} />
                </button>
            )}
        </div>
    );
};
