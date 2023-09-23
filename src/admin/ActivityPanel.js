import React, { useState } from "react";
import { FiArrowUp, FiCheck } from "react-icons/fi";

import { RxCross2  } from "react-icons/rx";
import { TbArrowForwardUp } from "react-icons/tb";
import { useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Sidebar1 from "./Sidebar1";

const ActivityPanel = () => {
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
                    <span className="fs-2 fw-bolder fst-italic">Activity Panel</span><br />
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
                    
              </tbody>
            </table>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center w-100">
            <h5><div>Update:</div><div><textarea rows={2} cols={40} maxLength={50}/></div></h5></div>
        <div className="d-flex justify-content-center my-5" id='access'>
          <div className="row h-auto">
            <div className="col-6">
              <button className="btn btn-info d-flex align-items-center"><FiArrowUp/>Update</button>
            </div>
            <div className="col-6">
              <button className="btn btn-success d-flex align-items-center" ><FiCheck/>Complete</button>
            </div>
            
          </div>
        </div>
      </div>
        </div>
      </>
      
    )
  );
}

export default ActivityPanel;