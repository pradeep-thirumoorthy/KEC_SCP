import React, { useState } from 'react';
import {  FiPlusCircle, FiTrash2, FiX } from 'react-icons/fi';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Button, Card, Flex, Input, Layout, Select} from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Title } from 'chart.js';
import Reach from './Reach';
const EventFormCreation = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slimit,setlimit]=useState(1);
    const [generated] = useState(false);
    const [lastDate,setLastDate]=useState(getTodayDate);
    
    const [previewImage, setPreviewImage] = useState('');
    const generateInput = () => {
        const inputId = Date.now();
        const newInput = {
            key: inputId,
            label: '',
            selectedType: 'text',
            inputArrayLength: 1,
            options: [{ value: '', display: true }],
        };
        setInputs([...inputs, newInput]);
    };
    const [pfile,psetfile] = useState('');
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file.type.startsWith('image/')) {
            // Set the file in state if it's an image
            psetfile(file);
            setPreviewImage(URL.createObjectURL(file));
        } else {
            alert('Please upload an image file.');
        }
    };
    useEffect(() => {
        
        console.log(JSON.stringify(pfile));
        if (!generated) {
            generateInput();
        }
        const beforeUnloadHandler = (e) => {
            e.preventDefault();
            e.returnValue = '';
          };
      
          const unloadHandler = () => {
            const message = 'Do you really want to leave this page?';
            alert(message);
          };
      
          window.addEventListener('beforeunload', beforeUnloadHandler);
          window.addEventListener('unload', unloadHandler);
          
          return () => {
            window.removeEventListener('beforeunload', beforeUnloadHandler);
            window.removeEventListener('unload', unloadHandler);
          };
    }, []);

    const handleLastDateChange = event => {
        const newLastDate = event.target.value;
        setLastDate(newLastDate);
      };
    const handleSelectChange = (event, inputId) => {
        const selectedValue = event.target.value;
        setInputs(prevInputs =>
            prevInputs.map(input => {
                if (input.key === inputId) {
                    return {
                        ...input,
                        selectedType: selectedValue,
                        options: selectedValue === 'text' ? [] : [{ value: '', display: true }],
                    };
                }
                return input;
            })
        );
    };

    const updateOptionValue = (inputKey, optionIndex, value) => {
        setInputs(prevInputs =>
            prevInputs.map(input => {
                if (input.key === inputKey) {
                    const updatedOptions = [...input.options];
                    updatedOptions[optionIndex].value = value;
                    return { ...input, options: updatedOptions };
                }
                return input;
            })
        );
    };
//adding individual options of input of radio,checkbox
    const addOption = (inputKey) => {
        setInputs(prevInputs =>
            prevInputs.map(input => {
                if (input.key === inputKey) {
                    const updatedOptions = [...input.options, { value: '', display: true }];
                    return { ...input, options: updatedOptions };
                }
                return input;
            })
        );
    };
//delete individual options of input of radio,checkbox
    const deleteOption = (inputKey, optionIndex) => {
        setInputs(prevInputs =>
            prevInputs.map(input => {
                if (input.key === inputKey) {
                    const updatedOptions = input.options.map((option, index) => {
                        if (index === optionIndex) {
                            return { ...option, display: false };
                        }
                        return option;
                    });
                    return { ...input, options: updatedOptions };
                }
                return input;
            })
        );
    };
    
