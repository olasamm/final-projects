import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Navbars from '../components/Navbars';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Assignment.css';

const Submission = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [assignments, setAssignments] = useState([]);
  const [submissionStatus, setSubmissionStatus] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [studentName, setStudentName] = useState('Student');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('Submission.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    console.log('Submission.jsx: Fetching data from localStorage');
    console.log('Submission.jsx: Assignments:', JSON.parse(localStorage.getItem('assignments') || '[]'));
    console.log('Submission.jsx: Submissions:', JSON.parse(localStorage.getItem('submissions') || '{}'));
    console.log('Submission.jsx: Notifications:', JSON.parse(localStorage.getItem('notifications') || '{}'));

    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      setMessage('Please log in to view submissions.');
      setMessageType('danger');
      setTimeout(() => navigate('/signin'), 3000);
      return;
    }

    try {
      setStudentName(localStorage.getItem('studentName') || 'Student');
      const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
      if (!Array.isArray(storedAssignments)) {
        console.error('Submission.jsx: Invalid assignments data format');
        setMessage('Error loading assignments.');
        setMessageType('danger');
        return;
      }
      setAssignments(storedAssignments);

      const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '{}');
      const status = {};
      storedAssignments.forEach((assignment) => {
        const submissions = storedSubmissions[assignment.id] || [];
        const studentSubmission = submissions.find(sub => sub.studentId === studentId);
        status[assignment.id] = studentSubmission ? 'Submitted' : 'Pending';
      });
      setSubmissionStatus(status);

      const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '{}');
      const studentNotifications = storedNotifications[studentId] || [];
      studentNotifications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setNotifications(studentNotifications.slice(0, 4));
    } catch (error) {
      console.error('Submission.jsx: Error loading data:', error);
      setMessage('Error loading submission data. Please try again.');
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
            <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-light">
              <div className="dropdown">
                <button
                  className="dropdown-toggle shadow-sm"
                  type="button"
                  id="filterDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter
                </button>
                <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                  <li><a className="dropdown-item" href="#">All</a></li>
                  <li><a className="dropdown-item" href="#">Submitted</a></li>
                  <li><a className="dropdown-item" href="#">Pending</a></li>
                </ul>
              </div>
              <div className="input-group shadow-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Here...."
                  aria-label="Search"
                />
                <span className="input-group-text bg-white border-start-0">
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
            <h5 className="my-5">My Assignments</h5>
            <div className="g-1">
              {assignments.length === 0 ? (
                <div className="alert alert-info">No assignments found.</div>
              ) : (
                assignments.map((assignment) => (
                  <div className="card mb-3 ass-card border-0 shadow-sm" key={assignment.id}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <h5 className="fw-bold">{assignment.title}</h5>
                        <div className="d-flex text-muted">
                          <span className="me-4">
                            <i className="bi bi-person-fill me-2"></i>{assignment.lecturerName || 'Unknown Lecturer'}
                          </span>
                          <span>
                            <i className="bi bi-book-fill me-2"></i>{assignment.course}
                          </span>
                        </div>
                        <span className={`badge ${submissionStatus[assignment.id] === 'Submitted' ? 'bg-success' : 'bg-warning'} mt-2`}>
                          {submissionStatus[assignment.id] || 'Pending'}
                        </span>
                      </div>
                      <div className="text-end">
                        <p className="mb-2">{assignment.dueDate}</p>
                        <Link to={`/assignment/${assignment.id}`}>
                          <button className="btn btn-primary btn-sm">View</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="card notifications-card mt-4">
              <h6>Recent Notifications</h6>
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

export default Submission;