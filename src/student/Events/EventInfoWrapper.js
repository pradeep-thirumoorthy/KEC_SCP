import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import { Card, Flex, Image, Input, Space, Typography } from 'antd';

const MAX_TIMEOUT = 10000; // 10 seconds

const EventInfoWrapper = () => {
  const { eventId } = useParams();
  const [eventExists, setEventExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Formdata, setFormData] = useState(null);
  const [formDataState, setFormDataState] = useState([]);
  const [userInputData, setUserInputData] = useState({}); // Initialize with an empty object
  const [StudentInfo,setStudentInfo]=useState({});

  const navigate = useNavigate();
  const Email = sessionStorage.getItem("StudentEmail");
  const secretKey = "student-_?info";
  const bytes = CryptoJS.AES.decrypt(Email, secretKey);
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, MAX_TIMEOUT);

    axios
      .get(`http://192.168.77.250:8000/getEventInfo.php?eventId=${eventId}&email=${email}`)
      .then(response => {
        clearTimeout(timeoutId);
        const data = response.data;
        console.log(data);
        if (data.success) {
          setEventExists(true);
          const parsedFormData = JSON.parse(data.eventInfo.Formdata);
          setFormData(parsedFormData);
          setStudentInfo(data.studentInfo);
          setFormDataState(parsedFormData.inputs.map((item) => ({ [item.label]: '' })));
        } else {
          setEventExists(false);
          setMessage(response.data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching event info', error);
        setEventExists(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [eventId]);

  const handleInputChange = (inputLabel, value) => {
    setFormDataState(prevState => {
      const newState = prevState.map(item => ({
        ...item,
        [inputLabel]: value
      }));
      setUserInputData(prevInputData => ({
        ...prevInputData,
        ...newState.reduce((result, item) => ({ ...result, ...item }), {})
      }));
      return newState;
    });
  };


  const order=['Name','Roll_No'];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Formdata && Formdata.inputs && Formdata.inputs.length !== 0) {
      axios.post('http://192.168.77.250:8000/StudentEventResponse.php', { formdata: JSON.stringify(userInputData), email, eventId })
        .then(response => {
          if (response.data.success) {
            console.log("Event data inserted successfully");
            navigate("/student/Events");
          } else {
            alert(response.data.message);
            window.location.reload();
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    } else {
      window.confirm("There are no details in the form. Please give some input.");
    }
  };

  if (!eventExists) {
    console.log('Event does not exist.');
    return (
      <div className='m-5'>
      <Card  className='p-5 w-100' bordered hoverable>
        {message}
      </Card>
      </div>
    );
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Formdata) {
    return <div>No form data available.</div>;
  }
  const bgcolor=localStorage.getItem('theme')==='dark'?0:255;
  return (
    <div className='w-100'>
    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <div className=''>
      <Card
      style={{
        backgroundImage: `linear-gradient(rgba(${bgcolor}, ${bgcolor}, ${bgcolor}, 0.4), rgba(${bgcolor}, ${bgcolor}, ${bgcolor}, 0.4)), url(http://192.168.77.250:8000/Upload/${eventId}.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      
      hoverable>
        {Formdata && (
          <>
            <Typography.Title level={2}>{Formdata.title}</Typography.Title>
            <Typography.Title level={4}>{Formdata.description}</Typography.Title>
          </>
        )}
      </Card>
      <br/>
      <form className='' onSubmit={handleSubmit}>
      {Formdata &&
  <>
    {Formdata.inputs.slice(0, 2).map((item, index) => (
      <div key={index}>
        <Card className='p-5' hoverable>
          <Typography.Title level={2}>{item.label}</Typography.Title>
          {item.choices.length === 0 && (
            <input
              key={item.label}
              className='border-0 border-dark form-control border-bottom'
              required
              type={item.type}
              placeholder={`Enter your ${item.label}`}
              value={StudentInfo[order[index]]} // Adjust the index for formDataState
              onChange={(e) => handleInputChange(item.label, e.target.value)}
              disabled
            />
          )}
        </Card>
        <br />
      </div>
    ))}
    {Formdata.inputs.slice(2).map((item, index) => (
      <div key={index}>
        <Card className='p-5' hoverable>
          <Typography.Title level={2}>{item.label}</Typography.Title>
          {item.choices.length === 0 && (
            <input
              key={item.label}
              className='border-0 border-dark form-control border-bottom'
              required
              type={item.type}
              placeholder={`Enter your ${item.label}`}
              value={2} // Adjust the index for formDataState
              onChange={(e) => handleInputChange(item.label, e.target.value)}
              disabled
            />
          )}
          
          {item.choices.length > 0 && (
            <div>
              <ul>
                {item.choices.map((choice, choiceIndex) => (
                  <Flex align='center' key={choiceIndex} style={{alignItems:'center'}}>
                    <input style={{marginRight:'10px'}}
                      key={`${item.label}-${choice.value}`}
                      className='form-check-input'
                      type={item.type}
                      name={item.label}
                      value={choice}
                      onChange={(e) => handleInputChange(item.label, e.target.value)}

                    />
                    {choice}
                    <br />
                  </Flex>
                ))}
              </ul>
            </div>
          )}
        </Card>
        <br />
      </div>
    ))}
  </>
}

        <Input className='float-end mx-5' style={{width:'100px'}} type='submit' value="Submit"/>
      </form>
      </div>
    </Space>
    </div>
  );
};

export default EventInfoWrapper;
