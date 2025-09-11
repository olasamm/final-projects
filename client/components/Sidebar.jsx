import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaTasks, FaChartBar, FaUsers, FaBook, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="sidebar p-3 border-end sidebar-content">
      <h4 className="text-primary">WEBSITE</h4>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link active">
            <FaTachometerAlt className="me-2" /> Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <FaUser className="me-2" /> My Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/assignment" className="nav-link">
            <FaTasks className="me-2" /> My Assignments
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/submission" className="nav-link">
            <FaTasks className="me-2" /> My Submission
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/performance" className="nav-link">
            <FaChartBar className="me-2" /> My Performance
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/studentResources" className="nav-link">
            <FaBook className="me-2" /> Resources
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/settings" className="nav-link">
            <FaCog className="me-2" /> Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link">
            <FaSignOutAlt className="me-2" /> Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;