import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
const Updates= () => {
      return (
        <>
          <div className='sidebar1 col-2 '>
              <Sidebar1/>
          </div>
          <div className='right col-10 float-end'>
              <h1>All Complaints View Page(including solved,unsolved)</h1>
          </div>
        </>
      );
   }
export default Updates;