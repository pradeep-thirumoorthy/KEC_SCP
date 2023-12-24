import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {Breadcrumb, Radio, TreeSelect, Typography, message } from 'antd';
import { Input, Button,} from 'antd'; // Import InputNumber instead of TextArea
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import Link from 'antd/es/typography/Link';
const Faculty = () => {
  const [rollno, setRoll] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [department, setDepartment] = useState('');
  const [Class, setClass] = useState('');
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
      title: 'Medical relared issues',
      disabled:true,
      children: [
        {
          title: 'There are no tablets available in first aid kit for emergency purpose',
          value: 'There are no tablets available in first aid kit for emergency purpose',
        },
       {
          title:'It"s better to us if girls in hostel are allowed to stay there if there is any unavoidable situation although without prior permission',
          value:'It"s better to us if girls in hostel are allowed to stay there if there is any unavoidable situation although without prior permission',
       },
      ],
    },
    {
      title: 'Class related issues',
      disabled:true,
      children: [
        {
          title: 'Classes are not sweeped regularly',
          value: 'Classes are not sweeped regularly',
        },
        {
          title: 'Project is not working properly',
          value: 'Projector is not working properly ',
        },
         {
          title: 'SPD , PST II ,VST all comprises of same tasks like self introduction , group discussion ',
          value: 'SPD , PST II ,CST all comprises of same tasks like self introduction , group discussion ',
        },
  ],
},
];
          
  useEffect(() => {
    // Define the Axios POST request to fetch admin data
    axios
      .post('http://localhost:8000/studentInfo.php', `email=${encodeURIComponent(email)}`)
      .then((response) => {
        const data = response.data.student_info;
        console.log(data);
        if (data) {
          setName(data.Name);
          setRoll(data.Roll_No);
          setDepartment(data.Department);
          setClass(data.Class);
          setBatch(data.Batch);
        }
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
  }, [email]);
  const handleLogin = () => {
    if ( description === ''|| description === '?') {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    axios
      .post('http://localhost:8000/Type/Others.php', {
        name: name,
        rollno: rollno,
        email: email,
        description: description,
        department: department,
        Class: Class,
        Batch: Batch,
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
        title:'Faculty',
      },
    ]}
  />
        <div className='row border-bottom pb-3'>
          <div className='col-md-9 col-lg-10'>
            <Typography className='fs-2 fw-bolder fst-italic'>Others Entry:</Typography>
            <br></br>
            <Typography className=' fst-italic no-warp'>Enter your complaints based on Acadamics</Typography>
          </div>
        </div>
      </div>
      <div className='row form-group'>
        {
        /* <div className='col-lg-6 col-sm-12 '>
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
        </div> */
        }
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry'>Your Option</label>
        </div>
        <div className='col-lg-6 col-sm-12 mx-5 my-3'>
          <label className='entry'>
          <Radio.Group onChange={(e)=>{setExceptional(e.target.value)}} value={Exceptional}>
      <Radio value={false}>Pre-defined</Radio>
      <Radio value={true}>Own</Radio>
    </Radio.Group>
          </label>
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

export default Faculty;
