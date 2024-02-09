import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {Breadcrumb, Col, Divider, Flex, Radio, Row, Select, TreeSelect, Typography, message } from 'antd';
import { Input, Button,} from 'antd';
import { useNavigate } from 'react-router-dom';
import { Option } from 'antd/es/mentions';
import TextArea from 'antd/es/input/TextArea';
import Link from 'antd/es/typography/Link';
import MaintenanceData from './JSON files/Maintenance.json';
import departmentData from './blocks.json';
import { geteduEmailFromSession } from '../../Emailretrieval';
const Maintenance = () => {
  const [rollno, setRoll] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState();
  const [department, setDepartment] = useState('');
  const [Class, setClass] = useState('');
  const [Batch, setBatch] = useState(0);


  
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [Loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
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
  const TreeData = MaintenanceData;
  const roomOptionsByFloor = {
    'Ground Floor': ['Room 1', 'Room 2', 'Room 3'],
    'First Floor': ['Room A', 'Room B', 'Room C'],
    'Second Floor': ['Room X', 'Room Y', 'Room Z'],
  };
  useEffect(() => {
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
          setGender(data.Gender);
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

  }, [Gender]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedClass, setSelectedClass] = useState('');


  const handleFloorChange = (value) => {
    setSelectedFloor(value);
    setSelectedClass('');
  };

  const handleClassChange = (value) => {
    setSelectedClass(value);
  };
  const handleLogin = () => {
    if ( description === '' ||description_1 ===''||selectedFloor === '') {
      alert('Please fill in all required fields');
      return;
    }
    setLoading(true);
    axios
      .post('http://localhost:8000/Student/Complaints/Type/Maintenance.php', {
        name: name,
        rollno: rollno,
        email: geteduEmailFromSession(),
        description: description,
        department: department,
        Class: Class,
        Batch: Batch,
        Extra :JSON.stringify({'category':category,'Floor':selectedFloor,'data':description_1})
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
            <Link style={{ textDecoration: 'none' }} href="/student/Complaints">
              Complaints
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Maintenance</Breadcrumb.Item>
        </Breadcrumb>
      </Col>
    </Row>
    <Divider/>

      <div className='row form-group'>
        <Col span={responsiveSpan}>
          <Typography className='entry mx-9 px-5'>Your Option</Typography>
        </Col>
        <Col align='center' span={responsiveSpan}>
        <Col className='mx-5 my-3'>
        <Radio.Group onChange={(e)=>{setcategory(e.target.value);setDescription();if(e.target.value==='Restroom'){setDescription_1(Gender)}else{setDescription_1()}}} value={category}>
      <Radio checked={true} value={"Classroom"}>Classroom</Radio>
      <Radio value={"Restroom"}>Restroom</Radio>
      <Radio value={"Other Area"}>Other Area</Radio>
      </Radio.Group>
        </Col>
        </Col>
        <Col  span={responsiveSpan}>
          <Typography className='entry px-5'>Category</Typography>
        </Col>
        <Col align='center' span={responsiveSpan}>
        <Col className='mx-5 my-3'  style={{width:'80%'}}>
        </Col>
        
          <Col className='mx-5 my-3' style={{ width: '80%' }}>
            <div className='my-2'>
              <Typography className='mx-3'>Department:</Typography>
              <Select
                style={{ width: '60%' }}
                value={department}
                disabled
              >
                {Object.keys(departmentData).map((department) => (
                  <Option key={department} value={department}>
                    {department}
                  </Option>
                ))}
              </Select>
            </div>
          </Col>

          {department && (
            <>
              <Col className='mx-5 my-3' style={{ width: '80%' }}>
                <div className='my-2'>
                  <Typography className='mx-3'>Floor:</Typography>
                  <Select
                    style={{ width: '60%' }}
                    onChange={handleFloorChange}
                    value={selectedFloor}
                  >
                    {Object.keys(departmentData[department]).map((floor) => (
                      <Option key={floor} value={floor}>
                        {floor}
                      </Option>
                    ))}
                  </Select>
                </div>
              </Col>
              {category === 'Classroom' && (
        <>
              {selectedFloor && (
                <Col className='mx-5 my-3' style={{ width: '80%' }}>
                  <div className='my-2'>
                    <Typography className='mx-3'>Class:</Typography>
                    <Select
                      style={{ width: '60%' }}
                      onChange={handleClassChange}
                      value={selectedClass}
                    >
                      {departmentData[department][selectedFloor].map((classRoom) => (
                        <Option key={classRoom} value={classRoom}>
                          {classRoom}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Col>
              )}
            </>
          )}
        </>
      )}
      {category==='Classroom'?<>
      
</>:
        (category==='Restroom')?<>
        <div>
        <Col className='mx-5 my-3'  style={{width:'80%'}}>
        <div className='my-2'>
    <Typography className='mx-2'>Gender:</Typography>
          <Input type='text' style={{ width: '60%' }} value={description_1} onBeforeInput={(e)=>{setDescription_1(Gender)}} disabled/>
          </div>
        </Col>
        </div></>
        :(category==='Other Area')?
        <>
        <Col className='mx-5 my-3'>
          
        <Typography className='mx-3'>Item:</Typography><Input value={description_1} onChange={(e)=>{setDescription_1(e.target.value)}}
          
        style={{ width: '80%' }} type='text'/>
        </Col>
        </>
        :<></>
        }
        </Col>
















        <Col  span={responsiveSpan}>
          <Typography className='entry px-5'>Your Option</Typography>
        </Col>
        <Col align='center' span={responsiveSpan}>
          <Radio.Group className='mx-5 my-3' onChange={(e)=>{setExceptional(e.target.value);setDescription()}} value={Exceptional}>
      <Radio value={false}>Pre-defined</Radio>
      <Radio value={true}>Own</Radio>
    </Radio.Group>
    </Col>
        <Col  span={responsiveSpan}>
          <Typography className='entry px-5'>Your Complaint</Typography>
        </Col>
        <Col align='center' span={responsiveSpan}>
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
  <Option value={'Light are not working'}>Light are not working</Option>
  <Option value={'Tap is leaking'}>Tap is leaking</Option>
</Select></>:<>
      <TextArea onChange={(e)=>{setDescription(e.target.value)}}  className='mx-5 my-3' style={{ width: '80%' }}/>
      </>}

        </Col>
        
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
