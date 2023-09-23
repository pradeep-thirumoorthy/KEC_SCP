import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1.js';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ShimmerThumbnail, ShimmerTable } from 'react-shimmer-effects';

const MAX_TIMEOUT = 10000;

const Admindash = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const Email = Cookies.get('AdminEmail');

  useEffect(() => {
    if (Email) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);

      axios.post('http://localhost:8000/SCP/Admin_info.php', `email=${encodeURIComponent(email)}`)
        .then(response => {
          const data = response.data;
          if (data) {
            setAdminData(data);
            setIsDataLoaded(true);
            clearTimeout(timeoutId);
          }
        })
        .catch(error => {
          setShowTimeoutMessage(true);
          console.error('Error fetching admin data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      const timeoutId = setTimeout(() => {
        setShowTimeoutMessage(true);
        setIsLoading(false);
      }, MAX_TIMEOUT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [Email]);

  if (isLoading) {
    return (
      <>
      <div className='row'>
        <div className='sidebar1 col-2'>
          <Sidebar1 />
        </div>
        <div className='right col-10 float-end'>
          <ShimmerThumbnail height={150}/>
          <ShimmerTable row={7} col={2}/>
        </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='row'>
        <div className='sidebar1 col-2'>
          <Sidebar1 />
        </div>
        <div className='right col-md-10 col-sm-8 float-end'>
          {showTimeoutMessage && !isDataLoaded && !isLoading ? (
            <div className="alert alert-danger" role="alert">
              Unable to fetch data. Please check your connection and try again.
            </div>
          ) : (
            <div className=' table-responsive'>
              <div className='p-5 fs-2 text-center'>Personal Info</div>
              <table className='table table-hover '>
                <tbody>
                  <tr>
                    <td className='fs-3'>Name</td>
                    <td className='fs-3'>{adminData.Name}</td>
                  </tr>
                  <tr>
                    <td className='fs-3'>Designation</td>
                    <td className='fs-3'>
                      {adminData.Designation}
                    </td>
                  </tr>
                  
                  <tr>
                    <td className='fs-3'>Phone</td>
                    <td className='fs-3'>{adminData.PhoneNo}</td>
                  </tr>
                  <tr>
                    <td className='fs-3'>Email</td>
                    <td className='fs-3'>{adminData.Email}</td>
                  </tr>
                  <tr>
                    <td className='fs-3'>Department</td>
                    <td className='fs-3'>{adminData.Department}</td>
                  </tr>
                  <tr>
                    <td className='fs-3'>Roll</td>
                    <td className='fs-3'>
                      {adminData.Designation === 'creator' && (
                        <div>
                          {adminData.Roll ? (
                            <div>
                              {Object.entries(JSON.parse(adminData.Roll)).map(([key, value]) => (
                                <div key={key}>
                                  <strong>{key}:</strong> {value}
                                </div>
                              ))}
                            </div>
                          ) : (
                            'Data not available'
                          )}
                        </div>
                      )}
                      {adminData.Designation === 'Assistant Professor' && 'Class Advisor:  '}
                      {adminData.Designation === 'Assistant Professor[SRG]' &&'Position:  '}
                      {adminData.Designation === 'Assistant Professor[SLG]' &&'Position:  '}
                      {adminData.Designation === 'Associate Professor' &&'Position:  '}
                      {adminData.Designation === 'Professor' && 'Year Incharge (Batch): '}
                      {adminData.Designation === 'Professor,Head' && 'Head of '+adminData.Department}
                      <div className='w-100 border border-2'>
                      {adminData.Designation !== 'Professor,Head' && adminData.Roll}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              
            </div>
            
          )}
          <div className='text-info text-center fs-4'>Please Contact Administrator to change the roll.<a href='tel:9842752513'>9842752513</a></div>
        </div>
      </div>
    </>
  );
};

export default Admindash;
