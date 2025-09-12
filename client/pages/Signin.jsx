import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signin.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignin = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!userId || !password) {
      setMessage('Please fill all the fields');
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const allData = { id: userId, password };
    const url = 'https://final-projects-1.onrender.com/student/signin'; // Updated endpoint

    try {
      const res = await axios.post(url, allData);
      if (res.status === 200 || res.status === 201) {
        const { id, name } = res.data;
        if (!id || !name) {
          setMessage('Invalid response from server: Missing id or name');
          setMessageType('error');
          setTimeout(() => setMessage(''), 2000);
          return;
        }
        localStorage.setItem('studentId', id);
        localStorage.setItem('studentName', name);
        setMessage('User Signed In Successfully');
        setMessageType('success');
        
        const uniqueId = crypto.randomUUID(); // Generate a unique ID for the session
        localStorage.setItem('dashboardId', uniqueId); // Store the unique ID in localStorage
        setTimeout(() => navigate(`/dashboard/${uniqueId}`), 2000);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          setMessage('User not found. Please check your Matric Number or sign up.');
        } else if (error.response.status === 401) {
          setMessage(error.response.data.error || 'Invalid password');
        } else {
          setMessage(error.response.data.error || 'An error occurred. Please try again.');
        }
      } else {
        setMessage('Network error. Please check your connection.');
      }
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="lecturer-signup-container">
      <div className="lecturer-signup-card">
        <div className="lecturer-signup-left">
          <h2 className="lecturer-signup-title">Sign In</h2>
          
          {message && (
            <div
              className={`alert-message ${
                messageType === 'success' ? 'success' : 'error'
              }`}
            >
              {message}
            </div>
          )}

          <form className="lecturer-signup-form" onSubmit={handleSignin}>
            <div className="lecturer-input-group">
              <div className="lecturer-input-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
                </svg>
              </div>
              <input
                type="number"
                className="lecturer-form-input"
                placeholder="Matric Number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
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

               {isLoading ? (
                <>
               <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                     <span style={{ marginLeft: '8px' }}>Loading...</span>
               </>
              ) : (
                <span>SIGNIN</span>
                 )}
            </button>


          </form>
        </div>

        <div className="lecturer-signup-right">
          <h2 className="welcome-title">Welcome back to<br />Website</h2>
          <p className="welcome-text">Don't have an account?</p>
          <Link to="/signup">
            <button className="lecturer-signin-button">SIGN UP</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;