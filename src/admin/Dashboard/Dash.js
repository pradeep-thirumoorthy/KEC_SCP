import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Doughnut from './doughnut';
import LineChart from './Linechart';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Button, Calendar, Flex, Popconfirm, Popover, Tooltip, Typography, theme } from 'antd';
import { useNavigate } from 'react-router-dom';
import Link from 'antd/es/typography/Link';
const MAX_TIMEOUT = 10000;
const onPanelChange = (value, mode) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};
const Dash = () => {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false); // New state variable
  const navigate=useNavigate();
  const Email = sessionStorage.getItem('AdminEmail');
  const linec = {
    height: '300px',
    overflowX: 'scroll',
  };
  const douc = {
    height: '300px',
    overflowX: 'scroll',
  };
  const [CalendarData,setCalendarData]=useState('');
  useEffect(() => {
    if (Email) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);
      
      axios.post('http://192.168.77.250:8000/dash.php', `email=${encodeURIComponent(email)}`)
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
        const params = {
          email: email,
        };
        axios.get('http://192.168.77.250:8000/minicalendar.php', {params})
        .then(response => {
          const data = response.data.data;
          if (data) {
            setCalendarData(data);
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

  const onSelect = (newValue) => {
    const value = newValue.format('YYYY-MM-DD');
    let res = 0; // Change from const to let for reassignment

    if (CalendarData[value]) {
        res = CalendarData[value]; // Corrected object reference to CalendarData
    }

    setSelectedDate(newValue.format('YYYY-MM-DD') + " (" + res+" complaints)");
}

  const [selectedDate,setSelectedDate]=useState('');
  
  return (
            <>
              <div className=" row ">
                <div className="row border-bottom pb-3">
                  <div className="col-lg-12">
                    <Typography className=""> Welcome, {adminData.Name}</Typography><br />
                  </div>
                </div>
              </div>
              <div className="content row">
                <div className="row row-gap-5" data-bs-spy="scroll" data-bs-target="#home-collapse" data-bs-offset="0">
                  <Typography.Title level={1} id="overview">Overview</Typography.Title>
                  
                  <div className="col-lg-6 mx-3 mb-3"><LineChart />
                  </div>
                  <div className="col-lg-5  mb-3 mx-3 text-center"><Doughnut />
                    <script src="bar-chart.js"></script>
                  </div>
                  <Flex align='center' justify='space-between'>
                  <Typography.Title level={1} id="updates">Updates</Typography.Title>
                  <Link href='/admin/dashboard/Calendar'>see Calendar</Link>
                  </Flex>
                  <div style={wrapperStyle}>
                  <Tooltip title={selectedDate}>
                    <div>
                  <Calendar fullscreen={false} onSelect={onSelect}/>
                  </div>
                  </Tooltip>
                  </div>
                  <Typography.Title level={1} id="reports">Complaints</Typography.Title>
                  <div className="col-lg-12 mx-3  my-3" style={linec}>wjld sjdhcscsd hs cdcdfdc dhdg</div>
                  <div className="table"></div>
                </div>
              </div>
            </>
  );
};

export default Dash;
