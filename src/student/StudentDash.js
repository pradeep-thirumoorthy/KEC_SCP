import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';

const StudentDash = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Display content after 1 second

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className='row'>
        
          
            <div className='sidebar1 col-2'>
              <Sidebar1 />
            </div>
            {isLoading ? (
            <div className='right col-10' style={{marginTop:"25%",marginLeft:"50%"}}>
              <h3 style={{fontFamily:"monospace"}}>Loading...</h3>
            </div>
        ) : (
          <>
            <div className='right col-10'>
              <h1>Student Dash</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default StudentDash;
