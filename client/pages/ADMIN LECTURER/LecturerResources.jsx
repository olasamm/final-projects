import { useState } from 'react';
import axios from 'axios';

const LecturerResources = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

const handleUpload = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('file', file); 

  try {
    const res = await axios.post('https://final-projects-1.onrender.com/resources', formData);
    setMessage(res.data.message); 
  } catch (error) {

    console.error('Error uploading resource:', error);

    if (error.response && error.response.data && error.response.data.message) {
      setMessage(`Error: ${error.response.data.message}`);
    } else {
      setMessage('Failed to upload resource. Please try again.');
    }
  }
};

  return (
    <div>
      <h2>Upload Resources</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button onClick={handleUpload} type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LecturerResources;