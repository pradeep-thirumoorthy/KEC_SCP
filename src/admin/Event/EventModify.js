import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FNF from '../../FNF';
import { useNavigate, useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { Button, Flex } from 'antd';

const MAX_TIMEOUT = 10000; // 10 seconds

const EventModifier = () => {
  const { eventId } = useParams();
  const [eventInfo, setEventInfo] = useState(null);
  const [eventExists, setEventExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(null);
  const [limit, setLimit] = useState(0);
  const [lastDate, setLastDate] = useState(null);
  const [formData, setFormData] = useState({});
  const [isModified, setIsModified] = useState(false); // Track if any field is modified

  const Email = Cookies.get('AdminEmail');
  const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
  
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setError('Request timed out'); // Handle timeout
    }, MAX_TIMEOUT);
  
    axios
      .get(`http://192.168.157.250:8000/SCP/Eventmodify.php?email=${email}&EventId=${eventId}`)
      .then(response => {
        clearTimeout(timeoutId); // Clear the timeout since response was received
        const data = response.data;
  
        if (data) {
          setEventExists(true);
          setEventInfo(data);
          const formDataObject = JSON.parse(data.Formdata);
          setFormData(formDataObject);
          setLastDate(data.IntervalTime);
          setLimit(parseInt(data.Limits));
          setStatus(data.Status);
        } else {
          setError('Event data not found');
        }
      })
      .catch(error => {
        console.error('Error fetching event info', error);
        setError('Error fetching event info');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [eventId, email]);

  // Handle changes to the "Limit" input field
  const handleLimitChange = event => {
    const newLimit = event.target.value;
    setLimit(newLimit);
    setIsModified(true);
  };

  // Handle changes to the "Status" radio buttons
  const handleStatusChange = event => {
    const newStatus = event.target.value;
    setStatus(newStatus);
    setIsModified(true);
  };

  // Handle changes to the "Last Date" input field
  const handleLastDateChange = event => {
    const newLastDate = event.target.value;
    setLastDate(newLastDate);
    setIsModified(true);
  };
  const handleSubmit = () => {
    axios.post('http://192.168.157.250:8000/SCP/modifyevent.php', {limit,lastDate,status,eventId,email},)
      .then(response => {
        if (response.data.success) {
          window.confirm('successfully updated');
          navigate('/admin/events');
        } else {
          window.confirm("you entered wrong date");
        }
      })
      .catch(error => {
        console.error('Error during :', error);
      });
  };

  // Handle form submission (you can add your logic here)

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!eventExists) {
    return <FNF />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!eventInfo) {
    return <div>No event information available.</div>;
  }
  return (
    <>
      <div className='h-100'>
          <div className='p-5 m-5 bg-warning rounded-3 bg-opacity-25'>
            {formData && (
              <>
                <h2>Title: {formData.title}</h2>
                <h4>Description: {formData.description}</h4>
              </>
            )}
          </div>

          <div className='p-5 m-5 bg-warning rounded-3 bg-opacity-25'>
            Limit:
            <input
              className='form-control'
              type='number'
              min={eventInfo.Limits}
              max={1000}
              value={limit}
              onChange={handleLimitChange}
            />
          </div>

          <div className='p-5 m-5 bg-warning rounded-3 bg-opacity-25'>
            Status:<br></br>
            <input
              type='radio'
              className='form-check-input ms-5'
              value="open"
              name='status'
              checked={status === 'open'}
              onChange={handleStatusChange}
            />
            Open<br></br>
            <input
              className='form-check-input ms-5'
              type='radio'
              value='closed'
              name='status'
              checked={status === 'closed'}
              onChange={handleStatusChange}
            />
            Close
          </div>

          <div className='p-5 m-5 bg-warning rounded-3 bg-opacity-25'>
            Last Date:
            <input
              className='form-control'
              type='date'
              value={lastDate}
              onChange={handleLastDateChange}
              min={eventInfo.IntervalTime}
            />
            
          </div>
          <div className='w-100'>
             <Flex  justify={'flex-end'} >
        <Button type="primary" className='mt-2 m-5' disabled={!isModified}
              onClick={handleSubmit}>Modify</Button>
      </Flex>
          </div>
          
        </div>
    </>
  );
};

export default EventModifier;
