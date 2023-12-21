import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import {Breadcrumb, Flex, Radio, Select, TreeSelect, message } from 'antd';
import { Input, Button,} from 'antd'; // Import InputNumber instead of TextArea
import { useNavigate } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
const Maintenance = () => {
  const [rollno, setRoll] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [department, setDepartment] = useState('');
  const [Class, setClass] = useState('');
  const [Batch, setBatch] = useState(0);
  const Email = sessionStorage.getItem('StudentEmail');
  const secretKey = 'student-_?info';
  const bytes = CryptoJS.AES.decrypt(Email, secretKey);
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const [Loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [Floor,setFloor]=useState('');
  const navigate = useNavigate();
  const [description_1,setDescription_1]=useState('');
  const [category,setcategory]=useState("Classroom");
  const [Gender,setGender]=useState();
  const [Exceptional,setExceptional]=useState(false);
  const [count,setCount]=useState(1);
  const [Status,setStatus] = useState('Damaged');
  const [item2,setitem2] = useState('Fan');
  const generateDescription = () => {
    if(item2==='Projector'){
      setCount(1);
      setDescription('Projector is damaged or malfunctioning');
    }
    else{
    let countDescription = count > 1 ? 's are' : ' is';
    setDescription(`${count} ${item2}${countDescription} ${Status}`);
    }
  };
  const TreeData = [
    {
      title: 'Challenges in understanding subject materials.',
      disabled:true,
      children: [
        {
          title: 'Difficulties in grasping complex concepts.',
          value: 'Difficulties in grasping complex concepts.',
        },
        {
          title: 'Confusion due to unclear subject explanations.',
          value: 'Confusion due to unclear subject explanations.',
        },
        {
          title: 'Struggles with comprehending advanced topics.',
          value: 'Struggles with comprehending advanced topics.',
        },
        {
          title: 'Difficulty in relating subject content to real-life scenarios.',
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
  const roomOptionsByFloor = {
    'Ground Floor': ['Room 1', 'Room 2', 'Room 3'],
    'First Floor': ['Room A', 'Room B', 'Room C'],
    'Second Floor': ['Room X', 'Room Y', 'Room Z'],
  };    
  useEffect(() => {
    // Define the Axios POST request to fetch admin data
    axios
      .post('http://localhost:8000/studentInfo.php', `email=${encodeURIComponent(email)}`)
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
          setGender(data.Gender);
          // Extract and display subject information
          const subjects = [];

          // Loop through properties in data2
          for (let i = 1; i <= 6; i++) {
            const subjectKey = `Subject_${i}`;
            if (data2[subjectKey]) {
              const subjectData = JSON.parse(data2[subjectKey]);
              const subjectName = Object.keys(subjectData)[0]; // Extract subject name
              const subjectEmail = subjectData[subjectName]; // Extract subject email
              subjects.push({ name: subjectName, email: subjectEmail });
            }
          }
          console.log(subjects);
        }
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
  }, [email,Gender]);
  const handleLogin = () => {
    if ( description === '' ||description_1 ===''||Floor === '') {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    axios
      .post('http://localhost:8000/Type/Maintenance.php', {
        name: name,
        rollno: rollno,
        email: email,
        description: description,
        department: department,
        Class: Class,
        Batch: Batch,
        Extra :JSON.stringify({'category':category,'Floor':Floor,'data':description_1})
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
        title: <a style={{textDecoration:'none'}} href="/student/Complaint">Complaint</a>,
      },
      {
        title:'Maintenance',
      },
    ]}
  />
        <div className='row border-bottom pb-3'>
          <div className='col-md-9 col-lg-10'>
            <span className='fs-2 fw-bolder fst-italic'> Maintenance Entry</span>
            <br></br>
            <span className=' fst-italic no-warp'>Here are your complaints</span>
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
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry mx-9 px-5'>Your Option</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
        <div className='col-lg-6 col-sm-12 mx-5 my-3'>
        <Radio.Group onChange={(e)=>{setcategory(e.target.value);setDescription();if(e.target.value==='Restroom'){setDescription_1(Gender)}else{setDescription_1()}}} value={category}>
      <Radio checked={true} value={"Classroom"}>Classroom</Radio>
      <Radio value={"Restroom"}>Restroom</Radio>
      <Radio value={"Other Area"}>Other Area</Radio>
      </Radio.Group>
        </div>
        </div>
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry px-5'>Category</label>
        </div>
        <div className='col-lg-6 col-sm-12 '>
        <div className='col-lg-6 col-sm-12 mx-5 my-3'  style={{width:'80%'}}>
          <div className='my-2'>
          <span className='mx-3'>Floor:</span>
          <Select style={{ width: '60%' }} onChange={(e)=>{setFloor(e);setDescription_1();if(category==='Restroom'){setDescription_1(Gender)}}} value={Floor}>
            <Option value='Ground Floor'>Ground Floor</Option>
            <Option value='First Floor'>First Floor</Option>
            <Option value='Second Floor'>Second Floor</Option>
          </Select>
          
          </div>
        </div>
        
      {category==='Classroom'?<>
      
      <div className='col-lg-6 col-sm-12 mx-5 my-3' style={{ width: '80%' }}>
  <div className='my-2'>
    <span className='mx-3'>Class:</span>
    <Select
      style={{ width: '60%' }}
      onChange={(value) => setDescription_1(value)}
      value={description_1}
    >
      {roomOptionsByFloor[Floor] &&
        roomOptionsByFloor[Floor].map((room, index) => (
          <Option key={index} value={room}>
            {room}
          </Option>
        ))}
    </Select>
  </div>
</div></>:
        (category==='Restroom')?<>
        <div>
        <div className='col-lg-6 col-sm-12 mx-5 my-3'  style={{width:'80%'}}>
        <div className='my-2'>
    <span className='mx-2'>Gender:</span>
          <Input type='text' style={{ width: '60%' }} value={description_1} onBeforeInput={(e)=>{setDescription_1(Gender)}} disabled/>
          </div>
        </div>
        </div></>
        :(category==='Other Area')?
        <>
        <div className='col-lg-6 col-sm-12 mx-5 my-3'>
          
        <span className='mx-3'>Item:</span><Input value={description_1} onChange={(e)=>{setDescription_1(e.target.value)}}
          
        style={{ width: '80%' }} type='text'/>
        </div></>
        :<></>
        }
        </div>
















        <div className='col-lg-6 col-sm-12 '>
          <label className='entry px-5'>Your Option</label>
        </div>
        <div className='col-lg-6 col-sm-12'>
          <Radio.Group className='mx-5 my-3' onChange={(e)=>{setExceptional(e.target.value);setDescription()}} value={Exceptional}>
      <Radio value={false}>Pre-defined</Radio>
      <Radio value={true}>Own</Radio>
    </Radio.Group>
    </div>
        <div className='col-lg-6 col-sm-12 '>
          <label className='entry px-5'>Your Complaint</label>
        </div>
        <div className='col-lg-6 col-sm-12'>
        {Exceptional === false ?
        category ==='Other Area'?<TreeSelect
              showSearch
            className='mx-5 my-3'
        style={{ width: '80%' }}
        value={description}
        onChange={(value) => setDescription(value)}
        treeData={TreeData}
        allowClear
        treeDefaultExpandAll // Set this to true
      />:
      category ==='Classroom'?<>
      
      <Flex wrap="wrap" gap="small">
  <Input type='number' min={1} max={10} disabled={item2==='Projector'} style={{width:'50px'}} value={count} onChange={(e)=>{setCount(e.target.value)}} />
  <Select value={item2} onChange={(e)=>{setitem2(e);setStatus('Damaged');if(e==='Projector'){setCount(1)}}} placeholder="select the statement">
  <Option value={'Fan'}>Fan</Option>
  <Option value={'Light'}>Light</Option>
  <Option value={'Projector'}>Projector</Option>
  <Option value={'Plug Point'}>Plug Point</Option>
</Select>
  <Radio.Group optionType="button" onChange={(e)=>{setStatus(e.target.value)}} value={Status}>
    <Radio value="Damaged">Damaged</Radio>
    <Radio value="Insufficient" disabled={item2!=='Plug Point'}>Insufficient</Radio>
  </Radio.Group>
  
  <Button onClick={generateDescription}>Choose</Button>
  <Input value={description} disabled />
</Flex>

      </>:<>
      <Select value={description} style={{width:'100%'}} onChange={(e)=>{setDescription(e)}} placeholder="select the statement">
  <Option value={'Sanitation facility is not well'}>Sanitation facility is not well</Option>
  <Option value={'Light'}>Light</Option>
  <Option value={'Projector'}>Projector</Option>
  <Option value={'Plug Point'}>Plug Point</Option>
</Select></>:<>
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

export default Maintenance;
