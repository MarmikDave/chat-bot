import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './Chat.css';

const Chat = ({ messages, onNewMessage, onFileUpload }) => {
    const [question, setQuestion] = useState('');
    const [file, setFile] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);
    const [uploadedFileName, setUploadedFileName] = useState(null);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleAskQuestion = async (e) => {
        e.preventDefault();
        if (!question.trim() && !file) return;

        if (file) {
            await handleFileUpload();
        }

        if (question.trim()) {
            const userMessage = { role: 'user', content: question };
            onNewMessage(userMessage);

            try {
                const res = await axios.post('http://localhost:5000/api/chat/ask', { 
                    question,
                    filename: uploadedFileName 
                });
                const aiMessage = { role: 'ai', content: res.data.answer };
                onNewMessage(aiMessage);
                setQuestion('');
                setUploadedFileName(null);  // Reset the filename after use
            } catch (err) {
                const errorMessage = { role: 'ai', content: 'Error occurred' };
                onNewMessage(errorMessage);
            }
        }
    };
    const handleFileUpload = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/api/upload/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            onFileUpload(res.data.file);
            onNewMessage({ role: 'user', content: `Uploaded file: ${file.name}` });
            setUploadedFileName(res.data.file.filename);
            setFile(null);
            fileInputRef.current.value = '';
        } catch (err) {
            onNewMessage({ role: 'ai', content: 'File upload failed' });
        }
    };
    return (
        <>
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.role}`}>
                        <p>{msg.content}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleAskQuestion} className="message-input">
                <input
                    type="text"
                    value={question}
                    onChange={handleQuestionChange}
                    placeholder="Ask a financial question..."
                />
                {/* <label htmlFor="file-upload" className="file-upload-label">
                    📎
                </label> */}
                <input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />
                <button type="submit">Send</button>
            </form>
            {file && <div className="file-preview">{file.name}</div>}
        </>
    );
};

export default Chat;