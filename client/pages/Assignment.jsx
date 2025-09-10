import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbars from '../components/Navbars';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Assignment = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('Assignment.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    console.log('Assignment.jsx: Fetching assignments from localStorage');
    console.log('Assignment.jsx: Stored Assignments:', JSON.parse(localStorage.getItem('assignments') || '[]'));
    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      setMessage('Please log in to view assignments.');
      setMessageType('danger');
      setTimeout(() => navigate('/signin'), 3000);
      return;
    }

    try {
      const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
      if (!Array.isArray(storedAssignments)) {
        console.error('Assignment.jsx: Invalid assignments data format');
        setMessage('Error loading assignments. Data format is invalid.');
        setMessageType('danger');
        return;
      }
      if (storedAssignments.length === 0) {
        setMessage('No assignments found.');
        setMessageType('info');
      } else {
        setAssignments(storedAssignments); // Display all assignments
        console.log('Assignment.jsx: Loaded assignments:', storedAssignments);
      }
    } catch (error) {
      console.error('Assignment.jsx: Error loading assignments:', error);
      setMessage('Error loading assignments. Please try again.');
      setMessageType('danger');
    }
  }, [navigate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

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
            {message && (
              <div className={`alert alert-${messageType} mb-4`} role="alert">
                {message}
              </div>
            )}
            <h5 className="my-5">Assignments</h5>
            <div className="container py-4">
              {assignments.length === 0 ? (
                <div className="alert alert-info">No assignments found.</div>
              ) : (
                assignments.map((assignment) => (
                  <div className="card mb-3 shadow-sm" key={assignment.id}>
                    <div className="card-body">
                      <h6>{assignment.title}</h6>
                      <p className="text-muted">{assignment.course}</p>
                      <p className="text-muted">Due: {assignment.dueDate} {assignment.dueTime}</p>
                      <Link
                        to={`/assignment/${assignment.id}`}
                        className="btn btn-sm btn-primary"
                        onClick={() => console.log('Assignment.jsx: Navigating to:', `/assignment/${assignment.id}`)}
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignment;