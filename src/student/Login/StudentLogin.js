import React, {useState } from 'react';
import { useStudentAuth } from '../Authenticate/StudentAuthContext';
import { Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import log from '../../images/7606000.jpg';
import Link from 'antd/es/typography/Link';
import { Card, Checkbox, Col, Image, Input, Row, Typography, notification } from 'antd';

const StudentLogin = () => {
  const { isStudentAuthenticated, studentLogin } = useStudentAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/Student/Login.php', { email, password })
      .then((response) => {
        if (response.data.success) {
          setTimeout(() => {
          studentLogin(email);
          }, 1000);
          
          openNotification('success', 'Login Success');
        } else {
          openNotification('error', 'Login Failed', 'Invalid credentials. Please try again.');
        }
      })
      .catch((error) => {
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
          <Typography.Title level={1} className='w-100 text-center'>Student Login</Typography.Title>
          <form onSubmit={handleLogin}>
            <Row gutter={[16, 16]}>
              <Col xs={12} sm={12}>
                <label className='ms-lg-5'>Kongu Email:</label>
              </Col>
              <Col xs={24} sm={12}>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Mail Id (@kongu.edu)' required />
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
              <Input type='submit' style={{ width: '100px' }} className='btn btn-lg btn-dark' value={"Login"} />
            </div>
          </form>
          <div className='my-3 w-100 text-center'>
            <Link href='/student/forgetpass'>Did you forget your password?</Link>
          </div>
          <div className='w-100 text-center'>
            Are you a student? <Link href='/admin/login'>Click here</Link>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default StudentLogin;
