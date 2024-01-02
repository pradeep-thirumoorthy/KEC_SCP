import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {Breadcrumb, Radio, TreeSelect, message,Typography } from 'antd';
import { Input, Select, Button, } from 'antd'; // Import InputNumber instead of TextArea
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import Link from 'antd/es/typography/Link';

const { Option } = Select;


const Faculty = () => {
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
  const [Exceptional,setExceptional] = useState(false);
  const navigate = useNavigate();
  const [Type,setType]=useState('Public');
  
  const TreeData = [
    {
      title: 'Difficulties in learning',
      disabled:true,
      children: [
        {
          title: 'Can send materials / refrences on ongoing topics',
          value: 'Can send materials / refrences on ongoing topics',
        },
       
        {
          title: 'Can teach slower as we can\'t catch with their speed of teaching',
          value: 'Can teach slower as we can\'t catch with their speed of teaching',
        },
       {
          title:'If teaching is done on board,It\'s more convinent to us',
          value:'If teaching is done on board,It\'s more convinent to us',
       },
        {
          title:'Can revise previous class topics for atleast 5 mins',
          value:'Can revise previous class topics for atleast 5 mins',
       },
      ],
    },
    {
      title: 'Issues on tutorial',
      disabled:true,
      children: [
        {
          title: 'Can post tutorial questions as soon as possible rather than delaying',
          value: 'Can post tutorial questions as soon as possible rather than delaying',
        },
        {
          title: 'Make students to view their tutorial marks in a regular interval of time',
          value: 'Make students to view their tutorial marks in a regular interval of time',
        },
         {
          title: 'It\'s good if the number of questions for tutorial is reduced',
          value: 'It\'s good if the number of questions for tutorial is reduced',
        },
      ],
    },
  {
      title: 'Examination-related Issues',
      disabled: true,
      children: [
        {
          title: 'Provide study guides or sample questions for exams',
          value: 'Provide study guides or sample questions for exams',
        },
        {
          title: 'It\'s easy for us to revise all topics before the date of examination',
          value: 'It\'s easy for us to revise all topics before the date of examination',
        },
      ],
    },
  ];
          
          
  useEffect(() => {
    // Define the Axios POST request to fetch admin data
    
    axios
      .post('http://192.168.77.250:8000/studentInfo.php', `email=${encodeURIComponent(email)}`)
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
    if (description === '' ||!Object.keys(subject).length) {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    axios
      .post('http://192.168.77.250:8000/Type/Faculty.php', {
        name: name,
        rollno: rollno,
        email: email,
        description: description,
        department: department,
        Class: Class,
        Subject: subject.email,
        Batch: Batch,
        Subjectname: subject.name,
        Type:Type,
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
      <div className=' row '>
      <Breadcrumb
    items={[
      {
        title: 'Student',
      },
      {
        title: <Link  style={{textDecoration:'none'}} href="/student/Complaint">Complaint</Link>,
      },
      {
        title:'Lab',
      },
    ]}
  />
        <div className='row border-bottom pb-3'>
          <div className='col-md-9 col-lg-10'>
            <Typography className='fs-2 fw-bolder fst-italic'>Faculty Entry:</Typography>
            <br></br>
            <Typography className=' fst-italic no-warp'>Enter your complaints based on Faculties</Typography>
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
              <label className='entry mx-9 px-5'>Subject</label>
            </div>
            <div className='col-lg-6 col-sm-12 '>
              <Select
                className='data mx-5 my-3 rounded-2'
                name='subject'
                id='subject'
                
        placeholder={"Select the subject"}
  style={{ width: '80%' }}
                value={subject.email}
                onChange={(value) =>
                  {setSubject({
                    ...subject,
                    email: value,
                    name: SubjectInfo.find((info) => info.email === value)?.name || '',
                  });
                  console.log(subject);}
                  
                }
              >
                <Option value=''>Select a Subject</Option>
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
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry px-5'>Your Option</label>
        </div>
        <div className='col-lg-6 col-sm-12'>
          <Radio.Group className='mx-5 my-3' onChange={(e)=>{setType(e.target.value)}} value={Type}>
      <Radio value={'Public'}>Public</Radio>
      <Radio value={'Anonymous'}>Anonymous</Radio>
    </Radio.Group>
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

export default Faculty;
