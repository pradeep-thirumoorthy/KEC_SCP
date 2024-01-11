import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Breadcrumb, Radio, Select, TreeSelect, message } from 'antd';
import { Button,} from 'antd';
import { useNavigate } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
import Link from 'antd/es/typography/Link';
import { geteduEmailFromSession } from '../../Emailretrieval';
const Faculty = () => {
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
  const TreeData = [
    {
      title: 'Challenges in understanding subject materials.',
      disabled:true,
      children: [
        {
          title: 'Time is not enough for lab hours.',
          value: 'Difficulties in grasping complex concepts.',
        },
        {
          title: 'There are so many lab experiments.',
          value: 'Confusion due to unclear subject explanations.',
        },
        {
          title: 'Computers in lab is not working.',
          value: 'Struggles with comprehending advanced topics.',
        },
        {
          title: 'Can award more marks to lab experiments.',
          value: 'Difficulty in relating subject content to real-life scenarios.',
        },
        {
          title: 'Problems in applying theoretical knowledge practically.',
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
          
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('./blocks.json');
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    // Define the Axios POST request to fetch admin data
    axios
      .post('http://localhost:8000/studentInfo.php', `email=${encodeURIComponent(geteduEmailFromSession())}`)
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
  }, []);
  const handleLogin = () => {
    if ( description === '' || subject==='') {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    axios
      .post('http://localhost:8000/Type/Lab.php', {
        name: name,
        rollno: rollno,
        email: geteduEmailFromSession(),
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
        title:'Lab',
      },
    ]}
  />
      </div>
      <div className='row form-group'>
        {
        
        }
        <>
            <div className='col-lg-6 col-sm-12 '>
              <label className='entry mx-9 px-5'>Subject</label>
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
        {JSON.stringify(data)}
        <div>
      
    </div>
      </div>
    </>
  );
};

export default Faculty;
