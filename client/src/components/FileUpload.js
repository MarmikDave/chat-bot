import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Import FileUpload CSS

const FileUpload = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        if (!file) {
            setMessage('No file selected');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:5000/api/upload/file', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(res.data.message);
            onFileUpload(res.data.file);
            // Clear the file input and state
            setFile(null);
            e.target.reset(); // This resets the form input, including the file input
        } catch (err) {
            setMessage('File upload failed');
        }
    };

    return (
        <div className="file-upload">
            <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload File</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default FileUpload;
