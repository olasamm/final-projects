import { useEffect, useState } from 'react';
import axios from 'axios';

const StudentResources = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get('http://localhost:9000/resources');
        setResources(res.data);
      } catch (error) {
        setError('Failed to fetch resources. Please try again later.');
        console.error(error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div>
      <h2>Available Resources</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={`https://final-projects-1.onrender.com/${resource.filePath}`} download>
              Download
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentResources;