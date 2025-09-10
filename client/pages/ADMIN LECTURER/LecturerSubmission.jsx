import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import LecturerSidebar from '../../components/LecturerSidebar';
import Navbars from '../../components/Navbars';
import './ment.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const LecturerSubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('LecturerSubmission.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  const fetchSubmissions = () => {
    console.log('LecturerSubmission.jsx: Current URL:', window.location.pathname);
    console.log('LecturerSubmission.jsx: Assignment ID:', id);
    console.log('LecturerSubmission.jsx: Full localStorage.submissions:', JSON.parse(localStorage.getItem('submissions') || '{}'));
    console.log('LecturerSubmission.jsx: Full localStorage.assignments:', JSON.parse(localStorage.getItem('assignments') || '[]'));

    if (!id) {
      console.error('LecturerSubmission.jsx: No assignment ID provided');
      setMessage('Invalid assignment ID. Redirecting to dashboard...');
      setMessageType('danger');
      setSubmissions([]);
      setTimeout(() => navigate('/lecturerDashboard'), 3000);
      return;
    }

    try {
      const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
      const assignment = storedAssignments.find(a => String(a.id) === String(id));
      setAssignmentTitle(assignment ? `${assignment.title} (${assignment.course})` : `Assignment ${id}`);

      
      const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '{}');
      if (!storedSubmissions[id] || !Array.isArray(storedSubmissions[id])) {
        console.log(`LecturerSubmission.jsx: No submissions found for assignment ID ${id}`);
        setSubmissions([]);
        setMessage(`No submissions found for ${assignment ? assignment.title : 'assignment ID ' + id}.`);
        setMessageType('info');
      } else {
        setSubmissions(storedSubmissions[id]);
        setMessage('');
        setMessageType('');
        console.log('LecturerSubmission.jsx: Submissions loaded:', storedSubmissions[id]);
      }
    } catch (error) {
      console.error('LecturerSubmission.jsx: Error loading data:', error);
      setMessage('Error loading submissions or assignments. Please try again.');
      setMessageType('danger');
      setSubmissions([]);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, [id, navigate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleStatus = (submissionIndex, status) => {
    try {
      const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '{}');
      if (!storedSubmissions[id] || !storedSubmissions[id][submissionIndex]) {
        setMessage('Error updating submission status.');
        setMessageType('danger');
        return;
      }
      const submission = storedSubmissions[id][submissionIndex];
      submission.status = status;
      localStorage.setItem('submissions', JSON.stringify(storedSubmissions));
      setSubmissions([...storedSubmissions[id]]);

      const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '{}');
      const studentId = submission.studentId;
      if (!Array.isArray(storedNotifications[studentId])) {
        storedNotifications[studentId] = [];
      }
      const assignment = JSON.parse(localStorage.getItem('assignments') || '[]').find(a => String(a.id) === String(id));
      const assignmentTitle = assignment ? assignment.title : `Assignment ${id}`;
      const courseCode = assignment ? assignment.course : 'Unknown Course';
      storedNotifications[studentId].push({
        assignmentId: id,
        status: status,
        message: `Your ${assignmentTitle} (${courseCode}) has been ${status}.`,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('notifications', JSON.stringify(storedNotifications));
      console.log('LecturerSubmission.jsx: Updated notifications:', storedNotifications);

      setMessage(`Submission ${status} successfully! Notification sent to student.`);
      setMessageType('success');
    } catch (error) {
      console.error('LecturerSubmission.jsx: Error updating status:', error);
      setMessage('Error updating submission status. Please try again.');
      setMessageType('danger');
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <button
          className="btn btn-primary d-lg-none mb-2"
          onClick={toggleSidebar}
        >
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
            <h5 className="my-5">Submissions for {assignmentTitle || 'Unknown Assignment'}</h5>
            <div className="container py-4">
              {submissions.length === 0 ? (
                <div className="alert alert-info">
                  No submissions found for {assignmentTitle || 'assignment ID ' + (id || 'Unknown')}.
                </div>
              ) : (
                submissions.map((submission, index) => (
                  <div className="card mb-3 shadow-sm border-0 rounded" key={index}>
                    <div className="card-body d-flex justify-content-between align-items-center">
                      <div>
                        <p className="mb-1"><strong>Student Name:</strong> {submission.studentName}</p>
                        <p className="mb-1"><strong>Student ID:</strong> {submission.studentId}</p>
                        <p className="mb-0"><strong>Status:</strong> {submission.status}</p>
                      </div>
                      <div className="text-end">
                        <div className="d-flex gap-2 justify-content-end align-items-center">
                          <Link
                            to={`/lecturer-view/${id}/${index}`}
                            className="btn btn-sm btn-primary"
                            onClick={() => console.log('LecturerSubmission.jsx: Navigating to:', `/lecturer-view/${id}/${index}`)}
                          >
                            View
                          </Link>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleStatus(index, 'accepted')}
                            disabled={submission.status !== 'pending'}
                          >
                            Accept
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleStatus(index, 'rejected')}
                            disabled={submission.status !== 'pending'}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
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

export default LecturerSubmission;