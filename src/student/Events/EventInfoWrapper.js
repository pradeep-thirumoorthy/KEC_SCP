import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Card, Flex, Input, Space, Typography } from 'antd';
import { geteduEmailFromSession } from '../Emailretrieval';

const MAX_TIMEOUT = 10000; // 10 seconds

const EventInfoWrapper = () => {
  const { eventId } = useParams();
  const [eventExists, setEventExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Formdata, setFormData] = useState(null);
  const [formDataState, setFormDataState] = useState({});
  const [userInputData, setUserInputData] = useState({}); // Initialize with an empty object
  const [StudentInfo,setStudentInfo]=useState({});

  const navigate = useNavigate();
  const email = geteduEmailFromSession();
  const [message, setMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, MAX_TIMEOUT);

    axios
      .get(`http://localhost:8000/Student/Events/EventInfo.php?eventId=${eventId}&email=${email}`)
      .then(response => {
        clearTimeout(timeoutId);
        const data = response.data;
        //console.log(data);
        if (data.success){
          setEventExists(true);
          const parsedFormData = JSON.parse(data.eventInfo.Formdata);
          setFormData(parsedFormData);
          setStudentInfo(data.studentInfo);
          const initialFormDataState = parsedFormData.inputs.reduce((acc, item) => {
            if(item.label==='Name'){
              acc[item.label] = data.studentInfo.Name;
            }
            else if(item.label==='Roll'){
              acc[item.label] = data.studentInfo.Roll_No;
            }
            else {acc[item.label] = '';}
            return acc;
          }, {});
          setFormDataState(initialFormDataState);
          //console.log(StudentInfo.Name);
          //console.log(data.studentInfo.Name);
          //console.log(formDataState);
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

  }, [email, eventId]);

  const handleInputChange = (inputLabel, value) => {
    setFormDataState(prevState => {
      const newState = {
        ...prevState,
        [inputLabel]: value,
      };
      setUserInputData(prevInputData => ({
        ...prevInputData,
        ...newState,
      }));
      return newState;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Formdata && Formdata.inputs && Formdata.inputs.length !== 0) {
      axios.post('http://localhost:8000/Student/Events/Submit.php', { formdata: JSON.stringify(userInputData), email, eventId })
        .then(response => {
          if (response.data.success) {
            //console.log("Event data inserted successfully");
            navigate("/student/Events");
            //console.log("data"+response.data.message);
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
    //console.log('Event does not exist.');
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
        backgroundImage: `linear-gradient(rgba(${bgcolor}, ${bgcolor}, ${bgcolor}, 0.4), rgba(${bgcolor}, ${bgcolor}, ${bgcolor}, 0.4)), url(http://localhost:8000/Upload/${eventId}.png)`,
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
    {Formdata.inputs.map((item, index) => (
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
              
              value={formDataState[item.label]}
              onChange={(e) => handleInputChange(item.label, e.target.value)}
              disabled={(index)<=1}
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
