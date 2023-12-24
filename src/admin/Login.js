import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../index.css';
import axios from 'axios';import Link from 'antd/es/typography/Link';
import log from '../images/vecteezy_people-planning-concept-entrepreneurship-and-planning-a_7954023.jpg';
import { Card, Checkbox, Col, Image, Input, Row, Typography } from 'antd';
const Login = () => {
  const { isAuthenticated, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/login.php', { email, password },)
      .then(response => {
        if (response.data.success) {
          login(email);
        } else {
          window.confirm("Invalid Credentials");
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
  };
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }
  return (
    <Card  hoverable className=' m-lg-5 px-lg-5' >
    <Row gutter={20} justify="center" className='w-100 py-5' align="middle">
      
      <Col xs={24} lg={12}>
        <Image preview={false} src={log} alt='sample' />
      </Col>
      <Col xs={24} lg={12}>
          <Typography.Title level={1} className='w-100 text-center'>Admin Login</Typography.Title>
          <p className='p-1 px-lg-5 mx-lg-5 text-center text-danger'>
            Note: You have to authenticate before proceeding to other pages in the student portal
          </p>
          {/* Other login form elements */}
          <form onSubmit={handleLogin}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={12}>
                <label className='ms-5'>Kongu Email:</label>
              </Col>
              <Col xs={24} sm={12}>
              <Input  type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Mail Id (@kongu.edu)' required />
              </Col>
              
            </Row>
            <br></br>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={12}>
              <label className='ms-5'>Password:</label>
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
            <Link  href='/admin/forgetpass'>Did you forget your password?</Link>
          </div>
          <div className='w-100 text-center'>
            Are you a student? <Link  href='/student/login'>Click here</Link>
          </div>
      </Col>
    </Row>
    </Card>
  );
};

export default Login;
