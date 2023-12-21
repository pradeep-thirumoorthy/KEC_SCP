import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import CopyToClipboard from '../CopyToClipboard';
import { useNavigate } from 'react-router';
import { FileDoneOutlined, SettingOutlined } from '@ant-design/icons';

import { Card, Flex, Image} from 'antd';
const MAX_TIMEOUT = 10000;

const FullEvents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [EventData, setEventData] = useState([]);
  const Email = sessionStorage.getItem('AdminEmail');
  const response = (id) => {
    navigate("/admin/Events/eventInfo/" + id + "/response");
  };

  const modify = (id) => {
    navigate("/admin/Events/eventInfo/" + id + "/modify");
  };

  useEffect(() => {
    if (Email) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);
      const timeoutId = setTimeout(() => {
        setIsLoading(false); // Handle timeout
      }, MAX_TIMEOUT);

      // Make a request using Axios to fetch admin's Name based on the decrypted email
      axios.get(`http://localhost:8000/EventInfoAdmin.php?email=${email}`)
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
    return EventData.map((item) => (
      <Card
        style={{ width: 300 }}
        cover={<Image alt="example" width={'100%'} height={'200px'} src={`http://localhost:8000/Upload/${item.event_id}.png`} />}
        actions={[
          <SettingOutlined key="setting" onClick={() => modify(item.event_id)} />,
          <FileDoneOutlined key="edit" onClick={() => response(item.event_id)} />,
          <CopyToClipboard
            className="text-center w-100"
            textToCopy={`http://localhost:3000/student/events/EventInfo/${item.event_id}`}
          />
        ]}
        hoverable
        key={item.event_id}
      >
        <Card.Meta extra={
          <CopyToClipboard
            className="text-center w-100"
            textToCopy={`http://localhost:3000/student/events/EventInfo/${item.event_id}`}
          />
        }
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
            {/* Header section remains the same */}
          </div>
          <div className='row'>
            <span className='fs-2 fw-bolder fst-italic'>Your Events:</span>
            <Flex justify='center' align="center" wrap="wrap" gap="small">
        {renderEventCards()}
      </Flex>
          </div>
        </div>
      )}
    </>
  );
}

export default FullEvents;
