import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Card, Col, Flex } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { getEmailFromSession } from '../EmailRetrieval';
const Complaints = () => {
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
      .get(`http://localhost:8000/Admin/Complaints/Complaint.php?email=${getEmailFromSession()}`)
      .then((response) => {
        //console.log(getEmailFromSession());
        const data = response.data.data;
        //console.log(JSON.stringify(data));
        if (data) {
          setComplaintData(data);
        }
      })
      .catch((error) => {
        console.error('Error fetching complaint data:', error);
      });
  }, []);

  return (
    <>
      <div>
        <Flex wrap='wrap' gap={'large'}>
          {ComplaintData.map((item) => (
            <Col span={11} key={item.Type}>
              <Card  
                title={item.Type}
                hoverable
              >
                <Flex gap={'small'} wrap='wrap' justify={'center'} align={'center'}>
                  {Object.entries(item).map(([key, value]) => {
                    if (key !== 'Type') {
                      if(key==='Arrived'){
                        if(item.Type==='Faculty'){
                          return <div></div>;
                        }
                        return <Card.Grid  onClick={()=>{navigate('/admin/Complaints/overview',{ state: { FilterState: 'Arrived',TypeState:item.Type }})}} style={gridStyle}>Sent <br/>{value}</Card.Grid>;
                      }
                      else{
                        return <Card.Grid  onClick={()=>{
                          if(item.Type==='Faculty'){
                            if(key==='Accepted'){
                              navigate('/admin/Activity/Faculty')
                            }
                            else{
                              navigate('/admin/History/Faculty', { state: { FilterState: key } })
                            }
                          }
                          else if(key==='Accepted'){
                            navigate(`/admin/Activity`, { state: { FilterState: key ,TypeState : item.Type} })
                          }
                          else{
                            navigate('/admin/History', { state: { FilterState: key ,TypeState : item.Type} })}}
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

export default Complaints;
