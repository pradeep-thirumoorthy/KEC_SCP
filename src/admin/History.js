import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
const History= () => {
      return (
        <>
        <div className='row'>
                  <div className='sidebar1 col-2 '>
                    <Sidebar1/>
                  </div>
                  <div className='right col-10 float-end'>
                  <h1>History page</h1>
                  </div>
            
        </div>
        </>
      );
   }
export default History;