//rendering the options of input of radio,checkbox  
    const renderOptions = (inputKey, type) => {
        return inputs.map(input => {
            if (input.key === inputKey) {
                return input.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                        {option.display && (
                            <div>
                                <Input
                                    type={type}
                                    className='ms-3'
                                    disabled
                                />
                                <Input
                                    className='option ms-md-3 my-2  border-0 border-bottom w-75 border-dark'
                                    type='text'
                                    value={option.value}
                                    onChange={(e) => updateOptionValue(input.key, optionIndex, e.target.value)} required
                                />
                                {optionIndex !== 0 && (
                                    <button className='outline-0 border-0 ' onClick={() => deleteOption(input.key, optionIndex)}>
                                        <FiX />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ));
            }
            return null;
        });
    };
    const styles = {
        tagFadeOut: {
          opacity: 0,
          transform: 'translateY(-20px)', // Adjust the value as needed for the upward motion
          transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out', // Adding transform to the transition
        },
        
        // Other styles
      };
      
      

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            title: title,
            description: description,
            inputs: inputs.map(input => {
                return {
                    label: input.label,
                    type: input.selectedType,
                    choices: input.options
                        .filter(option => option.display && ['radio', 'checkbox'].includes(input.selectedType))
                        .map(option => option.value),
                };
            }),
        };
        if (formData.inputs.length !== 0 && pfile !== '' && Title!=='' && description !=="") {
            const limit = (slimit !== '') ? parseInt(slimit) : 1;
            console.log(formData);
            const Email = Cookies.get("AdminEmail");
            const secretKey = "admin-_?info";
            const bytes = CryptoJS.AES.decrypt(Email, secretKey);
            const email = bytes.toString(CryptoJS.enc.Utf8);
            console.log(email, formData, limit);
            const formdata = JSON.stringify(formData);
                        console.log(formdata);
                        const finformData = new FormData();
            finformData.append('limit', slimit);
            finformData.append('formdata', JSON.stringify(inputs));
            finformData.append('email', email);
            finformData.append('option', 'create');
            finformData.append('title', title);
            finformData.append('formdata', formdata);
            finformData.append('lastDate', lastDate);
            finformData.append('pfile', pfile);
            axios.post('http://localhost:8000/SCP/EventForm.php', finformData)
                .then(response => {
                    if (response.data.success) {
                        // Successful response, do whatever you need to do
                        console.log("Event data inserted successfully");
                        navigate("/admin/Events");
                        
                    } else {
                        // Show an alert message with the error message
                        alert(response.data.message);
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                });
            }
        
        
        
        else{
            window.confirm("There is no details in the form .Please give some input");
        }
    };
    const deletetag = (inputKey) => {
        setInputs(prevInputs => {
          const updatedInputs = prevInputs.map(input => {
            if (input.key === inputKey) {
              return { ...input, fading: true };
            }
            return input;
          });
          return updatedInputs;
        });

    setTimeout(() => {
        setInputs(prevInputs => prevInputs.filter(input => input.key !== inputKey));
    }, 500);
};


    return (
        <div className='row'>
            
            <div>
            <div>
            <Layout>
      <div 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className='w-100'><Button className=' float-end' onClick={generateInput}>Generate Input</Button>
                    </div>
                    
      </div>
      <Content className="site-layout ">
        <form onSubmit={handleSubmit} className='col-12 float-end  mt-5 mt-lg-0'>
                    <h1 className='text-center mt-5'>Event Form Creation</h1>
                <Card hoverable className='px-md-5 px-sm-1 py-md-5 py-sm-1 my-5 mx-lg-5 mx-sm-1 rounded-3' style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${previewImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',}}>
                
                
                <Input type='file' accept="image/*" onChange={handleFileChange}/>
                    <div className='form-group'>
                        <label className='form-label fs-3' htmlFor='title'>
                            Title
                        </label>
                        <Input
                            type='text'
                            className='form-control '
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value) } required
                        />
                    </div>
                    <div className="form-outline">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control  border-dark"
                            id="description"
                            rows="2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} required
                        ></textarea>
                    </div>
                    <Reach
        slimit={slimit}
        setlimit={setlimit}
        lastDate={lastDate}
        getTodayDate={getTodayDate}
        handleLastDateChange={handleLastDateChange}
      />
                </Card>
                {inputs.map((input, index) => (
            <Card
                key={index} // Using index as the key for dynamic rendering
                style={input.fading ? styles.tagFadeOut : {}}
                hoverable
                className={`px-md-5 px-sm-1 py-md-5 py-sm-1 my-5 mx-lg-5 mx-sm-1 rounded-3 ${input.fading ? 'tag-fade-out' : ''}`}
            >
                        <div className='row'>
                            <Input
                                className='col-lg-6 text-start  w-50 border-0 border-bottom border-dark form-control rounded-0'
                                type='text' placeholder='Label'
                                value={input.label}
                                onChange={(e) =>
                                    setInputs(prevInputs =>
                                        prevInputs.map(prevInput =>
                                            prevInput.key === input.key ? { ...prevInput, label: e.target.value } : prevInput
                                        )
                                    )
                                }
                                required
                            />
                            <div className='w-25'></div>
                            <Select
                                className="col-lg-6 text-start w-25 border-0 border-bottom border-dark form-control rounded-0"
                                value={input.selectedType}
                                onChange={(e) => handleSelectChange(e, input.key)}
                            >
                                <option value="text">Plain text</option>
                                <option value="checkbox">Checkbox options</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="email">Email</option>
                                <option value="radio">Radio options</option>
                            </Select>
                        </div>
                        <br />
                        <div className='col-lg-10'>
                            {['radio', 'checkbox'].includes(input.selectedType) && (
                                <div>
                                    {renderOptions(input.key, input.selectedType)}
                                    <FiPlusCircle size={25} onClick={() => addOption(input.key)} />
                                </div>
                            )}
                        </div>
                        <div className='float-end'>
                            <FiTrash2 color='dark'style={{cursor:"pointer"}} size={25} onClick={() => deletetag(input.key)} />
                        </div>
                    </Card>
                ))}
                <div className='w-100'>
                <Flex  justify={'flex-end'} >
                <Input style={{width:'100px'}} className='me-5' type='submit' value='publish' />
      </Flex></div>
            </form>
      </Content>
      </Layout>
            
                </div>
                
            </div>
            
        </div>
    );
}

export default EventFormCreation;
