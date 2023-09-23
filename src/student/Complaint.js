import React, { useState ,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { FiPlusSquare } from 'react-icons/fi';

const Complaint = () => {
  const [rollno, setRoll] = useState('');
  const [name, setName] = useState('');
  const [contactno, setContact] = useState('');
  const [complainttype, setComplainttype] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [Class, setClass] = useState('');
  const [Subject,setSubject]=useState('');
  const Email = Cookies.get("StudentEmail");
  const secretKey = "student-_?info";
  const bytes = CryptoJS.AES.decrypt(Email, secretKey);
  const email = bytes.toString(CryptoJS.enc.Utf8);
  useEffect(() => {
    // Define the Axios POST request to fetch admin data
    axios
      .post('http://localhost:8000/SCP/studentDash.php', `email=${encodeURIComponent(email)}`)
      .then((response) => {
        const data = response.data;
        if (data) {
          console.log(data);
          setName(data.Name);
          setRoll(data.Roll_No);
          setDepartment(data.Department);
          setClass(data.Class);
        }
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
  }, [email])
  const handleLogin = () => {
    if (contactno === '' || complainttype === '' || description === '') {
      alert('Please fill in all required fields');
      return;
    }
    const number = parseInt(contactno);
    axios
      .post('http://localhost:8000/SCP/register.php', {
        name: name,
        rollno: rollno,
        email: email,
        contactno: number,
        complainttype: complainttype,
        description: description,
        department: department,
        Class:Class,
      })
      .then((response) => {
        if (response.data.success) {
          alert('Complaint submitted successfully');
          window.location.reload();
        } else {
          alert('Server error');
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error('Error during complaint submission:', error);
      });
  };

  return (
    <>
      <div className='row'>
        <div className='sidebar1 col-2'>
          <Sidebar1 />
        </div>
        <div className='col-10 float-end'>
          <div className=' bg-light row '>
            <div className='row border-bottom pb-3'>
              <div className='col-md-9 col-lg-10'>
                <span className='fs-2 fw-bolder fst-italic'> Complaints</span>
                <br></br>
                <span className='text-black-50 fst-italic no-warp'>Here are your complaints</span>
              </div>
              <div className='col-md-3 col-lg-2 align-items-center d-flex '>
                <a href='/student/Complaint/ComplaintEntry' className='fs-5 text-nowrap btn text-black'>
                  <FiPlusSquare /> Issue Complaint
                </a>
              </div>
            </div>
          </div>
          <div className='row form-group'>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry'>Your Roll No</label>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <input
                className='data mx-5 my-3 w-50 rounded-2 p-1'
                placeholder='Roll No'
                name='rollno'
                id='rollno'
                value={rollno}
                disabled
              ></input>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry mx-9'>Your Name</label>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <input
                className='data mx-5 my-3 w-50 rounded-2 p-1'
                placeholder='Name'
                name='name'
                id='name'
                value={name}
                disabled
              ></input>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry mx-9'>Your Email</label>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <input
                className='data mx-5 my-3 w-50 rounded-2 p-1'
                placeholder='Email'
                name='email'
                id='email'
                value={email}
                disabled
              ></input>
            </div>
            <div className='col-lg-6 col-sm-12 '>
          <label className='entry mx-9'>Your Department</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <input
            className='data mx-5 my-3 w-50 rounded-2 p-1'
            placeholder='Department'
            name='department'
            id='department'
            value={department}
            disabled
          ></input>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry mx-9'>Your Class</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <input
            className='data mx-5 my-3 w-50 rounded-2 p-1'
            placeholder='Department'
            name='department'
            id='department'
            value={Class}
            disabled
          ></input>
        </div>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry mx-9'>Your Contact Number</label>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <input
                className='data mx-5 my-3 w-50 rounded-2 p-1'
                placeholder='Contact Number'
                name='contactno'
                id='contactno'
                value={contactno}
                onChange={(e) => setContact(e.target.value)}
              ></input>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry mx-9'>Your Subject</label>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <input
                className='data mx-5 my-3 w-50 rounded-2 p-1'
                placeholder='Enter Subject'
                value={Subject}
                onChange={(e) => setSubject(e.target.value)}
              ></input>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry mx-9'>Type</label>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <select
                className='data mx-5 my-3 w-50 p-1 rounded-2'
                name='complainttype'
                id='complainttype'
                value={complainttype}
                onChange={(e) => setComplainttype(e.target.value)}
              >
                <option value=''>Select a Category</option>
                <option value='Academic'>Academic</option>
                <option value='Classroom Maintenance'>Classroom Maintenance</option>
                <option value='Lab'>Lab</option>
                <option value='Others'>Others</option>
              </select>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry'>Your Complaint</label>
            </div>
            <div className='col-lg-6 col-sm-12'>
              <textarea
                className='data mx-5 my-3 w-50'
                placeholder='Description'
                rows={5}
                cols={20}
                name='description'
                id='description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className='w-100 text-center p-5'>
              <button type='submit' onClick={handleLogin} className='btn btn-success w-25 mt-2'>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complaint;
