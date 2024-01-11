import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FNF from '../../FNF';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Card, Flex, Radio, Select, Typography } from 'antd';
import { getEmailFromSession } from '../EmailRetrieval';

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
  const [visibility,setvisible] = useState('');
  const [department,setDepartment]=useState('Not Applied');
  const [Class,setClass]=useState('Not Applied');
  const [Batch,setBatch]=useState('Not Applied');
  const email = getEmailFromSession();
  const navigate = useNavigate();
  useEffect(() => {
    setIsLoading(true);
  
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
      setError('Request timed out'); // Handle timeout
    }, MAX_TIMEOUT);
  
    axios
      .get(`http://localhost:8000/Eventmodify.php?email=${email}&EventId=${eventId}`)
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
          setvisible(data.visible);
          console.log(data);
          
          if(data.visible === 'constraint'){
            const constraint=JSON.parse(data.constraints);
            setDepartment(constraint[0]);
            setBatch(constraint[1]);
            setClass(constraint[2]);
          }
          console.log(data);
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
    const constraint = JSON.stringify([department,Batch,Class]);
    console.log(constraint);
    axios.post('http://localhost:8000/modifyevent.php', {limit,lastDate,status,eventId,email,visibility,constraint},)
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
          <Card  hoverable className='p-5 m-5  rounded-3' style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(http://localhost:8000/Upload/${eventId}.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',}}>
            {formData && (
              <>
                <Typography.Title level={2}>Title: {formData.title}</Typography.Title>
                <Typography.Title level={4}>Description: {formData.description}</Typography.Title>
              </>
            )}
          </Card>

          <Card  hoverable className='p-5 m-5  rounded-3'>
            Limit:
            <input
              className='form-control'
              type='number'
              min={eventInfo.Limits}
              max={1000}
              value={limit}
              onChange={handleLimitChange}
            />
          </Card>

          <Card  hoverable className='p-5 m-5  rounded-3'>
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
          </Card>
          
          <Card  hoverable className='p-5 m-5  rounded-3'>
            Last Date:
            <input
              className='form-control'
              type='date'
              value={lastDate}
              onChange={handleLastDateChange}
              min={eventInfo.IntervalTime}
            />
            
          </Card>
          <Card  hoverable className='p-5 m-5  rounded-3'>
            Visibility:
            <Radio.Group optionType='button' onChange={(e)=>{setvisible(e.target.value);setIsModified(true)}} value={visibility}>
      <Radio value='Private'>Private</Radio>
      <Radio value='Public'>Public</Radio>
      <Radio value='constraint'>constraint</Radio>
    </Radio.Group>
            {(visibility==='constraint')?<>
            <Select className='w-100'
                value={department}
                onChange={(e) => {setDepartment(e);setBatch('Not Applied');setClass('Not Applied')}}
            >
            <option value="Not Applied">Not Applied</option>
                <option value="CSE">CSE</option>
                <option value="IT">IT</option>
                <option value="CSD">CSD</option>
                <option value="EEE">EEE</option>
                <option value="EIE">EIE</option>
            </Select>
            <Select className='w-100'
                value={Batch}
                disabled={(department==='Not Applied')}
                onChange={(e) => {setBatch(e);setClass('Not Applied')}}
            >
            <option value="Not Applied">Not Applied</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
            </Select>
            <Select className='w-100'
                value={Class}
                disabled={(Batch==='Not Applied')}
                onChange={(e) => {setClass(e)}}
            >
            <option value="Not Applied">Not Applied</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
            </Select>
            </>:<></>}
          </Card>
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
