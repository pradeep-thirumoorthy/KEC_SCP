import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { EditOutlined } from '@ant-design/icons';

import { Card, Flex, Image, Typography} from 'antd';
const MAX_TIMEOUT = 10000;

const FullEvents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [EventData, setEventData] = useState([]);
  const Email = sessionStorage.getItem('StudentEmail');
  const response = (id) => {
    navigate("/student/Events/EventInfo/" + id);
  };

  useEffect(() => {
    if (Email!=='') {
      const bytes = CryptoJS.AES.decrypt(Email, 'student-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);
      const timeoutId = setTimeout(() => {
        setIsLoading(false); // Handle timeout
      }, MAX_TIMEOUT);

      // Make a request using Axios to fetch admin's Name based on the decrypted email
      axios.get(`http://localhost:8000/Student/Events/EventInfoStudent.php?email=${email}`)
        .then(response => {
          clearTimeout(timeoutId);
          const data = response.data.data;
          if (data) {
            setEventData(data);
          }
        })
        .catch(error => {
          console.error('Error fetching admin data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [Email]);


  const renderEventCards = () => {
    return EventData.PublicEvents.map((item) => (
      <Card 
        style={{ width: 300 }}
        cover={<Image alt="example" width={'100%'} height={'200px'} src={`http://localhost:8000/Upload/${item.event_id}.png`} />}
        actions={[
          <EditOutlined key="edit" onClick={() => response(item.event_id)} />,
        ]}
        hoverable
        key={item.event_id}
      >
        < Card.Meta  
          title={item.Title}
          description={<><p>Limit: {item.Limits}</p>
          <p>Start Date: {item.Date}</p>
          <p>Last Date: {item.IntervalTime}</p>
          <p>Status: {item.Status === 'open' ? 'Open' : 'Closed'}</p></>}
        />
      </Card>
    ));
  };
  const renderEventCards2 = () => {
    return EventData.ConditionalEvents.map((item) => (
      <Card 
        style={{ width: 300 }}
        cover={<Image alt="example" width={'100%'} height={'200px'} src={`http://localhost:8000/Upload/${item.event_id}.png`} />}
        actions={[
          <EditOutlined key="edit" onClick={() => response(item.event_id)} />,
        ]}
        hoverable
        key={item.event_id}
      >
        < Card.Meta  
          title={item.Title}
          description={<><p>Limit: {item.Limits}</p>
          <p>Start Date: {item.Date}</p>
          <p>Last Date: {item.IntervalTime}</p>
          <p>Status: {item.Status === 'open' ? 'Open' : 'Closed'}</p></>}
        />
      </Card>
    ));
  };

  return (
    <>
      {isLoading ? (
        <div className='right col-10'>
          none
        </div>
      ) : (
        <div>
          <div className=" row ">
          </div>
            <Typography className='fs-2 fw-bolder fst-italic'>Public Events:</Typography>
            <Flex justify='center' align="center" wrap="wrap" gap="small">
        {renderEventCards()}
      </Flex>
      <Typography className='fs-2 fw-bolder fst-italic'>Conditional Events:</Typography>
            <Flex justify='center' align="center" wrap="wrap" gap="small">
        {renderEventCards2()}
      </Flex>
        </div>
      )}
    </>
  );
}

export default FullEvents;
