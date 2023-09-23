import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
import { useLocation } from 'react-router';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import axios from 'axios';

const Eventviewresp = () => {
  const [adminData, setAdminData] = useState([]);
  const Email = Cookies.get('AdminEmail');
  const [activeView, setActiveView] = useState('table');
  const location = JSON.stringify(useLocation());
  const match = location.match(/eventInfo\/(.*?)\/response/i);
  const [isLoading, setIsLoading] = useState(true);
const [hasLoadedData, setHasLoadedData] = useState(false);

useEffect(() => {
  if (Email && isLoading && !hasLoadedData) {
    const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
    const email = bytes.toString(CryptoJS.enc.Utf8);
    
    if (match && match[1]) {
      const EventId = match[1];
      
      axios.get(`http://localhost:8000/SCP/ResponseView.php?email=${email}&EventId=${EventId}`)
        .then(response => {
          const data = response.data;
          if (Array.isArray(data)) {
            const parsedData = data.map(item => ({
              ...item,
              Response: JSON.parse(item.Response.replace(/^"|"$/g, '')),
            }));
            setAdminData(parsedData);
            setHasLoadedData(true); // Mark that data has been loaded
          } else {
            console.error('Data is not an array:', data);
          }
        })
        .catch(error => {
          console.error('An error occurred:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.error('EventId not found in the URL');
    }
  }
}, [Email, match, isLoading, hasLoadedData]);

  return (
    <>
      <div className="row">
        <div className="col-2">
          <Sidebar1 />
        </div>
        
        <div className='right col-10 float-end' style={{overflowX:"scroll"}}>
          
    <h1 className='fs-1 fw-semibold fst-italic mb-5'>Responses:</h1>
          <div className=' nav nav-pills row'>
              <button className={`nav-link col-4 text-center ${activeView === 'table' ? 'active bg-dark text-white ' : 'bg-white text-black'}`} onClick={() => setActiveView('table')}  alt="">
                Table View
              </button>
              <button
                className={`text-center col-4 nav-link ${activeView === 'list' ? 'active  bg-dark text-white' : 'bg-white text-black'}`}
                onClick={() => setActiveView('list')}
                href="#"
              >
                List View
              </button>
              <button
                className={`text-center col-4 nav-link ${activeView === 'form' ? 'active  bg-dark text-white' : 'bg-white text-black'}`}
                onClick={() => setActiveView('form')}
                href="#"
              >
                Form View
              </button>
          </div>
          {activeView === 'table' && (
            <div className='table-responsive w-100'>
              <table className='table table-info table-hover my-5'>
                <thead>
                  <tr className='text-nowrap'>
                    <th>S.no</th>
                    <th>Email</th>
                    {adminData.length > 0 &&
                      Object.keys(adminData[0].Response).map((key, index) => (
                        <th key={index}>{key}</th>
                      ))}
                    <th>TimeStop</th>
                  </tr>
                </thead>
                <tbody>
                  {adminData.map((item, index) => (
                    <tr className='text-nowrap' key={index}>
                      <td>{index+1}</td>
                      <td>{item.Email}</td>
                      {Object.values(item.Response).map((value, subIndex) => (
                        <td key={subIndex}>{value}</td>
                      ))}
                      <td>{item.TimeStop}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {activeView === 'list' && (
            <div className=''>
              {adminData.length > 0 && (
                <div className='bg-info py-3'>
                    {Object.keys(adminData[0].Response).map((key, index) => (
                    <div className='bg-white rounded m-3 m-md-5 rounded flex-sm-wrap py-3' key={index}>
                  <h2>{key === 'Email' ? 'Email:' : key + ':'}</h2>
                
                <div className='table-responsive w-100'>
                <table className='table table-hover table-bordered my-5'>
                <tbody>
                {adminData.map((item, subIndex) => (
                  
                  <tr className='text-nowrap' key={subIndex}>
                  <td>{item.Email}</td>
                  <td>{item.Response[key]}</td>
                  </tr>
                  ))}
                  
                  </tbody>
                  </table>
                </div>
              </div>
            ))}
            </div>
            )}

            </div>
          )}
          {activeView === 'form' && (
              <div className=''>
              {adminData.length > 0 && (
                <div className='bg-info py-3'>
                  {adminData.map((item, index) => (
                    <div className='bg-white rounded m-3 m-md-5 rounded flex-sm-wrap py-3 table-responsive' key={index}>
                      <h3>Response{index+1}:</h3>
                      <table className='table table-hover table-white'>
                        <tbody>
                      {Object.keys(item.Response).map((key, subIndex) => (
                        <tr key={subIndex}>
                          <td>{key}</td>
                          <td>{item.Response[key]}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>TimeStop</td>
                        <td>{item.TimeStop}</td>
                        </tr>
                        </tbody>
                        </table>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          )}
        </div>
      </div>
    </>
  );
};

export default Eventviewresp;
