import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Signin = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();

    if (!userId || !password) {
      setMessage('Please fill all the fields');
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    const allData = { id: userId, password };
    console.log('Sending to /signin:', allData); 
    const url = 'https://final-final-project-5.onrender.com/signin'; 

    try {
      const res = await axios.post(url, allData);
      console.log('Signin API response:', res.data); 
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
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error) {
      console.log('Signin error:', error.response ? error.response.data : error.message);
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
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-white p-5">
          <h3 className="mb-4">Login to the Website</h3>
          {message && (
            <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} w-75 mb-3`} role="alert">
              {message}
            </div>
          )}
          <form className="w-75" onSubmit={handleSignin}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control rounded-pill border-black focus:border-black focus:ring-black"
                placeholder="Matric Number"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control rounded-pill border-black focus:border-black focus:ring-black"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-outline-dark rounded-pill">
                LOGIN
              </button>
            </div>
          </form>
        </div>

        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white bg-primary p-5">
          <h3 className="text-center">Welcome to Website</h3>
          <p className="mt-3">New here?</p>
          <Link to="/signup">
            <button className="btn btn-dark rounded-pill px-4">REGISTER</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;