import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import log from '../../images/1ec5967d-b9f1-46bc-b0df-af793c5d868d-1532534529493-school-pic.png';
import { Descriptions, Image, Typography } from 'antd';
import axios from 'axios';
import DashChart from './DashChart';
import { geteduEmailFromSession } from '../Emailretrieval';


const StudentDash = () => {

  // console.log(totalSent);
  // console.log(totalResolved);
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState([]);


  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = () => {

   axios.get('http://localhost:8000/Student/Dashboard/Dashboard.php', {
      params: {
        email: geteduEmailFromSession()
      }
    })
      .then(response => {
        const data = response.data;
        setStudentData(data[0]);
        console.log(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student data:', error);
      });
  };


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Display content after 1 second

    return () => {
      clearTimeout(timer);
    };
  }, []);


  const linec = {
    overflowX: 'scroll',
    backgroundColor:'grey',
    marginTop: '10px',
    fontFamily: 'poppins',
    borderRadius: '20px',
    color: 'black',
  };


  const getCurrentDateTime = () => {
    const currentDate = new Date();
    const date = currentDate.toDateString();
    const time = currentDate.toLocaleTimeString();
    return `${date} ${time}`;
  };
  return (
    <>
      {isLoading ? (
        <h3 style={{ fontFamily: "monospace" }}>Loading...</h3>
      ) : (
        <>
          <div className="col-lg-12 d-flex flex-column-reverse flex-lg-row justify-content-between" style={linec}>
            <div className='content'>
              <p style={{ marginLeft: '10px' }}>{getCurrentDateTime()}</p>
              <Typography.Title> Welcome back,{studentData.Name}</Typography.Title>
              <Typography> Welcome to the Student Complaint Portal (SCP). Register and manage complaints efficiently.</Typography>
            </div>
            <div className='image'>
              <Image src={log}></Image>
            </div>

          </div>
          <div className='d-flex flex-column'>

            <>
              <div className="row">
                <div className="col-lg-6">
                  <Descriptions title="Student Information"  column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }} bordered>
      <Descriptions.Item label="Name">{studentData.Name}</Descriptions.Item>
      <Descriptions.Item label="RollNo">{studentData.Roll_No}</Descriptions.Item>
      <Descriptions.Item label="Department">{studentData.Department}</Descriptions.Item>
      <Descriptions.Item label="Section">{studentData.Class}</Descriptions.Item>
      <Descriptions.Item label="Batch">{studentData.Batch}</Descriptions.Item>
      <Descriptions.Item label="Gender">{studentData.Gender}</Descriptions.Item>
    </Descriptions>
    
                </div>
                <div className="col-lg-6">
                    <DashChart />
                </div>
              </div>
            </>

          </div>
        </>
      )}
    </>
  );
};

export default StudentDash;