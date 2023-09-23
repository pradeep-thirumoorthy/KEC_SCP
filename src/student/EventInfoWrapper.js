import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FNF from '../FNF';
import { useParams } from 'react-router-dom';
import Sidebar1 from './Sidebar1';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const MAX_TIMEOUT = 10000; // 10 seconds

const EventInfoWrapper = () => {
  const { eventId } = useParams();
  const [eventExists, setEventExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [Formdata, setFormData] = useState(null);
  const [formDataState, setFormDataState] = useState([]);
  const [userInputData, setUserInputData] = useState({}); // Initialize with an empty object

  const navigate = useNavigate();
  const Email = Cookies.get("StudentEmail");
    const secretKey = "student-_?info";
    const bytes = CryptoJS.AES.decrypt(Email, secretKey);
    const email = bytes.toString(CryptoJS.enc.Utf8);
    const [message,setMessage]=useState('');
  useEffect(() => {
    setIsLoading(true);

    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, MAX_TIMEOUT);
    
    
    axios
      .get(`http://localhost:8000/SCP/getEventInfo.php?eventId=${eventId}&email=${email}`)
      .then(response => {
        clearTimeout(timeoutId);
        const data = response.data;
        console.log(data);
        if (data.success) {
          setEventExists(true);
          const parsedFormData = JSON.parse(data.eventInfo.Formdata);
          setFormData(parsedFormData);
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
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (Formdata && Formdata.inputs && Formdata.inputs.length !== 0) {
  
      axios.post('http://localhost:8000/SCP/StudentEventResponse.php', { formdata: JSON.stringify(userInputData), email,eventId})
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
    <div className='row'>
      <div className='col-2'><Sidebar1/></div>
      <div className='col-10'>
      <div className='p-5 m-5 bg-warning rounded-3 bg-opacity-25 text-dark border-bottom border-dark border-5'>
        {message}
        </div>
        </div>
    </div>
    );
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!Formdata) {
    return <div>No form data available.</div>;
  }

  return (
    <div className='row'>
      <div className='sidebar1 col-2'>
        <Sidebar1 />
      </div>
      <div className='col-10 float-end'>
        <div className='p-5 m-5 bg-warning rounded-3 bg-opacity-25'>
          {Formdata && (
            <>
              <h2>{Formdata.title}</h2>
              <h4>{Formdata.description}</h4>
            </>
          )}
        </div>
        <form className='' onSubmit={handleSubmit}>
          {Formdata &&
            Formdata.inputs.map((item, index) => (
              <div key={index}>
                <div className='p-5 m-5 bg-warning rounded-3 bg-opacity-25 border-bottom border-dark border-5'>
                  <h2>{item.label}</h2>
                  {item.choices.length === 0 && (
                    <input
                      key={item.label}
                      className='bg-transparent border-0 border-dark form-control border-bottom'
                      required
                      type={item.type}
                      placeholder={`Enter your ${item.label}`}
                      value={formDataState[index][item.label]}
                      onChange={(e) => handleInputChange(item.label, e.target.value)}
                    />
                  )}
                  {item.choices.length > 0 && (
                    <div>
                      <ul>
                        {item.choices.map((choice, choiceIndex) => (
                          <div key={choiceIndex}>
                            <input
                              key={`${item.label}-${choice.value}`}
                              className='form-check-input'
                              type={item.type}
                              name={item.label}
                              value={choice}
                              onChange={(e) => handleInputChange(item.label, e.target.value)}
                            />
                            {choice}
                            <br />
                          </div>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          <input className='btn bg-warning bg-opacity-25 float-end mx-5' type='submit' />
        </form>
      </div>
    </div>
  );
};

export default EventInfoWrapper;
