import React, { useState } from 'react';
import {DeleteOutlined,PlusCircleOutlined,CloseOutlined} from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import axios from 'axios';
import './styled.css';
import { Button, Card, ConfigProvider, Flex, Input, Layout, Typography, theme} from 'antd';
import { Content } from 'antd/es/layout/layout';
import Reach from './Reach';
import { getEmailFromSession } from '../EmailRetrieval';
const EventFormCreation = () => {
    const navigate = useNavigate();
    const newInput1 = {
        key: 1,
        label: 'Name',
        selectedType: 'text',
        inputArrayLength: 1,
        options: [{ value: '', display: true }],
    };
    const newInput2 = {
        key: 2,
        label: 'Roll',
        selectedType: 'text',
        inputArrayLength: 1,
        options: [{ value: '', display: true }],
    };
    const [inputs, setInputs] = useState([newInput1,newInput2]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slimit,setlimit]=useState(1);
    const [generated] = useState(false);
    const [lastDate,setLastDate]=useState(getTodayDate);
    const [constraint,setConstraint]=useState(['Not Applied','Not Applied','Not Applied']);
    
    const [previewImage, setPreviewImage] = useState('');
    const [visibility, setvisibility] = useState('private');

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
        const files = e.target.files;
    
        if (files && files.length > 0) {
            const file = files[0];
    
            if (file.type.startsWith('image/')) {
                // Set the file in state if it's an image
                psetfile(file);
                setPreviewImage(URL.createObjectURL(file));
            } else {
                setPreviewImage('');
                alert('Please upload an image file.');
            }
        } else {
            
            setPreviewImage('');
            console.log('No file selected');
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
        
        console.log(JSON.stringify(inputs));

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
                            <Flex justify='flex-start' align='center'>
                                <Input style={{height: '1em'}} type={type} disabled/>
                                <Input
                                    className='option ms-md-3 my-2'
                                    type='text'
                                    value={option.value}
                                    onChange={(e) => updateOptionValue(input.key, optionIndex, e.target.value)} required
                                />
                                {optionIndex !== 0 && (
                                    <Button className='outline-0 border-0 '>
                                        <CloseOutlined onClick={() => deleteOption(input.key, optionIndex)}/>
                                    </Button>
                                )}
                            </Flex>
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
      };
      
      

      const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check for duplicate labels
        const isDuplicateLabel = inputs.some((input, index) => {
            return inputs.findIndex(item => item.label === input.label) !== index;
        });
    
        if (isDuplicateLabel) {
            alert("Warning: Input labels must be unique");
            return; // Stop form submission if there are duplicate labels
        }
    
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
    
        if (
            formData.inputs.length !== 0 &&
            pfile !== '' &&
            title !== '' &&
            description !== ''
        ) {
            const limit = slimit !== '' ? parseInt(slimit) : 1;
            console.log(formData);
            console.log(formData, limit);
            const formdata = JSON.stringify(formData);
            console.log(formdata);
            const finformData = new FormData();
            finformData.append('limit', slimit);
            finformData.append('formdata', JSON.stringify(inputs));
    
            finformData.append('email', getEmailFromSession());
            finformData.append('option', 'create');
            finformData.append('title', title);
            finformData.append('formdata', formdata);
            finformData.append('lastDate', lastDate);
            finformData.append('pfile', pfile);
            finformData.append('constraint',JSON.stringify(constraint));
            finformData.append('visibility',visibility);
            axios
                .post('http://localhost:8000/Admin/Events/EventForm.php', finformData)
                .then((response) => {
                    if (response.data.success) {
                        // Successful response, do whatever you need to do
                        console.log("Event data inserted successfully");
                        navigate("/admin/Events");
                    } else {
                        // Show an alert message with the error message
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            window.confirm("There is no details in the form. Please give some input");
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
                    <Typography.Title level={1} className='text-center mt-5'>Event Form Creation</Typography.Title>
                <Card  hoverable className='px-md-5 px-sm-1 py-md-5 py-sm-1 my-5 mx-lg-5 mx-sm-1 rounded-3' style={{backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${previewImage})`,
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
        setConstraint={setConstraint}
        setvisibility={setvisibility}
      />
                </Card>
                <Card 
                hoverable
                className={`px-md-5 px-sm-1 py-md-5 py-sm-1 my-5 mx-lg-5 mx-sm-1 rounded-3`}
            >
                        <div className='row'>
                            <Input
                                className='col-lg-6 text-start  w-50 border-0 border-bottom border-dark  rounded-0'
                                type='text' placeholder='Label'
                                value={"Name"}
                                required disabled
                            />
                            <div className='w-25'></div>
                            <select 
                                className="col-lg-6 w-25 ant-input css-dev-only-do-not-override-16s6fz5 css-dev-only-do-not-override-1aoj0m0"
                                value="Plain text" disabled
                            >
                            <option value="Plain text">Plain text</option>
                            </select>
                        </div>
                    </Card>
                    <Card 
                hoverable
                className={`px-md-5 px-sm-1 py-md-5 py-sm-1 my-5 mx-lg-5 mx-sm-1 rounded-3`}
            >
                        <div className='row'>
                            <Input
                                className='col-lg-6 text-start  w-50 border-0 border-bottom border-dark  rounded-0'
                                type='text' placeholder='Label'
                                value={"Roll No"}
                                required disabled
                            />
                            <div className='w-25'></div>
                            <select
                                className="col-lg-6 w-25 ant-input css-dev-only-do-not-override-16s6fz5 css-dev-only-do-not-override-1aoj0m0"
                                value="Plain text" disabled
                            >
                            <option value="Plain text">Plain text</option>
                            </select>
                        </div>
                    </Card>
                {inputs.slice(2).map((input, index) => (
                    <ConfigProvider
                    theme={{
                      components: {
                        Button: {
                          colorPrimary: '#00b96b',
                        },
                        input: {
                          colorPrimary: '#eb2f96',
                        }
                      },
                    }}
                  >
            <Card 
                key={index} // Using index as the key for dynamic rendering
                style={input.fading ? styles.tagFadeOut : {}}
                hoverable
                className={`px-md-5 px-sm-1 py-md-5 py-sm-1 my-5 mx-lg-5 mx-sm-1 rounded-3 ${input.fading ? 'tag-fade-out' : ''}`}
            >
                
                        <div className='row'>
                            <Input
                                className='col-lg-6 text-start  w-50 border-0 border-bottom border-dark  rounded-0'
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
                            <select
                            
                                className="col-lg-6 w-25 ant-input css-dev-only-do-not-override-16s6fz5 css-dev-only-do-not-override-1aoj0m0"
                                value={input.selectedType}
                                onChange={(e) => handleSelectChange(e, input.key)}
                            >
                                <option value="text">Plain text</option>
                                <option value="checkbox">Checkbox options</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="email">Email</option>
                                <option value="radio">Radio options</option>
                            </select>
                        </div>
                        <br />
                        <div className='col-lg-10 radio-check-inputs'>
                            {['radio', 'checkbox'].includes(input.selectedType) && (
                                <div>
                                    {renderOptions(input.key, input.selectedType)}
                                    <PlusCircleOutlined  size={25} onClick={() => addOption(input.key)} />
                                </div>
                            )}
                        </div>
                        <div className='float-end'>
                            <Button onClick={() => deletetag(input.key)} style={{display:'flex',alignItems:'center'}}><DeleteOutlined color='dark'style={{cursor:"pointer"}} size={25}  /></Button>
                        </div>
                    </Card>
                    </ConfigProvider>
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
