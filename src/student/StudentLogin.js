import React, { useState } from 'react';
import { useStudentAuth } from './StudentAuthContext';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../index.css';
import axios from 'axios'
import log from '../images/unseen-studio-s9CC2SKySJM-unsplash.jpg';
const StudentLogin = () => {
  const { isStudentAuthenticated, studentLogin } = useStudentAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/SCP/student-login.php', { email, password },)
      .then(response => {
        if (response.data.success) {
          studentLogin(email);
        } else {
          window.confirm("Invalid Credentials");
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };
  if (isStudentAuthenticated) {
    return <Navigate to="/student/dashboard" replace />;
  }
  return (
    <div className='w-100 min-vh-100 row bg-success ms-0 bg-opacity-25 py-5 overflow-hidden'>
    <div className='col-lg-6 me-5 align-self-center'><img  className='w-100 h-100' src={log} alt='sample'/></div>
    <div className='align-self-center col-lg-5 col-12 my-5 bg-light p-5 rounded-3 h-75'>
            <h2 className='w-100 fs-1 my-4 text-center'>Student Login</h2>
            <p className='p-1 px-5 mx-5 text-center text-danger'>Note:You have to authenticate before proceed to other page in student portal</p>
            <p className='p-1 px-5 mx-5 text-center'>Please enter your credentials <br></br>to access the student dashboard.</p>
            <form onSubmit={handleLogin}>
              <div className='row'>
              <div className=' col-4 mb-3 fs-5 align-content-center text-center text-nowrap'>Kongu Email:</div>
              <div className='col-6 mb-3'>
                <input className='ms-5' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Mail Id (@kongu.edu)' required/>
              </div>
              </div>
              <div className='row'>
              <div className='col-4 mb-3 fs-5 align-content-center text-center'>Password:</div>
              <div className='col-6 mb-3'>
                <input className='ms-5' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your password' required/>
              </div>
              </div>
              <label className='my-3 w-100 text-center'><input type="checkbox"/>Remember Me</label>
              <div className='text-center'><input type='submit' className='btn btn-lg btn-dark' value={"Login"}/></div>
            </form>
            <div className='my-3 w-100 text-center'><a className='text-black' href='/student/forgetpass'>Did you forgot Password??</a></div>
            <div className='my-3 w-100 text-center'>Are you a student?<a className='text-black' href='/admin/login'>Click This</a></div>
          </div>
      
    <div className='col-lg-1'></div>
  </div>
  );
};

export default StudentLogin;
