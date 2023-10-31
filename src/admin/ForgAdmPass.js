import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
const ForgAdmPass = () => {
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
      .post('http://192.168.157.250:8000/SCP/sendEmail.php', {
        to: email,
        subject: 'Email Verification',
      })
      .then((response) => {
        setMessage(response.data.message);
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

  const handleSubmit = () => {
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
    axios.post('http://192.168.157.250:8000/SCP/ForgetAdminPass.php', { email: email, password: newPassword })
      .then(response => {
        // Assuming the server returns a success message or user object upon successful login
        if (response.data.success) {
            // return navigate('/Complaints');
            
            console.log(response.data);
            
            alert('Password is Updated');
            navigate('/admin/login');
        } else {
          window.confirm('Invalid username or password. Do you want to try again?');
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
      });
      
    }
  };

  return (
    <div className='wrapper bg-secondary d-flex align-items-center justify-content-center w-100' >
                <div className='login'>
      <h2>Admin Forget Password</h2>
      <form className='needs-validation'>
        <div className='form-group was-validated mb-2'>     
                        <label htmlFor='email' className='form-label'>Email Address</label>
                        <input type='email' placeholder='Email' className='form-control' name='email' id='email' value={email}  onChange={handleEmailInputChange}  disabled={otpVerified} required></input>
                        <div className='invalid-feedback'>
                            Please enter the email
                        </div>
                        <button type="button" className='btn btn-success w-50 mt-2' onClick={sendEmail} disabled={sendButtonStatus === 'loading'}>
                        {sendButtonStatus === 'loading' ? 'Loading...' : sendButtonStatus === 'sent' ? 'Resend OTP' : 'Send OTP'}
                        </button>
                    </div>

      </form>
      {message &&<p className='text-danger'>{message}</p>}
      
      {!otpVerified && otp !== 0 && !isNaN(otp) && (
        <div className='form-group was-validated mb-2'>
          
          <label htmlFor='OTP' className='form-label'>Enter OTP</label>
          <input className='form-control' name='password' id='password' type="text" value={enteredOtp} onChange={handleOtpInputChange} required></input>
          <div className='invalid-feedback'>Please enter the OTP</div>
          <button type="button" className='btn btn-success mt-2' onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
      {messageotp && <p className='text-danger'>{messageotp}</p>}
      {otpVerified && (
        <div>
          <div className='form-group was-validated mb-2'>
                        <label htmlFor='password' className='form-label'>Password</label>
                        <input className='form-control' name='password' id='password' type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required></input>
                        <div className='invalid-feedback'>
                            Please enter the Password
                        </div>
          </div>
          <div className='form-group was-validated mb-2'>
                        <label htmlFor='confirm password' className='form-label'>Confirm Password</label>
                        <input className='form-control'type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required></input>
                        <div className='invalid-feedback'>
                            Reenter Password
                        </div>
                    </div>
                    <div className='form-group form-check mb-2'>
                       <input type='checkbox' className='form-check-input'></input>
                        <label htmlFor='check' className='form-check-label'>Remember me</label>
                    </div>

          <button type="button" className='btn btn-success w-100 mt-2' onClick={handleSubmit}>
            Reset Password
          </button>
        </div>
      )}
    </div>
    </div>
  );
};

export default ForgAdmPass;