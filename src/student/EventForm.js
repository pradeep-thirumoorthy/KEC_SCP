import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
const EventForm= () => {
      return (
        <>
        <div className='row'>
                  <div className='sidebar1 col-2 '>
                    <Sidebar1/>
                  </div>
                  <div className='right col-10 float-end'>
                  <div className=" bg-light row ">
                          <div className="row border-bottom pb-3">
                              <div className="col-md-9 col-lg-10">
                                  <span className="fs-2 fw-bolder fst-italic">Events Section:</span><br></br>
                                      <span className="text-black-50 fst-italic no-warp">Event </span>
                                  </div>
                          </div>
                </div>
                  </div>
            
        </div>
        </>
      );
   }
export default EventForm;