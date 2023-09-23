import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";

import { RxCross2  } from "react-icons/rx";
import { TbArrowForwardUp } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Sidebar1 from "./Sidebar1";

const Forward = () => {
  const location = useLocation();
  const { info } = location.state || {};

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  return (
    (info == null) ? (
      <>
        <div className='sidebar1 col-2 '>
            <Sidebar1/>
        </div>
        <div className='right col-10 float-end'>
            The Complaint is not has been Chosen
        </div>
      </>
    ) : (
        <>
        <div className='sidebar1 col-2 '>
            <Sidebar1/>
        </div>
        <div className='right col-10 float-end'>
        <div className="vh-100">
        <div className=" bg-light row ">
                <div className="row border-bottom pb-3">
                  <div className="col-lg-12">
                    <span className="fs-2 fw-bolder fst-italic">Complaint Info</span><br />
                    <span className="text-black-50 fst-italic no-warp">Here is the Info of the complaint arrived</span>
                  </div>
                </div>
              </div>
        <div className="d-flex justify-content-center w-100">
          <div className="d-flex justify-content-center w-75 mx-5 h-50" id="form">
            <table className="table table-hover table-bordered border border-3 my-5">
              <tbody>
                <tr>
                  <td>
                    <h5> Name:</h5>
                  </td>
                  <td>
                    <h5> {info.Name} </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5> RollNo:</h5>
                  </td>
                  <td>
                    <h5> {info.Roll_No} </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5> Email:</h5>
                  </td>
                  <td>
                    <h5> {info.Email} </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5> Type:</h5>
                  </td>
                  <td>
                    <h5> {info.Type} </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5>Contact No:</h5>
                  </td>
                  <td>
                    <h5> {info.contactno} </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5> Subject:</h5>
                  </td>
                  <td>
                    <h5> {info.Subject} </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5> Description:</h5>
                  </td>
                  <td>
                    <h5> {info.Description} </h5>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5> Status:</h5>
                  </td>
                  <td>
                    <h5> {info.Status} </h5>
                  </td>
                </tr>
                {/* Rest of your table rows */}
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center my-5" id='access'>
          <div className="row h-auto">
            <div className="col-4">
              <button className="btn btn-success d-flex align-items-center"><FiCheck/>Accept</button>
            </div>
            <div className="col-4">
              <button className="btn btn-info d-flex align-items-center" onClick={togglePopup}><TbArrowForwardUp/>Forward</button>
              {isOpen && (
                <Popup open={isOpen} onClose={togglePopup} modal>
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
                            <option value="">NiL</option>
                            <option value="2024">Associate Professor</option>
                            <option value="2025">Professor</option>
                            <option value="2026">Assistant Professor[SLG]</option>
                            <option value="2026">Assistant Professor[SRG]</option>
                          </select>

                          <div className='fs-3'>Faculty:</div>
                          <select className="form-select form-select-lg mb-3">
                            <option value="">NiL</option>
                            <option value="2024">2024</option>
                            {/* Add more options here */}
                          </select>
                        </div>
                        <div className=''>
                          <button className='btn btn-info float-end me-4'>Forward</button>
                        </div>
                      </div>
                    </div>
                  )}
                </Popup>
              )}
            </div>
            <div className="col-4">
              <button className="btn btn-danger d-flex align-items-center" ><RxCross2/>Reject</button>
            </div>
            
          </div>
        </div>
      </div>
        </div>
      </>
      
    )
  );
}

export default Forward;