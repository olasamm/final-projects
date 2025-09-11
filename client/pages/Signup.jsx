import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !userId || !mail || !password) {
      setMessage('Please fill all the fields');
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const allData = { id: userId, name, mail, password };
    const url = 'https://final-projects-41c3.vercel.app/submit'; 

    try {
      const res = await axios.post(url, allData);
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('userName', res.data.name);
        setMessage('User Created Successfully');
        setMessageType('success');
        setTimeout(() => navigate('/signin'), 2000);
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error || 'Failed to sign up');
      } else {
        setMessage('Network error. Please check your connection.');
      }
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <div className="lecturer-signup-container">
      <div className="lecturer-signup-card">
        <div className="lecturer-signup-left">
          <h2 className="lecturer-signup-title">Create Account</h2>

          {message && (
            <div
              className={`alert-message ${
                messageType === 'success' ? 'success' : 'error'
              }`}
            >
              {message}
            </div>
          )}

          <form className="lecturer-signup-form" onSubmit={handleSignup}>
            <div className="lecturer-input-group">
              <div className="lecturer-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
                </svg>
              </div>
              <input
                type="text"
                className="lecturer-form-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="lecturer-input-group">
              <div className="lecturer-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <input
                type="text"
                className="lecturer-form-input"
                placeholder="Matric Number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>

            <div className="lecturer-input-group">
              <div className="lecturer-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor"/>
                </svg>
              </div>
              <input
                type="email"
                className="lecturer-form-input"
                placeholder="Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>

            <div className="lecturer-input-group">
              <div className="lecturer-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor"/>
                </svg>
              </div>
              <input
                type="password"
                className="lecturer-form-input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="lecturer-signup-button">
              SIGN UP
            </button>
          </form>
        </div>

        <div className="lecturer-signup-right">
          <h2 className="welcome-title">Welcome back to<br />Website</h2>
          <p className="welcome-text">Already have an account?</p>
          <Link to="/signin">
            <button className="lecturer-signin-button">SIGN IN</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;