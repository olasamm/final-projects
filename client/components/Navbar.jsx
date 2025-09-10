import React from 'react';
import './Navbars.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand text-light" href="#">Navbar</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ms-auto">
              <a className="nav-link active text-light" aria-current="page" href="#">Home</a>
              <a className="nav-link text-light" href="#">About Us</a>
              <a className="nav-link text-light" href="#">Contact Us</a>
              <li className="nav-item dropdown">
                <button
                  className="btn btn-light dropdown-toggle portal mx-5"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  E-portal
                </button>
                <ul className="dropdown-menu dropdown-menu-light border-0">
                  <li>
                    <Link className="dropdown-item portal" to="/LecturerSignup">Lecturer</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item portal" to="/signup">Student</Link>
                  </li>
                </ul>
              </li>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;