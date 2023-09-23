import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Typewriter from 'typewriter-effect';
import {FcBusinessman} from 'react-icons/fc';
import {FaTelegram, FaUnlock, FaUnlockAlt} from 'react-icons/fa';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
const Home= () => {

  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentDate.toLocaleTimeString();
  return (
    <>
      <div className='row bg-secondary bg-opacity-10'>
        <div>
      <Popup trigger={<button className="btn btn-info"> Open Modal </button>} modal>
      {close => (
      <div className=''>
      <button className="close bg-white border-0 float-end fs-2" onClick={close}>
          &times;
        </button>
        <div className='w-100 '>
          <div className='w-100 fs-1 text-center'>Forward Complaint</div>
          <div className=''>
          <div className='fs-3'>Designation:</div>
          <select className="form-select form-select-lg mb-3">
                                <option  value="">NiL</option>
                                <option value="2024">Associate Professor</option>
                                <option value="2025">Professor</option>
                                <option value="2026">Assistant Professor[SLG]</option>
                                <option value="2026">Assistant Professor[SRG]</option>
              </select>
              
          <div className='fs-3'>Faculty:</div>
              <select className="form-select form-select-lg mb-3">
                                <option  value="">NiL</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
              </select>
          </div>
          <div className=''>
            <button className='btn btn-info float-end me-4'>Forward</button>
          </div>
        </div>
        </div>
      )}
      </Popup>
      </div>
            <h3 ><Typewriter options={{autoStart:true,loop:true,delay:30,strings:["SCS...","Student Complaint System"]}}/></h3>
              
              <div className='time bg-success bg-opacity-50' style={{height:"200px"}}>
                
                  
                  <div className='content text-right d-flex justify-content-end mt-5'>
                    
                    <p style={{color:"black",fontFamily:"sans-serif",fontSize:"20px"}}>{currentDate.toDateString()},{formattedTime}</p>
                  </div>
              </div>
              <div className='text col-lg-12'>
                  <h3 style={{fontFamily:"sans-serif",fontWeight:"bolder",color:'black'}}>How to Complain?</h3>
              </div>
              <div className='col-lg-12 row'>
                    <div className="col-sm-12 col-md-4 border">
                        <div className="quotes blg text-center">
                          <h3 style={{color:"black"}}>First</h3>
                            <p>You can complain directly with us you have been dealing with.  Complaints are often sorted out immediately this way.</p>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-4">
                        <div className="quotes blg text-center">
                          <h3 style={{color:"black"}}>Second</h3>
                            <p>If you don’t know who to contact, or you have a name but no telephone number, then call our enquiries team on 18XX XXX XXX</p>
                        </div>
                      </div>

                      <div className="col-sm-12 col-md-4">
                        <div className="quotes blg text-center">
                          <h3 style={{color:"black"}}>Third</h3>
                            <p>The Best way to complain you can use our online complaints form.</p>
                        </div>
                      </div>

                     

              </div>
              <div className="col-lg-12 text-center ">
                        <p style={{fontFamily:"sans-serif",fontSize:"20px"}}>Your complaint will be recorded and dealt with by the most appropriate team or person</p>
              </div>
              <div className='col-lg-12'>
                    <div className='container'>
                             <h3 className='text-left mt-4'>Heading:Information from admin</h3>
                             <h4 className='mb-4'>Message:........</h4><br></br>
                             <h4 className='mt-4'>Posted By:............</h4>
                    </div>
              </div>
              <div className='col-12 row text-center'>
                <div className='col-6 col-md-3 fs-3'><a className='text-black' href='/admin/login'><FaUnlockAlt className='mt-3' color='red' strokeWidth={0.5} size={100} /><br></br>Adin</a></div>
                <div className='col-6 col-md-3 fs-3'><a className='text-black' href='/student/login'><FaUnlock className='mt-3' color='green' strokeWidth={0.5} size={100} /><br></br>Login</a></div>
                <div className='col-6 col-md-3 fs-3'><a className='text-black' href=''><FcBusinessman className='m-2' strokeWidth={0.5} size={100} /><br></br>Verified</a></div>
                <div className='col-6 col-md-3 fs-3'><a className='text-black' href=''><FaTelegram className='m-2' color='green' strokeWidth={0.5} size={100} /><br></br>Complaint</a></div>
              </div>
              
            <div className='col-12 w-100 row text-center'>
                <div className='col-lg-6 bg-opacity-75 my-5'>
                  <div className='m-5 bg-warning p-3 border border-2 border-dark  ' style={{borderRadius:'30px'}}>
                    <div className=' bg-white bg-opacity-50 border-2 border border-white  p-5' style={{borderRadius:'30px'}}>
                          <h1 className='text-white'>Admin Login</h1>
                          <p className='fs-3'>Are you a Admin??<br></br>To access your account panel,please proceed to our secure login page</p>
                          <a className='btn btn-warning fs-3' href='/admin/login'>Login</a>
                    </div>
                  </div>
                </div>
                <div className='col-lg-6 bg-opacity-75 p-5 my-5'>
                  <div className='m-5 bg-success p-3 border border-2 border-dark ' style={{borderRadius:'30px'}}>
                    <div className=' bg-white bg-opacity-50 border-2 border border-white p-5' style={{borderRadius:'30px'}}>
                          <h1 className='text-white' >Student Login</h1>
                          <p className='fs-3'>Are you a Student??<br></br>To access your account panel,please proceed to our secure login page</p>
                          <a className='btn btn-success fs-3' href='/Student/login'>Login</a>
                    </div>
                  </div>
                </div>
            </div>
            </div>
            <div >
            </div>

    </>
  );
};
export default Home;