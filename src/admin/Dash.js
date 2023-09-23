import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Doughnut from './doughnut';
import LineChart from './Linechart';
import Sidebar1 from './Sidebar1.js';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ShimmerThumbnail, ShimmerTitle } from 'react-shimmer-effects';

const MAX_TIMEOUT = 10000;

const Admindash = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state variable

  const Email = Cookies.get('AdminEmail');
  const linec = {
    height: '300px',
    overflowX: 'scroll',
  };
  const douc = {
    height: '300px',
    overflowX: 'scroll',
  };

  useEffect(() => {
    if (Email) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);

      axios.post('http://localhost:8000/SCP/dash.php', `email=${encodeURIComponent(email)}`)
        .then(response => {
          const data = response.data;
          if (data) {
            setAdminData(data);
            setIsDataLoaded(true);
            setIsLoading(false);
        setShowTimeoutMessage(true); // Data is loaded successfully
          }
        })
        .catch(error => {
          setShowTimeoutMessage(true);
          console.error('Error fetching admin data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      const timeoutId = setTimeout(() => {
        setIsLoading(false);
        setShowTimeoutMessage(true);
      }, MAX_TIMEOUT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [Email]);

  if (isLoading) {
    return (
      <>
        <div className='row'>
          <div className='sidebar1 col-2'>
            <Sidebar1 />
          </div>
          <div className='right col-10 row'>
            <div className='col-12 mt-1'><ShimmerThumbnail height={100} /></div>
            <ShimmerTitle />
            <div className='col-8'><ShimmerThumbnail /></div>
            <div className='col-4'><ShimmerThumbnail /></div>
            <ShimmerTitle />
            <div className='col-12'><ShimmerThumbnail /></div>
            <ShimmerTitle />
            <div className='col-12'><ShimmerThumbnail /></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className='row'>
        <div className='sidebar1 col-2'>
          <Sidebar1 />
        </div>
        <div className='right col-10 float-end'>
          {showTimeoutMessage && !isDataLoaded ? (
            <div className="alert alert-danger" role="alert">
              Unable to fetch data. Please check your connection and try again.
            </div>
          ) : (
            <>
              <div className=" bg-light row ">
                <div className="row border-bottom pb-3">
                  <div className="col-lg-12">
                    <span className="fs-2 fw-bolder fst-italic"> Welcome, {adminData.Name}</span><br />
                    <span className="text-black-50 fst-italic no-warp">Here is your complaints arrived</span>
                  </div>
                </div>
              </div>
              <div className="content row">
                <div className="row row-gap-5" data-bs-spy="scroll" data-bs-target="#home-collapse" data-bs-offset="0">
                  <h1 id="overview">Overview</h1>
                  <div className="col-lg-7  bg-light mx-3 mb-3" style={linec}><LineChart /></div>
                  <div className="col-lg-4  bg-light mb-3 mx-3 text-center" style={douc}><Doughnut />
                    <script src="bar-chart.js"></script>
                  </div>
                  <h1 id="updates">Updates</h1>
                  <div className="col-lg-12 mx-3 bg-light my-3 " style={linec}>sdubdshffbjhsbdakdhj ahs s </div>
                  <h1 id="reports">Complaints</h1>
                  <div className="col-lg-12 mx-3 bg-light my-3" style={linec}>wjld sjdhcscsd hs cdcdfdc dhdg</div>
                  <div className="table"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Admindash;
