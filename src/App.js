import React, { useRef, useState } from 'react';
import Select from 'react-select';
import { toast } from 'sonner';
import './App.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [language, setLanguage] = useState('English');
  const [rating, setRating] = useState(0);
  const chatEndRef = useRef(null)

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: 'user' }]);
      // Simulate a response from the LLM
      setMessages([...messages, { text: input, sender: 'user' }, { text: 'This is a response from the LLM.', sender: 'llm' }]);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleRate = (rating) => {
    setRating(rating);
    toast.success(`You rated the app ${rating} star${rating > 1 ? 's' : ''}!`);
  };

  return (
    <div className="app">
      <header className="header">
        <Select
          value={{ label: language, value: language }}
          onChange={option => setLanguage(option.value)}
          options={[
            { label: 'English', value: 'English' },
            { label: 'Spanish', value: 'Spanish' },
            // Add more languages as needed
          ]}
          className="language-selector"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: '#1e1e1e',
              border: '1px solid #555',
              color: '#e0e0e0',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: '#e0e0e0',
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: '#1e1e1e',
              color: '#e0e0e0',
            }),
            menuList: (provided) => ({
              ...provided,
              backgroundColor: '#1e1e1e',
              color: '#e0e0e0',
            }),
            option: (provided) => ({
              ...provided,
              backgroundColor: '#1e1e1e',
              color: '#e0e0e0',
            }),
          }}
        />
        <div className="rate-button">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`star ${rating >= star ? 'filled' : ''}`}
              onClick={() => handleRate(star)}
            >
              ⭐
            </span>
          ))}
        </div>
      </header>
      <div className="chat">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            <div className="message-text">
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} /> {/* This ensures the chat scrolls to the bottom */}
      </div>
      <div className="input-container">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your query..."
          className="input"
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default App;
