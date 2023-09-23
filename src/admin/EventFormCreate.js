import React, { useState } from 'react';
import {  FiPlusCircle, FiTrash2, FiX } from 'react-icons/fi';
import Sidebar1 from './Sidebar1';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import CryptoJS from 'crypto-js';
const EventFormCreation = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [slimit,setlimit]=useState(1);
    const [generated] = useState(false);
    const [lastDate,setLastDate]=useState(getTodayDate);
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
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    useEffect(() => {
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
                                <input
                                    type={type}
                                    className='ms-3'
                                    disabled
                                />
                                <input
                                    className='option ms-md-3 my-2 bg-transparent border-0 border-bottom w-75 border-dark'
                                    type='text'
                                    value={option.value}
                                    onChange={(e) => updateOptionValue(input.key, optionIndex, e.target.value)} required
                                />
                                {optionIndex !== 0 && (
                                    <button className='outline-0 border-0 bg-transparent' onClick={() => deleteOption(input.key, optionIndex)}>
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
        if (formData.inputs.length !== 0) {
            const limit = (slimit !== '') ? parseInt(slimit) : 1;
            console.log(formData);
            const Email = Cookies.get("AdminEmail");
            const secretKey = "admin-_?info";
            const bytes = CryptoJS.AES.decrypt(Email, secretKey);
            const email = bytes.toString(CryptoJS.enc.Utf8);
            const option = "create";
            console.log(email, formData, limit);
            const formdata = JSON.stringify(formData);
            console.log(formdata);
            axios.post('http://localhost:8000/SCP/EventForm.php', { limit, formdata, email, option, title,lastDate })
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
    setInputs(prevInputs =>
        prevInputs.map(input => {
            if (input.key === inputKey) {
                return { ...input, fading: true };
            }
            return input;
        })
    );

    setTimeout(() => {
        setInputs(prevInputs => prevInputs.filter(input => input.key !== inputKey));
    }, 500);
};


    return (
        <div className='row'>
            <div className='sidebar1 col-2 '>
                <Sidebar1 />
            </div>
            
            <div className="right col-10 ms-1 ps-2 float-end row">
            <div className=" bg-light row ">
            <div className=' float-end position-fixed row bg-secondary py-3 text-light' style={{opacity:'100%'}}>
                    <label className='col-lg-3 d-flex justify-content-center'>
                        <span className='fs-5'>Limit:</span>
                        <input className=' w-50' type='number' value={slimit} onChange={(e) => setlimit(e.target.value)} required max='100' min='1'/>
                    </label>
                    <label className='col-lg-4 d-flex justify-content-center'>
                    <span className='fs-5'>Last Date:</span>
                    <input className='w-50' type='date' value={lastDate} min={getTodayDate()} onChange={handleLastDateChange}/>
                    </label>
                    <label className='col-lg-4 text-center d-flex justify-content-center'>
                        <button className='btn text-black rounded-3 bg-white' onClick={generateInput}>Generate Input</button>
                    </label>
                </div>
                </div>
                <form onSubmit={handleSubmit} className='col-12 float-end pt-5 mt-5 mt-lg-0'>
                    <h1 className='text-center mt-5'>Event Form Creation</h1>
                <div className='px-5 pt-5 py-5 my-5 mx-lg-5 mx-sm-1 bg-info bg-opacity-10 rounded-3'>
                    <div className='form-group'>
                        <label className='form-label fs-3' htmlFor='title'>
                            Title
                        </label>
                        <input
                            type='text'
                            className='form-control fs-3 bg-transparent border-0 border-bottom border-dark rounded-0'
                            id='title'
                            value={title}
                            onChange={(e) => setTitle(e.target.value) } required
                        />
                    </div>
                    <div className="form-outline">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control bg-transparent border-dark"
                            id="description"
                            rows="2"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)} required
                        ></textarea>
                    </div>
                </div>
                {inputs.map(input => (
                    <div key={input.key} className={`px-5 pt-5 py-5 my-5 mx-lg-5 mx-sm-1 bg-info bg-opacity-10 rounded-3 ${input.fading ? 'tag-fade-out' : ''}`}>
                        <div className='row'>
                            <input
                                className='col-lg-6 text-start bg-transparent w-50 border-0 border-bottom border-dark form-control rounded-0'
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
                                className="col-lg-6 text-start bg-transparent w-25 border-0 border-bottom border-dark form-control rounded-0"
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
                    </div>
                ))}
                <div className='w-100'><input className='float-end btn bg-info bg-opacity-25 p-2 m-5' type='submit' value='publish' /></div>
            </form>
            </div>
            
        </div>
    );
}

export default EventFormCreation;
