import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Doughnut from './doughnut';
import LineChart from './Linechart';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
const MAX_TIMEOUT = 10000;

const Dash = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state variable
  const navigate=useNavigate();
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

      axios.post('http://192.168.157.250:8000/SCP/dash.php', `email=${encodeURIComponent(email)}`)
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
          none
      </>
    );
  }

  return (
    <>
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
                  
                  <div className="col-lg-7  bg-light mx-3 mb-3" style={linec}><LineChart />
                  </div>
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
    </>
  );
};

export default Dash;
