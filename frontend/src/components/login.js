import React, { useState } from 'react';
import axios from 'axios';
import './styles/Login.css'; // Assuming you store the CSS in Auth.css

const Login = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState('');

  const handleSendOtp = async () => {
    try {
      await axios.post('http://localhost:3001/api/otp', { email });
      setOtpSent(true);
      setOtpSuccessMessage('OTP has been sent to your email.');
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/api/otpVerify', { email, otp });
      alert('Login successful.');
      const response = await axios.post('http://localhost:3001/api/auth/login', {email});
      if(response.status !== 200) {
        console.log(response.status);
      }else {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = '/user-type-selection'; // Redirect to home page or dashboard
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data); // Set error message from server response
      } else {
        setErrorMessage('Something went wrong. Please try again.'); // Fallback error message
      }
      console.error(error); // Log the error for debugging
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="button" onClick={handleSendOtp}>
            Send OTP
          </button>
        </label>
        {otpSent && (
          <>
            <label>
              OTP:
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </label>
            <p style={{ color: 'green' }}>{otpSuccessMessage}</p>
          </>
        )}
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;
