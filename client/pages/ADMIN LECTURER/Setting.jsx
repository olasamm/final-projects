import React, { useState } from 'react'
import './ment.css';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

import { FaUser } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import LecturerSidebar from '../../components/LecturerSidebar';








const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
    "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas",
    "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize",
    "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
    "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China",
    "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus",
    "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia",
    "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia",
    "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea",
    "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan",
    "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea (North)", "Korea (South)",
    "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar",
    "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco",
    "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines",
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles",
    "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands",
    "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan",
    "Suriname", "Sweden", "Switzerland", "Syria", "Tajikistan", "Tanzania",
    "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia",
    "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
    "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

const Setting = () => {

    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
                
               
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
            <LecturerSidebar />
          </div>
          
            
          
              
              <div className="col-lg-9 col-md-8 main-content-container">
                <div className="main-content">
                
          
          
          
                
          
          
                  <div className="g-1">
                    
                  <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center mb-4">
            <img
              src="profile.jpg"
              alt="Profile"
              className="rounded-circle me-3"
              style={{ width: '50px', height: '50px' }}
            />
            <button className="btn btn-outline-secondary btn-sm">Change</button>
          </div>

          <div className="mb-3">
      <label className="form-label">Surname</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter your surname"
      />
    </div>

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="first name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Middle Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="middle name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <select className="form-select"  readOnly>
              <option value="Female">Female</option>
              <option value="Female">male</option>
            </select>
          </div>

          <div className="mb-3">
                            <label className="form-label">Nationality</label>
                            <select className="form-select">
                              {countries.map((country, index) => (
                                <option key={index} value={country}>
                                  {country}
                                </option>
                              ))}
                            </select>
                          </div>

          <div className="mb-3">
            <label className="form-label">Are you a Student or a Lecturer?</label>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                value="Student"
                checked={false}
                readOnly
              />
              <label className="form-check-label">Student</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                value="Lecturer"
                checked={true}
                readOnly
              />
              <label className="form-check-label">Lecturer</label>
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">School</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your school name here"
              value="Enter your school name here"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Field of Teaching</label>
            <input
              type="text"
              className="form-control"
              placeholder="Input"
              value="Input"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Position</label>
            <input
              type="text"
              className="form-control"
              placeholder="Input"
              value="Input"
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="enter ur email"
              value="name@domain.com"
              readOnly
            />
          </div>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
                    
                  </div>
          
          
          
          
                 
                </div>
              </div>
            </div>
          </div>
                  </div>
                </div>
              </div>
              
          </>
  )
}

export default Setting