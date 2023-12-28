import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {Breadcrumb, Radio, TreeSelect, message,Typography, Row, Col, Divider } from 'antd';
import { Button,} from 'antd';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import Link from 'antd/es/typography/Link';
const Academic = () => {
  const [rollno, setRoll] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [department, setDepartment] = useState('');
  const [Class, setClass] = useState('');
  const [Batch, setBatch] = useState(0);
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const Email = sessionStorage.getItem('StudentEmail');
  const secretKey = 'student-_?info';
  
  const [Exceptional,setExceptional]=useState(false);
  const bytes = CryptoJS.AES.decrypt(Email, secretKey);
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const [Loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const TreeData = [
      {
        title: 'Placement related issues',
        disabled:true,
        children: [
          {
            title: 'It\'s good to us if more hours for practicing coding is provided',
            value: 'It\'s good to us if more hours for practicing coding is provided',
          },
         {
            title:'Special concern for project is required',
            value:'Special concern for project is required',
         },
          {
            title:'Company specific questions are not posted regularly',
            value:'Company specific questions are not posted regularly',
         },
         {
            title: 'Students attending super PACC should be given special permission for rescheduling SPD related activities',
            value: 'Students attending super PACC should be given special permission for rescheduling SPD related activities',
          },
        ],
      },
      {
        title: 'Credit course / Honours related',
        disabled:true,
        children: [
          {
            title: 'Can reduce the time for credit class to 35 hours',
            value: 'Can reduce the time for credit class to 35 hours',
          },
          {
            title: 'It\'s convenient for us if the credit classes are scheduled on regular days like other Departments',
            value: 'It\'s convenient for us if the credit classes are scheduled on regular days like other Departments',
          },
           {
            title: 'Students attending honours should be given special permission for rescheduling SPD related activities ',
            value: 'Students attending honours should be given special permission for rescheduling SPD related activities ',
          },
        ],
      },
    {
        title: 'Examination-related Issues',
        disabled: true,
        children: [
          {
            title: 'Can change the CN tutorial on individual day rather than writing with other subjects',
            value: 'Can change the CN tutorial on individual day rather than writing with other subjects',
          },
          {
            title: 'It\'s useful to us if the answer key for tutorial is posted before examination',
            value: 'It\'s useful to us if the answer key for tutorial is posted before examination',
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
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };
  
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  }, [email]);
  const handleLogin = () => {
    if ( description === '') {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    axios
      .post('http://localhost:8000/Type/Academic.php', {
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
  const isSmallScreen = windowWidth < 991;
  const responsiveSpan = isSmallScreen ? 24 : 12;
  return (
    <>
    {contextHolder}
    <Row>
      <Col span={24}>
        <Breadcrumb>
          <Breadcrumb.Item>Student</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link style={{ textDecoration: 'none' }} href="/student/Complaint">
              Complaint
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Academic</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
        <Col>
          <Typography className='fs-2 fw-bolder fst-italic'>Academic Entry:</Typography>
          <Typography className='fst-italic no-wrap'>
            Enter your complaints based on Academics
          </Typography>
        </Col>
    </Row>
    
    <Divider/>
    <Row gutter={[8,48]}>
  <Col span={responsiveSpan}>
    <Typography>Options:</Typography>
  </Col>
  <Col align='center' span={responsiveSpan}>
    <Radio.Group onChange={(e) => setExceptional(e.target.value)} value={Exceptional}>
      <Radio value={false}>Pre-defined</Radio>
      <Radio value={true}>Own</Radio>
    </Radio.Group>
  </Col>
  {/* Repeat similar structure for other columns */}
  <Col span={responsiveSpan}>
    <Typography>Your Complaint</Typography>
  </Col>
  <Col align='center' span={responsiveSpan}>
    {Exceptional === false ? (
      <TreeSelect 
        showSearch
        style={{ width: '80%' }}
        value={description}
        onChange={(value) => setDescription(value)}
        treeData={TreeData}
        allowClear
        treeDefaultExpandAll // Set this to true
      />
    ) : (
      <>
        <TextArea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          style={{ width: '80%' }}
        />
      </>
    )}
  </Col>
  <Col span={24} className='text-center'>
    <Button size='large' type='primary' onClick={handleLogin} loading={Loading}>
      Submit
    </Button>
  </Col>
</Row>

  </>
  );
};

export default Academic;
