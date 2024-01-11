import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Button, Card, Col, Image, Input, Row, Typography } from 'antd';
import log from '../../images/4841115.jpg';
import logo from '../../images/1ec5967d-b9f1-46bc-b0df-af793c5d868d-1532534529493-school-pic.png'
import  { LeftCircleOutlined } from '@ant-design/icons';
const ForgetPass = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageotp, setMessageotp] = useState('');
  const [otp, setOtp] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [sendButtonStatus, setSendButtonStatus] = useState('idle'); // 'idle', 'loading', 'Resend OTP'
  const navigate= useNavigate();
  const sendEmail = async () => {
    setOtpVerified(false);
    setOtp(0);
    setEnteredOtp('');
    setConfirmPassword('');
    setNewPassword('');
    setSendButtonStatus('loading'); // Show loading message on the button
    axios
      .post('http://localhost:8000/ForgetStudentOTP.php', {
        to: email,
        subject: 'Forget password',
      })
      .then((response) => {
        setMessage(response.data.message);
        console.log(response.data.message);
        setOtp(response.data.otp);
        setMessageotp('');
        setSendButtonStatus('sent'); // Change button text to 'Sent' after successful response
      })
      .catch((error) => {
        console.log(error);
        setSendButtonStatus('idle'); // Reset button text to 'Send OTP' on error
      });
  };

  const handleEmailInputChange = (e) => {
    if (!otpVerified) {
      const enteredEmail = e.target.value;

      // Placeholder for email validation logic
      if (!isValidEmail(enteredEmail)) {
        setMessageotp('Wrong Email is violated');
      } else {
        setMessageotp('');
      }

      // Reset OTP and OTP verification status when email changes
      setOtp(0);
      setOtpVerified(false);
      setEmail(enteredEmail);
      setSendButtonStatus('idle'); // Reset button text to 'Send OTP' when email changes
    }
  };

  const isValidEmail = (email) => {
    // Implement your email validation logic here
    // You can use a regular expression or any other method
    // Return true if email is valid, false otherwise
    return true; // Placeholder, replace with your logic
  };

  const handleOtpInputChange = (e) => {
    setEnteredOtp(e.target.value);
  };

  const verifyOtp = () => {
    if (enteredOtp === otp.toString()) {
      setOtpVerified(true);
      setMessageotp('');
    } else {
      setMessageotp('OTP is not Valid');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(newPassword.length==="")
    {
        alert('Enter newPassword')
        return false;
    }
     else if(confirmPassword.length==="")
    {
        alert('Enter confirmPassword')
        return false;
    }
    else if(confirmPassword.length!==newPassword.length||newPassword!==confirmPassword)
    {
        alert('Password mismatch')
        return false;
    }
    else{
    axios.post('http://localhost:8000/ForgetStudentPass.php', { email: email, password: newPassword })
      .then(response => {
        // Assuming the server returns a success message or user object upon successful login
        if (response.data.success) {
            // return navigate('/Complaints');
            
            console.log(response.data);
            
            alert('Password is Updated');
            navigate('/student/login');
        } else {
          window.confirm('Invalid username or password. Do you want to try again?');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
      
    }
  };
  const back=()=>{
    navigate(-1);
  }
  return (
    
    <Card  hoverable className='m-lg-5 vh-100'>
    <Row gutter={20} justify="center" className='w-100 ' align="middle">  
                
      <Col xs={24} lg={11}><Image src={log} preview={false}/>
      <LeftCircleOutlined  style={{position:'inherit',fontSize:'30px'}} onClick={back}/></Col>
      <Col xs={24} lg={11}>
      <Col xs={24} className='text-center'>
      
        <Image src={logo} preview={false} height={50} width={50}/>
        
      <Typography.Title level={2}>Student Forget Password</Typography.Title>
      </Col>
        <Row align={'middle'} justify={'end'} gutter={5} className='form-group was-validated'>
                      <Col xs={17} sm={17}>
                        <label htmlFor='email' className='form-label'>Email Address</label>
                        <Input type='email' placeholder='Email' className='form-control' name='email' id='email' value={email}  onChange={handleEmailInputChange}  disabled={otpVerified} required/>
                        <div className='invalid-feedback'>
                            Please enter the email
                        </div>
                        </Col>
                        <Col xs={7} sm={7}>
                        <Button type='primary' size='large' onClick={sendEmail} disabled={sendButtonStatus === 'loading'}>
                        {sendButtonStatus === 'loading' ? 'Loading...' : sendButtonStatus === 'sent' ? 'Resend OTP' : 'Send OTP'}
                        </Button>
                        </Col>
                    </Row>

      
      {message &&<p className='text-danger'>{message}</p>}
      {messageotp && <p className='text-danger'>{messageotp}</p>}
      {!otpVerified && otp !== 0 && !isNaN(otp) && (
        <div className='form-group was-validated mb-2'>
          
          <label htmlFor='OTP' className='form-label'>Enter OTP</label>
          <Input className='form-control' name='password' id='password' type="text" value={enteredOtp} onChange={handleOtpInputChange} required/>
          <div className='invalid-feedback'>Please enter the OTP</div>
          <Button type="primary" className='mt-2' onClick={verifyOtp}>Verify OTP</Button>
        </div>
      )}
      {otpVerified && (
        <div>
          <Row gutter={30} align={'middle'} justify={'center'}>
          <Col xs={12} sm={12} className='form-group was-validated mb-2'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <Input className='form-control' name='password' id='password' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required/>
                        <div className='invalid-feedback'>
                            Please enter the Password
                        </div>
          </Col>
          <Col xs={12} sm={12} className='form-group was-validated mb-2'>
                        <label htmlFor='confirm password' className='form-label'>Confirm Password</label>
                        <Input className='form-control'type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                        <div className='invalid-feedback'>
                            Reenter Password
                        </div>
                    </Col>

          
          <Button type="primary" onClick={handleSubmit} className=' mt-2'>Reset</Button>
          </Row>
        </div>
        
      )}
      </Col>
    
    </Row>
    </Card>
  );
};

export default ForgetPass;