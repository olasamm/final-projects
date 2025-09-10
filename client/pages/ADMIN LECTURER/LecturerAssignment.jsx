import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LecturerSidebar from '../../components/LecturerSidebar';
import Navbars from '../../components/Navbars';
import { FaBars } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const LecturerAssignment = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [instructions, setInstructions] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');
  const [questions, setQuestions] = useState([{ text: '', files: [], images: [] }]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('LecturerAssignment.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    const lecturerId = localStorage.getItem('lecturerId');
    if (!lecturerId) {
      setMessage('Please log in to create assignments.');
      setMessageType('danger');
      setTimeout(() => navigate('/lecturerSignin'), 3000);
    }
  }, [navigate]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', files: [], images: [] }]);
  };

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !course || !instructions || !dueDate || !dueTime || questions.some(q => !q.text)) {
      setMessage('Please fill all fields and provide at least one question.');
      setMessageType('danger');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    const lecturerName = localStorage.getItem('lecturerName') || 'Unknown Lecturer';
    const assignment = {
      id: Date.now().toString(),
      title,
      course,
      lecturerName,
      instructions,
      dueDate,
      dueTime,
      questions,
      createdAt: new Date().toISOString(),
    };

    try {
      
      const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
      storedAssignments.push(assignment);
      localStorage.setItem('assignments', JSON.stringify(storedAssignments));
      console.log('LecturerAssignment.jsx: Assignment saved to localStorage:', assignment);

      const url = 'https://final-final-project-5.onrender.com/create-assignment';
      const res = await axios.post(url, assignment);
      console.log('LecturerAssignment.jsx: API response:', res.data);

      setMessage('Assignment created successfully!');
      setMessageType('success');
      setTimeout(() => navigate('/lecturerDashboard'), 2000);
    } catch (error) {
      console.error('LecturerAssignment.jsx: Error creating assignment:', error);
      setMessage(error.response?.data?.error || 'Failed to create assignment.');
      setMessageType('danger');
      setTimeout(() => setMessage(''), 3000);
    }
  };

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
            <h5 className="mb-4">Create New Assignment</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Assignment Title</label>
                <input
                  type="text"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Course</label>
                <input
                  type="text"
                  className="form-control"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Instructions</label>
                <textarea
                  className="form-control"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Due Time</label>
                <input
                  type="time"
                  className="form-control"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                />
              </div>
              <h6 className="mb-3">Questions</h6>
              {questions.map((question, index) => (
                <div className="mb-3" key={index}>
                  <label className="form-label">Question {index + 1}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={question.text}
                    onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                  />
                </div>
              ))}
              <button
                type="button"
                className="btn btn-outline-secondary mb-3"
                onClick={handleAddQuestion}
              >
                Add Question
              </button>
              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Create Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerAssignment;