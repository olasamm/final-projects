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
    // const url = 'https://final-final-project-4.onrender.com/submit'
    const url = 'https://final-final-project-5.onrender.com/submit'; 

    try {
      const res = await axios.post(url, allData);
      console.log('Signup API response:', res.data);

      if (res.status === 200 || res.status === 201) {
        localStorage.setItem('userId', res.data.id);
        localStorage.setItem('userName', res.data.name);

        setMessage('User Created Successfully');
        setMessageType('success');

        setTimeout(() => navigate('/signin'), 2000);
      }
    } catch (error) {
      console.log('Signup error:', error.response ? error.response.data : error.message);

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
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-white p-5">
          <h3 className="mb-4">Create Account</h3>
          {message && (
            <p
              className={`alert mt-3 text-center ${
                messageType === 'success' ? 'alert-success' : 'alert-danger'
              }`}
            >
              {message}
            </p>
          )}
          <form className="w-75" onSubmit={handleSignup}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-pill border-black"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-pill border-black"
                placeholder="Matric Number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control rounded-pill border-black"
                placeholder="Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control rounded-pill border-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-outline-dark rounded-pill">
                REGISTER
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white bg-primary p-5">
          <h3 className="text-center">Welcome back to<br />Website</h3>
          <p className="mt-3">Already have an account?</p>
          <Link to="/signin">
            <button className="btn btn-dark rounded-pill px-4">LOGIN</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
