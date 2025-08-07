import { useState, useEffect } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import './App.css';

import botConfig from './components/botConfig';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

function App() {
  const [messages, setMessages] = useState([]);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatbot-messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever messages change
  const saveMessages = (messages) => {
    setMessages(messages);
    localStorage.setItem('chatbot-messages', JSON.stringify(messages));
  };

  return (
    <div className="vh-100 d-flex flex-column bg-dark" style={{backgroundColor: '#fafafa', fontFamily: 'Inter, sans-serif'}}>
      <header className="text-white text-center py-3" style={{backgroundColor: '#ffbb00'}}>
        <div className="container">
          <h1 className="mb-0 fw-semibold">Bahrain Customs AI Assistant</h1>
        </div>
      </header>
      <div className="flex-grow-1 d-flex justify-content-center align-items-center p-3">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="chatbot-wrapper text-dark">
                <Chatbot
                  className="chatbot"
                  config={botConfig}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}
                  saveMessages={saveMessages}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;