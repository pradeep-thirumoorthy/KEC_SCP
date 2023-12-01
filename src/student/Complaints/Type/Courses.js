import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { FiPlusSquare } from 'react-icons/fi';
import {Radio, TreeSelect, message } from 'antd';
import { Input, Select, Button, } from 'antd'; // Import InputNumber instead of TextArea
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';

const { Option } = Select;


const Courses = () => {
  const [rollno, setRoll] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [department, setDepartment] = useState('');
  const [Class, setClass] = useState('');
  const [subject, setSubject] = useState({});
  const [SubjectInfo, setSubjectInfo] = useState([]);
  const [Batch, setBatch] = useState(0);
  const Email = sessionStorage.getItem('StudentEmail');
  const secretKey = 'student-_?info';
  const bytes = CryptoJS.AES.decrypt(Email, secretKey);
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const [Loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [Exceptional,setExceptional]=useState(false);
  
  const TreeData = [
    {
      title: 'Challenges in understanding subject materials.',
      disabled:true,
      children: [
        {
          title: 'Speed of teaching is more fast',
          value: 'Difficulties in grasping complex concepts.',
        },
        {
          title: 'Can reduce the number of tutorial questions',
          value: 'Confusion due to unclear subject explanations.',
        },
        {
          title: 'Can award more marks to tutorial questions',
          value: 'Struggles with comprehending advanced topics.',
        },
        {
          title: 'Can permit us to see tutorial marks within 2 weeks',
          value: 'Difficulty in relating subject content to real-life scenarios.',
        },
        {
          title: 'Can give notes as refrences ',
          value: 'Problems in applying theoretical knowledge practically.',
        },
      ],
    },
    {
      title: 'Issues related to subject materials and resources.',
      disabled:true,
      children: [
        {
          title: 'Lack of updated and relevant course textbooks.',value: 'Lack of updated and relevant course textbooks.',
        },
        {
          title: 'Challenges in accessing online subject materials.',
          value: 'Challenges in accessing online subject materials.',
        },
        {
          title: 'Insufficient reference materials for in-depth learning.',
          value: 'Insufficient reference materials for in-depth learning.',
        },
        {
          title: 'Difficulty in finding subject-related research articles.',
          value: 'Difficulty in finding subject-related research articles.',
        },
        {
          title: 'Limited availability of subject-specific software or tools.',
          value: 'Limited availability of subject-specific software or tools.',
        },
      ],
    },
    // Add more subject-related categories here...
  ];
          
          
  useEffect(() => {
    // Define the Axios POST request to fetch admin data
    axios
      .post('http://localhost:8000/SCP/studentInfo.php', `email=${encodeURIComponent(email)}`)
      .then((response) => {
        const data = response.data.student_info;
        const data2 = response.data.subject_info;
        console.log(data);
        if (data) {
          setName(data.Name);
          setRoll(data.Roll_No);
          setDepartment(data.Department);
          setClass(data.Class);
          setBatch(data.Batch);
          // Extract and display subject information
          const subjects = [];

          // Loop through properties in data2
          for (let i = 1; i <= 6; i++) {
            const subjectKey = `Subject_${i}`;
            if (data2[subjectKey]) {
              const subjectData = JSON.parse(data2[subjectKey]);
              console.log('Subject:', subjectData);
              const subjectName = Object.keys(subjectData)[0]; // Extract subject name
              const subjectEmail = subjectData[subjectName]; // Extract subject email
              subjects.push({ name: subjectName, email: subjectEmail });
            }
          }
          console.log(subjects);
          setSubjectInfo(subjects);
        }
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
  }, [email]);
  const handleLogin = () => {
    if (description === ''|| !Object.keys(subject).length) {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    axios
      .post('http://localhost:8000/SCP/Type/Courses.php', {
        name: name,
        rollno: rollno,
        email: email,
        complainttype: "Courses",
        description: description,
        department: department,
        Class: Class,
        Subject: subject.email,
        Batch: Batch,
        Subjectname: subject.name,
      })
      .then((response) => {
        if (response.data.success) {
          messageApi.open({
            type: 'success',
            content: 'Complaint submitted successfully',
          });
          navigate('/student/Activity');
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
    {contextHolder}
      <div className=' bg-light row '>
        <div className='row border-bottom pb-3'>
          <div className='col-md-9 col-lg-10'>
            <span className='fs-2 fw-bolder fst-italic'> Courses Entry</span>
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
        {/* <div className='col-lg-6 col-sm-12 '>
          <label className='entry'>Your Roll No</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <Input
            className='data mx-5 my-3  rounded-2 p-1'
            placeholder='Roll No'
            name='rollno'
            id='rollno'
            
  style={{ width: '80%' }}
            value={rollno}
            disabled
          ></Input>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry mx-9 px-5'>Your Name</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <Input
            className='data mx-5 my-3  rounded-2 p-1'
            placeholder='Name'
            name='name'
            id='name'
            
  style={{ width: '80%' }}
            value={name}
            disabled
          ></Input>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry mx-9 px-5'>Your Email</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <Input
            className='data mx-5 my-3  rounded-2 p-1'
            placeholder='Email'
            name='email'
            id='email'
            
  style={{ width: '80%' }}
            value={email}
            disabled
          ></Input>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry mx-9 px-5'>Your Department</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <Input
            className='data mx-5 my-3  rounded-2 p-1'
            placeholder='Department'
            name='department'
            id='department'
            
  style={{ width: '80%' }}
            value={department}
            disabled
          ></Input>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry mx-9 px-5'>Your Class</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <Input
            className='data mx-5 my-3  rounded-2 p-1'
            placeholder='Department'
            name='department'
            id='department'
            
  style={{ width: '80%' }}
            value={Class}
            disabled
          ></Input>
        </div> */}
        
        
          <>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry mx-9 px-5'>Courses</label>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <Select
                className='data mx-5 my-3'
                name='subject'
                id='subject'
                
              placeholder="Select the Subject"
  style={{ width: '80%' }}
                value={subject.email}
                onChange={(value) =>
                  setSubject({
                    ...subject,
                    email: value,
                    name: SubjectInfo.find((info) => info.email === value)?.name || '',
                  })
                }
                allowClear
              >
                
                {SubjectInfo.map((subjectInfo, index) => (
                  <Option key={index} value={subjectInfo.email}>
                    {subjectInfo.name}
                  </Option>
                ))}
              </Select>
            </div>
          </>
          <div className='col-lg-6 col-sm-12 '>
          <label className='entry px-5'>Your Option</label>
        </div>
        <div className='col-lg-6 col-sm-12'>
          <Radio.Group className='mx-5 my-3' onChange={(e)=>{setExceptional(e.target.value)}} value={Exceptional}>
      <Radio value={false}>Pre-defined</Radio>
      <Radio value={true}>Own</Radio>
    </Radio.Group>
    </div>
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry px-5'>Your Complaint</label>
        </div>
        <div className='col-lg-6 col-sm-12'>
        {Exceptional === false ?<TreeSelect
              showSearch
            className='mx-5 my-3'
        style={{ width: '80%' }}
        value={description}
        onChange={(value) => setDescription(value)}
        treeData={TreeData}
        allowClear
        treeDefaultExpandAll // Set this to true
      />:<>
      <TextArea onChange={(e)=>{setDescription(e.target.value)}}  className='mx-5 my-3' style={{ width: '80%' }}/>
      </>}


        </div>
        
        <div className='w-100 text-center p-5'>
          <Button type='primary' onClick={handleLogin} loading={Loading} className='w-25 mt-2'>
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Courses;
