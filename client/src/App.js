import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import Chat from './components/Chat';
import './App.css';

const App = () => {
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionIndex, setCurrentSessionIndex] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleNewChat = () => {
    const newSession = { id: Date.now(), messages: [], title: 'New Chat' };
    setChatSessions([...chatSessions, newSession]);
    setCurrentSessionIndex(chatSessions.length);
  };

  const handleNewMessage = (message) => {
    if (currentSessionIndex !== null) {
      const updatedSessions = [...chatSessions];
      updatedSessions[currentSessionIndex].messages.push(message);
      
      // Update the chat title if it's the first message
      if (updatedSessions[currentSessionIndex].messages.length === 1 && message.role === 'user') {
        updatedSessions[currentSessionIndex].title = message.content.split(' ').slice(0, 3).join(' ') + '...';
      }
      
      setChatSessions(updatedSessions);
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFiles([...uploadedFiles, file]);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>Chat History</h2>
        <button onClick={handleNewChat} className="new-chat-btn">+ New Chat</button>
        <ul className="chat-list">
          {chatSessions.map((session, index) => (
            <li 
              key={session.id} 
              onClick={() => setCurrentSessionIndex(index)}
              className={index === currentSessionIndex ? 'active' : ''}
            >
              {session.title}
            </li>
          ))}
        </ul>
      </aside>
      <main className="main-content">
        <header>
          <h1>AI Financial Assistant</h1>
        </header>
        {currentSessionIndex !== null && (
          <Chat 
            messages={chatSessions[currentSessionIndex].messages} 
            onNewMessage={handleNewMessage} 
          />
        )}
        <FileUpload onFileUpload={handleFileUpload} />
      </main>
    </div>
  );
};

export default App;