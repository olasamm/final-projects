import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import './Submit.css';
import Sidebar from '../components/Sidebar';
import Navbars from '../components/Navbars';
import { IoCheckmarkDone } from "react-icons/io5";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Submit = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const location = useLocation();
  const { assignmentTitle = 'Assignment', studentName = 'Student', course = 'Course' } = location.state || {};

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
    console.log('Sidebar visibility:', !isSidebarVisible);
  };

  return (
    <>
      <div>
        <div className="container-fluid">
          <div className="row">
            <button
              className="btn btn-primary d-lg-none mb-2"
              onClick={toggleSidebar}
            >
              <FaBars /> Menu
            </button>

            <div className="container-fluid">
              <div className="row">
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

                    <div className="g-1">
                      <center>
                        <div
                          className="shadow-sm done"
                          style={{
                            width: '150px',
                            height: '150px',
                            borderRadius: '50%',
                            backgroundColor: '#ffffff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IoCheckmarkDone style={{ fontSize: '100px', color: '#0d7408' }} />
                        </div>

                        <h3 className="text-dark">Well done! You've Successfully Submitted</h3>

                        <div className="mb-4">
                          <h4>{assignmentTitle}</h4>
                          <span className="me-4">
                            <i className="bi bi-person-fill me-2"></i>{studentName}
                          </span>
                          <span>
                            <i className="bi bi-book-fill me-2"></i>{course}
                          </span>
                        </div>

                        <h5>
                          Go to the <Link to="/submission" className="mx-2">Submission</Link> page to see your submitted assignment
                        </h5>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Submit;