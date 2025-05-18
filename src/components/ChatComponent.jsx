// ChatComponent.jsx
import { useState, useRef, useEffect } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = { 
      id: Date.now(), 
      text: input, 
      sender: 'user' 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Replace with your actual API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Add AI response
      const aiMessage = { 
        id: Date.now() + 1, 
        text: data.message, 
        sender: 'ai' 
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      const errorMessage = { 
        id: Date.now() + 1, 
        text: 'Sorry, I encountered an error. Please try again.', 
        sender: 'ai' 
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-gray-50">
      {/* Chat header */}
      <div className="px-4 py-3 bg-white shadow">
        <h1 className="text-xl font-semibold text-center">AI Assistant</h1>
      </div>

      {/* Messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Start a conversation with the AI</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 max-w-xs md:max-w-md ${
                message.sender === 'user' ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div
                className={`p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 rounded-bl-none'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="flex items-center mb-4 max-w-xs">
            <div className="p-3 bg-gray-200 text-gray-800 rounded-lg rounded-bl-none">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`px-4 py-2 font-medium ${
              !input.trim() || isLoading
                ? 'bg-gray-300 text-gray-500'
                : 'bg-blue-500 text-white'
            }`}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
