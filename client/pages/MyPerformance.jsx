import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Navbars from '../components/Navbars';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Performance.css';

const MyPerformance = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [gradedSubmissions, setGradedSubmissions] = useState([]);
  const [courseAverages, setCourseAverages] = useState({});
  const [overallAverage, setOverallAverage] = useState(null);
  const [studentName, setStudentName] = useState('Student');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('MyPerformance.jsx: Sidebar visibility:', !isSidebarVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log('MyPerformance.jsx: Fetching data');
      const studentId = localStorage.getItem('studentId');
      if (!studentId) {
        setMessage('Please log in to view performance.');
        setMessageType('danger');
        setTimeout(() => navigate('/signin'), 3000);
        return;
      }

      try {
        setStudentName(localStorage.getItem('studentName') || 'Student');

        
        const [assignmentsRes, submissionsRes] = await Promise.all([
          axios.get('https://final-final-project-5.onrender.com/assignments'),
          axios.get('https://final-final-project-5.onrender.com/submissions')
        ]);
        const assignments = assignmentsRes.data;
        const submissions = submissionsRes.data;
        console.log('MyPerformance.jsx: Backend assignments:', assignments);
        console.log('MyPerformance.jsx: Backend submissions:', submissions);

        if (!assignments.length) {
          setMessage('No assignments available. Please contact your lecturer.');
          setMessageType('warning');
          return;
        }
        if (!Object.keys(submissions).length) {
          setMessage('No submissions found. Please submit assignments.');
          setMessageType('warning');
          return;
        }

        localStorage.setItem('assignments', JSON.stringify(assignments));
        localStorage.setItem('submissions', JSON.stringify(submissions));

        const gradedSubs = [];
        Object.keys(submissions).forEach((assignmentId) => {
          const subs = submissions[assignmentId] || [];
          const studentGradedSubs = subs.filter(
            sub => sub.studentId.toString() === studentId.toString() && sub.totalGrade && !isNaN(parseFloat(sub.totalGrade))
          );
          studentGradedSubs.forEach(sub => {
            const assignment = assignments.find(a => a.id.toString() === sub.assignmentId.toString());
            console.log('MyPerformance.jsx: Matching assignmentId:', sub.assignmentId, 'Found:', assignment);
            gradedSubs.push({
              ...sub,
              assignment: assignment || {
                title: 'Unknown Assignment',
                course: 'Unknown Course',
                lecturerName: 'Unknown Lecturer'
              },
            });
          });
        });
        setGradedSubmissions(gradedSubs);
        console.log('MyPerformance.jsx: Graded Submissions:', gradedSubs);

        const courseGrades = {};
        gradedSubs.forEach(sub => {
          const course = sub.assignment.course || 'Unknown';
          if (!courseGrades[course]) {
            courseGrades[course] = [];
          }
          courseGrades[course].push(parseFloat(sub.totalGrade));
        });
        const averages = {};
        Object.keys(courseGrades).forEach(course => {
          const grades = courseGrades[course];
          averages[course] = grades.length > 0 ? (grades.reduce((sum, g) => sum + g, 0) / grades.length).toFixed(2) : 'N/A';
        });
        setCourseAverages(averages);
        console.log('MyPerformance.jsx: Course Averages:', averages);

        const allGrades = Object.values(courseGrades).flat();
        const avg = allGrades.length > 0 ? (allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length).toFixed(2) : 'N/A';
        setOverallAverage(avg);
        console.log('MyPerformance.jsx: Overall Average:', avg);
      } catch (error) {
        console.error('MyPerformance.jsx: Error loading backend data:', error);
        setMessage('Failed to load data from backend. Trying localStorage.');
        setMessageType('warning');

        try {
          const storedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
          const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '{}');
          console.log('MyPerformance.jsx: Fallback assignments:', storedAssignments);
          console.log('MyPerformance.jsx: Fallback submissions:', storedSubmissions);

          const gradedSubs = [];
          Object.keys(storedSubmissions).forEach((assignmentId) => {
            const subs = storedSubmissions[assignmentId] || [];
            const studentGradedSubs = subs.filter(
              sub => sub.studentId.toString() === studentId.toString() && sub.totalGrade && !isNaN(parseFloat(sub.totalGrade))
            );
            studentGradedSubs.forEach(sub => {
              const assignment = storedAssignments.find(a => a.id.toString() === sub.assignmentId.toString());
              console.log('MyPerformance.jsx: Fallback matching assignmentId:', sub.assignmentId, 'Found:', assignment);
              gradedSubs.push({
                ...sub,
                assignment: assignment || {
                  title: 'Unknown Assignment',
                  course: 'Unknown Course',
                  lecturerName: 'Unknown Lecturer'
                },
              });
            });
          });
          setGradedSubmissions(gradedSubs);

          const courseGrades = {};
          gradedSubs.forEach(sub => {
            const course = sub.assignment.course || 'Unknown';
            if (!courseGrades[course]) {
              courseGrades[course] = [];
            }
            courseGrades[course].push(parseFloat(sub.totalGrade));
          });
          const averages = {};
          Object.keys(courseGrades).forEach(course => {
            const grades = courseGrades[course];
            averages[course] = grades.length > 0 ? (grades.reduce((sum, g) => sum + g, 0) / grades.length).toFixed(2) : 'N/A';
          });
          setCourseAverages(averages);

          const allGrades = Object.values(courseGrades).flat();
          const avg = allGrades.length > 0 ? (allGrades.reduce((sum, g) => sum + g, 0) / allGrades.length).toFixed(2) : 'N/A';
          setOverallAverage(avg);
        } catch (fallbackError) {
          console.error('MyPerformance.jsx: Fallback error:', fallbackError);
          setMessage('No data available. Please submit assignments and try again.');
          setMessageType('danger');
        }
      }
    };

    fetchData();
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

  const getGradeColorClass = (grade) => {
    const numGrade = parseFloat(grade);
    if (numGrade >= 80) return 'grade-success';
    if (numGrade >= 50) return 'grade-warning';
    return 'grade-danger';
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
            <h5 className="mb-4 performance-title">My Performance - {studentName}</h5>
            <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-light mb-4 rounded shadow-sm">
              <div className="dropdown">
                <button
                  className="btn btn-outline-primary dropdown-toggle"
                  type="button"
                  id="filterDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter
                </button>
                <ul className="dropdown-menu" aria-labelledby="filterDropdown">
                  <li><a className="dropdown-item" href="#">All Courses</a></li>
                  {Object.keys(courseAverages).map(course => (
                    <li key={course}><a className="dropdown-item" href="#">{course}</a></li>
                  ))}
                </ul>
              </div>
              <div className="input-group shadow-sm">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Assignments..."
                  aria-label="Search"
                />
                <span className="input-group-text bg-white border-start-0">
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="card performance-card overall-card shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">Overall Performance</h6>
                    <p className="fs-4 text-primary">
                      {overallAverage && overallAverage !== 'N/A' ? `${overallAverage}%` : 'No graded assignments'}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card performance-card course-card shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">Course Averages</h6>
                    {Object.keys(courseAverages).length === 0 ? (
                      <p>No graded assignments</p>
                    ) : (
                      <ul className="list-unstyled">
                        {Object.entries(courseAverages).map(([course, avg]) => (
                          <li key={course} className="mb-2">
                            <span className="course-name">{course}:</span>{' '}
                            <span className={getGradeColorClass(avg)}>
                              {avg !== 'N/A' ? `${avg}%` : 'No grades'}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <h6 className="mb-3 table-title">Graded Assignments</h6>
            <div className="table-responsive">
              <table className="table table-hover table-bordered performance-table">
                <thead className="table-header">
                  <tr>
                    <th>Assignment Title</th>
                    <th>Course ID</th>
                    <th>Lecturer</th>
                    <th>Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {gradedSubmissions.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="text-center text-muted">
                        No graded assignments found. Please submit assignments.
                      </td>
                    </tr>
                  ) : (
                    gradedSubmissions.map((sub, index) => (
                      <tr key={index} className="table-row">
                        <td>{sub.assignment.title || 'Unknown Assignment'}</td>
                        <td>{sub.assignment.course || 'Unknown Course'}</td>
                        <td>{sub.assignment.lecturerName || 'Unknown Lecturer'}</td>
                        <td>
                          <span className={getGradeColorClass(sub.totalGrade)}>
                            {sub.totalGrade}%
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPerformance;