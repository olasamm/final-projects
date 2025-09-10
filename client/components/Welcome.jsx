import React from 'react'
import './Welcome.css'
import welcome from '../src/assets/second.png'; 

const Welcome = () => {
  return (
    <>
    <div className="welcome-container">
      <div className="welcome-content">
      <img
        src={welcome}
        alt="Welcome"
        className="welcome-image"
        style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }} 
        />
        <h1 className="welcome-title">Welcome to Platform-Name</h1>
        <p className="welcome-description">
          We're excited to have you here! Our platform makes assignment submissions easy,
          organized, and stress-free. Students can upload their work seamlessly, track
          deadlines, and receive feedback, while lecturers can manage submissions and grade
          effortlessly. Get started today and experience a smoother way to handle assignments!
        </p>
      </div>
    </div>
    </>
  )
}

export default Welcome