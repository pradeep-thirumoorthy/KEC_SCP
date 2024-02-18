import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Breadcrumb, Col, Radio, Row, TreeSelect, message } from 'antd';
import CoursesData from './JSON files/Courses.json'
import { Select, Button, } from 'antd'; // Import InputNumber instead of TextArea
import {useNavigate } from 'react-router-dom';

import Link from 'antd/es/typography/Link';
import TextArea from 'antd/es/input/TextArea';
import { geteduEmailFromSession } from '../../Emailretrieval';

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
  const [Loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [Exceptional,setExceptional]=useState(false);
  
  const TreeData = CoursesData;
          
          
  useEffect(() => {
    const params = {
      email: geteduEmailFromSession(),
      Type: 'Courses',
    };
  
    axios
      .get('http://localhost:8000/Student/Complaints/FetchInfo2.php', { params })
      .then((response) => {
        const data = response.data.student_info;
        const data2 = response.data.subject_info;
        const data3 = response.data.electives;
  
        if (data) {
          setName(data.Name);
          setRoll(data.Roll_No);
          setDepartment(data.Department);
          setClass(data.Class);
          setBatch(data.Batch);
  
          // Merge data2 and data3 based on a common identifier (e.g., course code or name)
          const mergedSubjectInfo = [...data2, ...data3].reduce((acc, subject) => {
            const existingSubject = acc.find((s) => s.name === subject.name);
            if (existingSubject) {
              existingSubject.email = subject.email;
            } else {
              acc.push({ name: subject.name, email: subject.email });
            }
            return acc;
          }, []);
  
          //console.log("Merged Data: ", mergedSubjectInfo);
          setSubjectInfo(mergedSubjectInfo);
        }
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
  }, []);
  
  const handleLogin = () => {
    if (description === ''|| !Object.keys(subject).length) {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    //console.log(subject);
    axios
      .post('http://localhost:8000/Student/Complaints/Type/Courses.php', {
        name: name,
        rollno: rollno,
        email: geteduEmailFromSession(),
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
          //console.log(response.data);
        }
      })
      .catch((error) => {
        console.error('Error during complaint submission:', error);
      });
  };
  return (
    <>
    {contextHolder}
      <div className='row form-group'>
        {}
        
        <Row>
      <Col span={24}>
        <Breadcrumb>
          <Breadcrumb.Item>Student</Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link style={{ textDecoration: 'none' }} href="/student/Complaints">
              Complaints
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Courses</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
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
                value={subject.name}
                onChange={(value) =>
                  setSubject({
                    ...subject,
                    email: SubjectInfo.find((info) => info.name === value)?.email,
                    name: value || '',
                  })
                }
                allowClear
              >
                
                {SubjectInfo.map((subjectInfo, index) => (
                  <Option key={index} value={subjectInfo.name}>
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
