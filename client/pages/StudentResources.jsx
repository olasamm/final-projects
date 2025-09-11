import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbars from '../components/Navbars';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'; 
import './StudentResources.css'; 

const StudentResources = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const [resources, setResources] = useState([]);
  const [error, setError] = useState('');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('Assignment.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      setError('Please log in to view resources.');
      setTimeout(() => navigate('/signin'), 3000);
      return;
    }
  }, [navigate]);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const res = await axios.get('https://final-projects-1.onrender.com/resources');
        setResources(res.data);
      } catch (error) {
        setError('Failed to fetch resources. Please try again later.');
        console.error(error);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <button className="btn btn-primary d-lg-none mb-2" onClick={toggleSidebar}>
          <FaBars /> Menu
        </button>
        <div className={`col-lg-3 col-md-4 sidebar-container ${isSidebarVisible ? 'd-block' : 'd-none d-lg-block'}`}>
          <Sidebar />
        </div>
        <div className="col-lg-9 col-md-8 main-content-container">
          <div className="main-content">
            <div className="my-4">
              <Navbars />
            </div>
            <div className="resources-container">
              <div className="resources-wrapper">
                <h2 className="resources-title">Available Resources</h2>
                {error && <p className="resources-error">{error}</p>}
                <div className="resources-grid">
                  {resources.map((resource) => (
                    <div key={resource._id} className="resource-card">
                      <h3 className="resource-title">{resource.title}</h3>
                      <p className="resource-description">{resource.description}</p>
                      <a
                        href={`https://final-projects-1.onrender.com/${resource.filePath}`}
                        download
                        className="resource-link btn btn-primary"
                      >
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentResources;