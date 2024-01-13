import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Breadcrumb, Radio, TreeSelect, message,Typography, Row, Col, Divider } from 'antd';
import { Button,} from 'antd';
import { useNavigate } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import Link from 'antd/es/typography/Link';
import jsonData from './JSON files/Academic.json';
import { geteduEmailFromSession } from '../../Emailretrieval';
const Academic = () => {
  const [rollno, setRoll] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [department, setDepartment] = useState('');
  const [Class, setClass] = useState('');
  const [Batch, setBatch] = useState(0);
  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  

  const[Belonging,setBelonging] = useState('Advisor1');

  const [Exceptional,setExceptional]=useState(false);
  const [Loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const TreeData = jsonData;
          
  useEffect(() => {
    // Define the Axios POST request to fetch admin data
    axios
      .post('http://localhost:8000/Student/Complaints/FetchInfo.php', `email=${encodeURIComponent(geteduEmailFromSession())}`)
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
  }, []);
  const handleLogin = () => {
    if ( description === '') {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    axios
      .post('http://localhost:8000/Student/Complaints/Type/Academic.php', {
        name: name,
        rollno: rollno,
        email: geteduEmailFromSession(),
        description: description,
        department: department,
        Class: Class,
        Batch: Batch,
        Belonging:Belonging,
      })
      .then((response) => {
        if (response.data.success) {
          messageApi.success('Complaint submitted successfully');
          setTimeout(() => {
            navigate('/student/Activity');
          }, 1000);
        } else {
          messageApi.warning('Please select the complaint');
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
            <Link style={{ textDecoration: 'none' }} href="/student/Complaints">
              Complaints
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Academic</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
    
    <Divider/>
    <Row gutter={[8,48]}>
  <Col span={responsiveSpan}>
    <Typography>Options:</Typography>
  </Col>
  <Col align='center' span={responsiveSpan}>
    <Radio.Group onChange={(e) => {setExceptional(e.target.value);setBelonging('Advisor1')}} value={Exceptional}>
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
        onChange={(value,label ) => {
          const selectedChild = TreeData.flatMap(parent => parent.children).find(child => child.value === value);

          if (selectedChild) {
            console.log(`Selected child value: ${value}`);
            console.log(`Selected child label: ${label}`);
            console.log(`Parent data: `, selectedChild.belongs);
          }
          setBelonging(selectedChild.belongs);
          setDescription(value);
}}
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
