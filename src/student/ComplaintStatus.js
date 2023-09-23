import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
const ComplaintStatus= () => {
      return (
        <>
        <div className='row'>
                  <div className='sidebar1 col-2 '>
                    <Sidebar1/>
                  </div>
                  <div className='right col-10 float-end'>
                  <h1>Status of Complaint which visible to students</h1>
                  </div>
            
        </div>
        </>
      );
   }
   
export default ComplaintStatus;