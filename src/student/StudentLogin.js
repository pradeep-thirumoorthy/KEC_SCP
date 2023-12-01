import React, { useState } from 'react';
import { useStudentAuth } from './StudentAuthContext';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../index.css';
import axios from 'axios'
import log from '../images/7606000.jpg';
import {Card, Checkbox, Col, Image, Input, Row } from 'antd';

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
          console.log(response.data.token);
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
    <Card hoverable className=' m-lg-5 p-lg-5'>
    <Row gutter={20} justify="center" className='w-100 py-5' align="middle">
      
      <Col xs={24} lg={12}>
        <Image preview={false} src={log} alt='sample' />
      </Col>
      <Col xs={24} lg={12}>
          <h1 className='w-100 text-center'>Student Login</h1>
          <p className='p-1 px-lg-5 mx-lg-5 text-center text-danger'>
            Note: You have to authenticate before proceeding to other pages in the student portal
          </p>
          {/* Other login form elements */}
          <form onSubmit={handleLogin}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={12}>
                <label className='ms-lg-5'>Kongu Email:</label>
              </Col>
              <Col xs={24} sm={12}>
              <Input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Mail Id (@kongu.edu)' required />
              </Col>
              
            </Row>
            <br></br>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={12}>
              <label className='ms-lg-5'>Password:</label>
              </Col>
              <Col xs={24} sm={12}>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Your password' required />
              </Col>
              
            </Row>
            <div className='my-3 w-100 text-center'>
              <Checkbox>Remember Me</Checkbox>
            </div>
            <div className='w-100 text-center'>
            <Input type='submit' style={{width:'100px'}} className='btn btn-lg btn-dark' value={"Login"}/>
            </div>
          </form>
          <div className='my-3 w-100 text-center'>
            <a className='text-black' href='/student/forgetpass'>Did you forget your password?</a>
          </div>
          <div className='w-100 text-center'>
            Are you a student? <a className='text-black' href='/admin/login'>Click here</a>
          </div>
      </Col>
    </Row>
    </Card>
  );
};

export default StudentLogin;
