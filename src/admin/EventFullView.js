import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
import { FiCircle, FiPlusSquare } from 'react-icons/fi';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ShimmerSectionHeader, ShimmerTitle, ShimmerCategoryList } from 'react-shimmer-effects';
import CopyToClipboard from './CopyToClipboard';
import { useNavigate } from 'react-router';

const MAX_TIMEOUT = 10000;

const FullEvents = () => {
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [EventData, setEventData] = useState({});
  
  const Email = Cookies.get('AdminEmail');
  const response=(id)=>{
    navigate("/admin/Events/eventInfo/"+id+"/response");
  }
  const modify=(id)=>{
    navigate("/admin/Events/eventInfo/"+id+"/modify");
  }
  useEffect(() => {
    if (Email) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);
      const timeoutId = setTimeout(() => {
        setIsLoading(false); // Handle timeout
      }, MAX_TIMEOUT);

      // Make a request using Axios to fetch admin's Name based on the decrypted email
      axios.get(`http://localhost:8000/SCP/EventInfoAdmin.php?email=${email}`)
        .then(response => {
          clearTimeout(timeoutId);
          const data = response.data.data;
          if (data) {
            setEventData(data);
          }
        })
        .catch(error => {
          console.error('Error fetching admin data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [Email]);

  return (
    <>
      <div className='row'>
        <div className='sidebar1 col-2 '>
          <Sidebar1 />
        </div>
        {isLoading ? (
          <div className='right col-10'>
            <ShimmerSectionHeader subTitle={false} center className="mb-3" />
            <ShimmerTitle />
            <ShimmerCategoryList items={4} />
          </div>
        ) : (
          <div className='right col-10 float-end'>
            <div className=" bg-light row ">
              <div className="row border-bottom pb-3">
                <div className="col-lg-10">
                  <span className="fs-2 fw-bolder fst-italic"> Events</span><br></br>
                  <span className="text-black-50 fst-italic no-warp">Overview of your events</span>
                </div>
                <div className='col-lg-2 align-self-center'>
                  <a className='btn text-black' href='/admin/Events/EventFormCreation'><FiPlusSquare size={30} />New Events</a>
                </div>
              </div>
            </div>
            <div className='row'>
              <span className='fs-2 fw-bolder fst-italic'>Your Events:</span>
              <div>
                <div className=' rounded-3 table-responsive m-2'>
                        <table className=' table table-info table-bordered'>
                          <thead>
                          <tr>
                            <td>S.no</td>
                            <td>Title</td>
                            <td>Limit</td>
                            <td>Last Date</td>
                            <td>Status</td>
                            <td>Student Link</td>
                            <td>Modify</td>
                            <td>Response</td>
                            </tr>
                          </thead>
                          <tbody>
                          {EventData.reverse().map((item, index) => (
  <tr className='text-nowrap' key={index}>
    <td className='p-5'>{index + 1}</td>
    <td className='p-5'>{item.Title}</td>
    <td className='p-5'>{item.Limits}</td>
    <td className='p-5'>{JSON.stringify(item.IntervalTime)}</td>
    <td className='p-5'>
      {item.Status === 'open' ? (
        <FiCircle color='green' fill='green' />
      ) : (
        <FiCircle color='red' fill='red' />
      )}
      {item.Status}
    </td>
    <td>
      <CopyToClipboard
        className="text-center w-100"
        textToCopy={"http://localhost:3000/student/events/EventInfo/" + item.event_id}
      ></CopyToClipboard>
    </td>
    <td className='p-5' style={{ cursor: "pointer" }} onClick={() => modify(item.event_id)}>
      Modify...
    </td>
    <td className='p-5' style={{ cursor: "pointer" }} onClick={() => response(item.event_id)}>
      View
    </td>
  </tr>
))}
                          </tbody>
                        </table>
                  </div>
                </div>
              </div>
            </div>
        )}

      </div>
    </>
  );
}

export default FullEvents;
