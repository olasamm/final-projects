import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import LecturerSidebar from '../../components/LecturerSidebar';
import Navbars from '../../components/Navbars';
import './board.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LecturerDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [submissionCounts, setSubmissionCounts] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [lecturerName, setLecturerName] = useState('Lecturer');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('LecturerDashboard.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    console.log('LecturerDashboard.jsx: Fetching data from localStorage');
    console.log('LecturerDashboard.jsx: Assignments:', JSON.parse(localStorage.getItem('assignments') || '[]'));
    console.log('LecturerDashboard.jsx: Submissions:', JSON.parse(localStorage.getItem('submissions') || '{}'));
    console.log('LecturerDashboard.jsx: Notifications:', JSON.parse(localStorage.getItem('notifications') || '{}'));

    const lecturerId = localStorage.getItem('lecturerId');
    if (!lecturerId) {
      setMessage('Please log in to view dashboard.');
      setMessageType('danger');
      setTimeout(() => navigate('/lecturerSignin'), 3000);
      return;
    }

    try {
      setLecturerName(localStorage.getItem('lecturerName') || 'Lecturer');
      const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
      if (!Array.isArray(storedAssignments)) {
        console.error('LecturerDashboard.jsx: Invalid assignments data format');
        setMessage('Error loading assignments.');
        setMessageType('danger');
        return;
      }
      setAssignments(storedAssignments);

      const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '{}');
      const counts = {};
      storedAssignments.forEach((assignment) => {
        counts[assignment.id] = storedSubmissions[assignment.id]?.length || 0;
      });
      setSubmissionCounts(counts);

      const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '{}');
      const allNotifications = [];
      Object.values(storedNotifications).forEach((studentNotifications) => {
        if (Array.isArray(studentNotifications)) {
          allNotifications.push(...studentNotifications);
        }
      });
      allNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setNotifications(allNotifications.slice(0, 4));
    } catch (error) {
      console.error('LecturerDashboard.jsx: Error loading data:', error);
      setMessage('Error loading dashboard data. Please try again.');
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
        <div
          className={`col-lg-3 col-md-4 sidebar-container ${
            isSidebarVisible ? 'd-block' : 'd-none d-lg-block'
          }`}
        >
          <LecturerSidebar />
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
              <h5>Welcome, {lecturerName}</h5>
              <p>
                {Object.values(submissionCounts).reduce((sum, count) => sum + count, 0)} students submitted their assignments
              </p>
            </div>
            <h5 className="mb-3">My Assignments</h5>
            <div className="row g-4">
              {assignments.length === 0 ? (
                <div className="alert alert-info">No assignments found.</div>
              ) : (
                assignments.map((assignment) => (
                  <div className="col-sm-6 col-md-4 col-lg-3" key={assignment.id}>
                    <div className="card assignment-card">
                      <img
                        src="https://img.freepik.com/free-vector/flat-creativity-concept-illustration_52683-64279.jpg?semt=ais_hybrid&w=740"
                        className="card-img-top"
                        alt="Assignment"
                      />
                      <div className="card-body text-center">
                        <p className="card-text">
                          {assignment.title} ({assignment.course}) <br />
                          <Link
                            to={`/lecturer-submission/${assignment.id}`}
                            className="btn btn-dark btn-sm"
                            onClick={() => console.log('LecturerDashboard.jsx: Navigating to:', `/lecturer-submission/${assignment.id}`)}
                          >
                            Check
                          </Link>
                        </p>
                        <p className="text-muted">
                          {submissionCounts[assignment.id] || 0} students submitted
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="card notifications-card mt-4">
              <h6>Recent Activities/Notifications</h6>
              <ul className="list-unstyled">
                {notifications.length === 0 ? (
                  <li>No recent notifications.</li>
                ) : (
                  notifications.map((notification, index) => (
                    <li key={index}>
                      {notification.message}{' '}
                      <span className="text-muted">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashboard;