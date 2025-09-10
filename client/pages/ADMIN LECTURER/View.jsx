import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LecturerSidebar from '../../components/LecturerSidebar';
import Navbars from '../../components/Navbars';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const View = () => {
  const { assignmentId, submissionIndex } = useParams();
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [grade, setGrade] = useState('');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('View.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    console.log('View.jsx: Current URL:', window.location.pathname);
    console.log('View.jsx: Assignment ID:', assignmentId);
    console.log('View.jsx: Submission Index:', submissionIndex);
    console.log('View.jsx: Full localStorage.assignments:', JSON.parse(localStorage.getItem('assignments') || '[]'));
    console.log('View.jsx: Full localStorage.submissions:', JSON.parse(localStorage.getItem('submissions') || '{}'));

    if (!assignmentId || submissionIndex === undefined) {
      console.error('View.jsx: Invalid assignment ID or submission index');
      setMessage('Invalid parameters. Redirecting to dashboard...');
      setMessageType('danger');
      setTimeout(() => navigate('/lecturerDashboard'), 3000);
      return;
    }

    try {
      const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
      const selectedAssignment = storedAssignments.find(a => String(a.id) === String(assignmentId));
      if (!selectedAssignment) {
        console.error('View.jsx: Assignment not found for ID:', assignmentId);
        setMessage('Assignment not found.');
        setMessageType('danger');
        setTimeout(() => navigate('/lecturerDashboard'), 3000);
        return;
      }
      setAssignment(selectedAssignment);

      const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '{}');
      if (!storedSubmissions[assignmentId] || !storedSubmissions[assignmentId][submissionIndex]) {
        console.error('View.jsx: Submission not found for ID:', assignmentId, 'Index:', submissionIndex);
        setMessage('Submission not found.');
        setMessageType('danger');
        setTimeout(() => navigate(`/lecturer-submission/${assignmentId}`), 3000);
        return;
      }
      const selectedSubmission = storedSubmissions[assignmentId][submissionIndex];
      setSubmission(selectedSubmission);
      setGrade(selectedSubmission.grade || '');
      setComment(selectedSubmission.comment || '');
      console.log('View.jsx: Loaded assignment:', selectedAssignment);
      console.log('View.jsx: Loaded submission:', selectedSubmission);
    } catch (error) {
      console.error('View.jsx: Error loading data:', error);
      setMessage('Error loading submission. Please try again.');
      setMessageType('danger');
      setTimeout(() => navigate('/lecturerDashboard'), 3000);
    }
  }, [assignmentId, submissionIndex, navigate]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
        setMessageType('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleGradeSubmit = () => {
    if (!grade || isNaN(grade) || grade < 0 || grade > 100) {
      setMessage('Please enter a valid grade (0-100).');
      setMessageType('danger');
      return;
    }

    try {
      const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '{}');
      if (!storedSubmissions[assignmentId] || !storedSubmissions[assignmentId][submissionIndex]) {
        setMessage('Error updating submission.');
        setMessageType('danger');
        return;
      }
      storedSubmissions[assignmentId][submissionIndex].grade = parseInt(grade);
      storedSubmissions[assignmentId][submissionIndex].comment = comment;
      storedSubmissions[assignmentId][submissionIndex].totalGrade = grade;
      localStorage.setItem('submissions', JSON.stringify(storedSubmissions));

      const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '{}');
      const studentId = storedSubmissions[assignmentId][submissionIndex].studentId;
      if (!Array.isArray(storedNotifications[studentId])) {
        storedNotifications[studentId] = [];
      }
      const assignmentTitle = assignment ? assignment.title : `Assignment ${assignmentId}`;
      const courseCode = assignment ? assignment.course : 'Unknown Course';
      storedNotifications[studentId].push({
        assignmentId,
        status: 'graded',
        message: `Your ${assignmentTitle} (${courseCode}) has been graded. Total Grade: ${grade}`,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('notifications', JSON.stringify(storedNotifications));
      console.log('View.jsx: Updated submission:', storedSubmissions[assignmentId][submissionIndex]);
      console.log('View.jsx: Updated notifications:', storedNotifications);

      setMessage('Submission graded successfully!');
      setMessageType('success');
      setTimeout(() => navigate(`/lecturer-submission/${assignmentId}`), 2000);
    } catch (error) {
      console.error('View.jsx: Error saving grade:', error);
      setMessage('Error saving grade. Please try again.');
      setMessageType('danger');
    }
  };

  if (!assignment || !submission) {
    return (
      <div className="container my-4">
        <div className={`alert alert-${messageType}`}>
          {message || 'Loading submission...'}
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <button className="btn btn-primary d-lg-none mb-2" onClick={toggleSidebar}>
          <FaBars /> Menu
        </button>
        <div className={`col-lg-3 col-md-4 sidebar-container ${isSidebarVisible ? 'd-block' : 'd-none d-lg-block'}`}>
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
            <h5 className="my-5">
              Submission for {assignment.title} ({assignment.course})
            </h5>
            <div className="container py-4">
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h6>Student Details</h6>
                  <p><strong>Name:</strong> {submission.studentName}</p>
                  <p><strong>ID:</strong> {submission.studentId}</p>
                  <p><strong>Submitted At:</strong> {new Date(submission.submittedAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> {submission.status}</p>
                  <h6 className="mt-4">Answers</h6>
                  {assignment.questions.map((question, index) => (
                    <div key={index} className="mb-3">
                      <p><strong>Question {index + 1}:</strong> {question.text}</p>
                      <p><strong>Answer:</strong> {submission.answers[index] || 'No answer provided'}</p>
                      {submission.files[index] && submission.files[index].length > 0 && (
                        <div>
                          <strong>Files:</strong>
                          <ul>
                            {submission.files[index].map((file, fileIndex) => (
                              <li key={fileIndex}>
                                <a href={file} target="_blank" rel="noopener noreferrer">{file.split('/').pop()}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {submission.images[index] && submission.images[index].length > 0 && (
                        <div>
                          <strong>Images:</strong>
                          <div className="d-flex flex-wrap gap-2 mt-2">
                            {submission.images[index].map((img, imgIndex) => (
                              <img
                                key={imgIndex}
                                src={img}
                                alt={`Student Image ${imgIndex + 1}`}
                                className="img-thumbnail"
                                style={{ maxWidth: '100px' }}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <h6 className="mt-4">Grading</h6>
                  <div className="mb-3">
                    <label className="form-label">Grade (0-100)</label>
                    <input
                      type="number"
                      className="form-control"
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder="Enter grade"
                      min="0"
                      max="100"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comment</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Enter comment"
                    />
                  </div>
                  <button className="btn btn-primary" onClick={handleGradeSubmit}>
                    Submit Grade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;