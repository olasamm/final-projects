import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbars from '../components/Navbars';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Open = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [assignment, setAssignment] = useState(null);
  const [answers, setAnswers] = useState({});
  const [files, setFiles] = useState({});
  const [images, setImages] = useState({});
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('Open.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    console.log('Open.jsx: Current URL:', window.location.pathname);
    console.log('Open.jsx: Assignment ID:', id);
    console.log('Open.jsx: Stored Assignments:', JSON.parse(localStorage.getItem('assignments') || '[]'));

    if (!id) {
      console.error('Open.jsx: No assignment ID provided');
      setMessage('Invalid assignment ID.');
      setMessageType('danger');
      setTimeout(() => navigate('/assignment'), 3000);
      return;
    }

    const studentId = localStorage.getItem('studentId');
    if (!studentId) {
      setMessage('Please log in to view this assignment.');
      setMessageType('danger');
      setTimeout(() => navigate('/signin'), 3000);
      return;
    }

    try {
      const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
      if (!Array.isArray(storedAssignments)) {
        console.error('Open.jsx: Invalid assignments data format');
        setMessage('Error loading assignment. Data format is invalid.');
        setMessageType('danger');
        setTimeout(() => navigate('/assignment'), 3000);
        return;
      }
      const selectedAssignment = storedAssignments.find(a => String(a.id) === String(id));
      if (!selectedAssignment) {
        console.error('Open.jsx: Assignment not found for ID:', id);
        setMessage('Assignment not found.');
        setMessageType('danger');
        setTimeout(() => navigate('/assignment'), 3000);
        return;
      }
      setAssignment(selectedAssignment);
      setAnswers(selectedAssignment.questions.reduce((acc, _, index) => ({ ...acc, [index]: '' }), {}));
      setFiles(selectedAssignment.questions.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {}));
      setImages(selectedAssignment.questions.reduce((acc, _, index) => ({ ...acc, [index]: [] }), {}));
      console.log('Open.jsx: Loaded assignment:', selectedAssignment);
    } catch (error) {
      console.error('Open.jsx: Error loading assignment:', error);
      setMessage('Error loading assignment. Please try again.');
      setMessageType('danger');
      setTimeout(() => navigate('/assignment'), 3000);
    }
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

  const handleAnswerChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleFileChange = (index, e) => {
    const newFiles = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setFiles({ ...files, [index]: newFiles });
  };

  const handleImageChange = (index, e) => {
    const newImages = Array.from(e.target.files).map(file => URL.createObjectURL(file));
    setImages({ ...images, [index]: newImages });
  };

  const handleSubmit = () => {
    const studentId = localStorage.getItem('studentId');
    const studentName = localStorage.getItem('studentName');
    if (!studentId || !studentName) {
      setMessage('Please log in to submit.');
      setMessageType('danger');
      return;
    }

    try {
      const submission = {
        assignmentId: id,
        studentId,
        studentName,
        answers,
        files,
        images,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        grade: null,
        comment: '',
        totalGrade: ''
      };

      const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '{}');
      if (!storedSubmissions[id]) {
        storedSubmissions[id] = [];
      }
      storedSubmissions[id].push(submission);
      localStorage.setItem('submissions', JSON.stringify(storedSubmissions));
      console.log('Open.jsx: Submission saved:', submission);
      console.log('Open.jsx: Updated submissions:', storedSubmissions);

      setMessage('Assignment submitted successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error('Open.jsx: Error submitting assignment:', error);
      setMessage('Error submitting assignment. Please try again.');
      setMessageType('danger');
    }
  };

  if (!assignment) {
    return (
      <div className="container my-4">
        <div className={`alert alert-${messageType}`}>
          {message || 'Loading assignment...'}
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
            <h5 className="my-5">{assignment.title} ({assignment.course})</h5>
            <p>Due: {assignment.dueDate} {assignment.dueTime}</p>
            <div className="container py-4">
              <div className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h6>Instructions</h6>
                  <p>{assignment.instructions || 'No instructions provided.'}</p>
                  {assignment.questions.map((question, index) => (
                    <div key={index} className="mb-3">
                      <h6>Question {index + 1}</h6>
                      <p>{question.text}</p>
                      <textarea
                        className="form-control mb-2"
                        rows="4"
                        value={answers[index] || ''}
                        onChange={(e) => handleAnswerChange(index, e.target.value)}
                        placeholder="Enter your answer"
                      />
                      <input
                        type="file"
                        className="form-control mb-2"
                        multiple
                        onChange={(e) => handleFileChange(index, e)}
                        accept=".pdf,.doc,.docx"
                      />
                      <input
                        type="file"
                        className="form-control mb-2"
                        multiple
                        onChange={(e) => handleImageChange(index, e)}
                        accept="image/*"
                      />
                      {images[index] && images[index].length > 0 && (
                        <div className="mt-2">
                          {images[index].map((img, imgIndex) => (
                            <img
                              key={imgIndex}
                              src={img}
                              alt={`Uploaded Image ${imgIndex + 1}`}
                              className="img-thumbnail"
                              style={{ maxWidth: '100px' }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit Assignment
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

export default Open;