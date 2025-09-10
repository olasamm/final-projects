import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbars from '../components/Navbars';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css';

const Dashboards = () => {
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [assignments, setAssignments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    console.log('Fetching from localStorage:');
    console.log('studentId:', localStorage.getItem('studentId'));
    console.log('studentName:', localStorage.getItem('studentName'));
    console.log('assignments:', JSON.parse(localStorage.getItem('assignments') || '[]'));
    console.log('notifications:', JSON.parse(localStorage.getItem('notifications') || '{}'));

    const storedStudentId = localStorage.getItem('studentId');
    const storedStudentName = localStorage.getItem('studentName');
    if (!storedStudentId || !storedStudentName) {
      setMessage('Please log in to view your dashboard.');
      setMessageType('error');
      navigate('/signin');
      return;
    }
    setStudentId(storedStudentId);
    setStudentName(storedStudentName);

    const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]').slice(0, 4);
    setAssignments(storedAssignments);

    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '{}');
    if (storedNotifications[storedStudentId] && Array.isArray(storedNotifications[storedStudentId])) {
      setNotifications(storedNotifications[storedStudentId]);
    }

    const interval = setInterval(() => {
      const updatedNotifications = JSON.parse(localStorage.getItem('notifications') || '{}');
      if (updatedNotifications[storedStudentId] && Array.isArray(updatedNotifications[storedStudentId])) {
        setNotifications(updatedNotifications[storedStudentId]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [navigate, studentId]);

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

            <div className="card welcome-card mb-4">
              <h5>Welcome, {studentName || 'Guest'}</h5>
              <p>You have {assignments.length} available assignments.</p>
            </div>

            <h5 className="mb-3">My Assignments</h5>
            <div className="row g-4">
              {assignments.length === 0 ? (
                <div className="alert alert-info">No assignments available.</div>
              ) : (
                assignments.map((assignment) => (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={assignment.id}>
                    <div className="card assignment-card">
                      <img
                        src="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg?semt=ais_hybrid&w=740"
                        className="card-img-top"
                        alt="Assignment"
                      />
                      <div className="card-body">
                        <p className="card-text">
                          {assignment.title} <br />
                          <small>{assignment.course}</small>
                        </p>
                        <Link to={`/assignment/${assignment.id}`} className="btn btn-outline-primary btn-sm">
                          View Assignment
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="card notifications-card mt-4">
              <h6>Recent Activities/Notifications</h6>
              {notifications.length === 0 ? (
                <div className="alert alert-info">No notifications.</div>
              ) : (
                <ul className="list-unstyled">
                  {notifications.map((notification, index) => (
                    <li key={index}>
                      {notification.message}{' '}
                      <span className="text-muted">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboards;