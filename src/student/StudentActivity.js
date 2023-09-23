import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
import ProgressSteps from './progressbar';
const StudentActivity= () => {
      return (
        <>
        <div className='sidebar1 col-2 '>
              <Sidebar1/>
          </div>
          <div className='right col-md-10 col-xl-10 col-sm-9 col-9 float-end' >
              <h1>Activity</h1>
              <ProgressSteps/>
          </div>
        </>
      );
   }
export default StudentActivity;