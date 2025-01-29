import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles } from 'lucide-react';
import axios from 'axios';  // Import Axios

function Chat() {
    const [messages, setMessages] = useState([
        {
            type: 'ai',
            content: "Hello! I'm here to help you. What would you like to know?",
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            const response = await axios.post('http://localhost:5000/api/vl/ai/chat', {
                message: input,  // Ensure you're sending `message` here
            });

            console.log(response.data);  // You can log the response here for debugging
            setMessages([...messages, { type: 'user', content: input }]);
        } catch (error) {
            console.error("Error during the API request:", error);
        }

        setInput('');
    };


    return (
        <div className="flex flex-col h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            {/* Header */}
            <div className="bg-white border-b shadow-sm py-4 px-6">
                <div className="max-w-3xl mx-auto flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">AI Assistant</h1>
                        <p className="text-sm text-gray-500">Always here to help</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-start ${message.type === 'user' ? 'justify-end' : 'justify-start'
                                } animate-fade-in`}
                        >
                            {message.type === 'ai' && (
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center mr-4 shadow-md">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                            )}

                            <div
                                className={`max-w-xl rounded-2xl p-5 ${message.type === 'user'
                                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-500/30'
                                    : 'bg-white shadow-lg'
                                    } shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl`}
                            >
                                <p className={`${message.type === 'user' ? 'text-white' : 'text-gray-800'} leading-relaxed`}>
                                    {message.content}
                                </p>
                                <span
                                    className={`text-xs block mt-3 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-400'
                                        }`}
                                >
                                    {message.timestamp}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-6 shadow-lg">
                <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                    <div className="flex items-center bg-gray-50 rounded-2xl p-3 shadow-inner border border-gray-100">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                            className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-gray-700 placeholder-gray-400 text-lg"
                        />
                        <button
                            type="submit"
                            className={`ml-2 p-3 rounded-xl transition-all duration-300 ${input.trim()
                                ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:scale-105'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                            disabled={!input.trim()}
                        >
                            <Send className="w-6 h-6" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Chat;
