import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card, Col, Flex,Typography } from 'antd';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
const ComplaintStatus = () => {
  const Email = sessionStorage.getItem('StudentEmail');
  const secretKey = 'student-_?info';
  const bytes = CryptoJS.AES.decrypt(Email, secretKey);
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const navigate=useNavigate();
  const [ComplaintData, setComplaintData] = useState([]);
  const gridStyle = {
    width: '100px',
    borderRadius: '10px',
    textAlign: 'center',
  };

  // Mapping of complaint type to description
  const complaintDescriptions = {
    Academic: <div>Academic complaints are for concerns and issues related to your classes or your academic program.<br/> This includes things like grades, assignments, the class syllabus, admission to a program/major, and academic advising.</div>,
    Courses: 'There are some issues faced by students .Unfortunately,they are not able to complaint them in right place for some reasons..They are welcomed in Subject Panel which can be viewed only by Year Incharge and HOD',
    Lab: 'Complaints faced by students in lab perspective like rushing to complete the lab experiments in last minute of time,not',
    Others: 'The complaints which are not come under above categories those complaints will come under this category.',
    Maintenance: 'A maintenance complaint is a type of complaint that has something to do with the fact that an object although being maintained, was still damaged or is poorly maintained, even with the agreement that the object will be kept well maintained at all times.',
    Faculty: 'Any issues you are facing related to your subject faculty like posting tutorial questions in delaying of time..all these are send to the respective staff.And also it is safe to use because the names are anonymous',
  };

  useEffect(() => {
    axios
      .get(`http://192.168.77.250:8000/Complaint.php?email=${email}`)
      .then((response) => {
        const data = response.data.data; // Assuming the data structure is as provided
        console.log(JSON.stringify(data));
        if (data) {
          setComplaintData(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching complaint data:', error);
      });
  }, [email]);

  return (
    <>
      <div className=' row '>
        <div className='row border-bottom pb-3'>
          <div className='col-md-9 col-lg-10'>
            <Typography className='fs-2 fw-bolder fst-italic'> Complaints</Typography>
            <br></br>
            <Typography className=' fst-italic no-warp'>Here are your complaints</Typography>
          </div>
        </div>
      </div>
      <div>
        <Flex wrap='wrap' gap={'large'}>
          {ComplaintData.map((item) => (
            <Col span={11} key={item.Type}>
              <Card  
                title={item.Type}
                hoverable
                extra={
                  <>
                    <Link  href={`/student/Complaint/${item.Type}`}>Entry</Link>
                  </>
                }
              >
                <Flex gap={'small'} wrap='wrap' justify={'center'} align={'center'}>
                  {Object.entries(item).map(([key, value]) => {
                    if (key !== 'Type') {
                      if(key==='Arrived'){
                        if(item.Type==='Faculty'){
                          return <Card.Grid  onClick={()=>{navigate(`/student/Activity/Faculty#${item.Type}=Sent`)}} style={gridStyle}>Sent <br/>{value}</Card.Grid>;
                        }
                        return <Card.Grid  onClick={()=>{navigate(`/student/Activity#${item.Type}=Sent`)}} style={gridStyle}>Sent <br/>{value}</Card.Grid>;
                      }
                      else{
                        return <Card.Grid  onClick={()=>{
                          if(item.Type==='Faculty'){
                            if(key==='Accepted'){
                              navigate(`/student/Activity/Faculty#${key}`)
                            }
                            else{
                              navigate(`/student/History/Faculty#${key}`)
                            }
                          }
                          else if(key==='Accepted'){
                            navigate(`/student/Activity#${item.Type}=${key}`)
                          }
                          else{
                            navigate(`/student/History#${item.Type}=${key}`)}}
                          } style={gridStyle}>{key} <br/>{value}</Card.Grid>;
                        
                      }
                    }
                    return null;
                  })}
                </Flex>
                <p><div>{complaintDescriptions[item.Type]}</div></p>
              </Card>
            </Col>
          ))}
        </Flex>
      </div>
    </>
  );
};

export default ComplaintStatus;
