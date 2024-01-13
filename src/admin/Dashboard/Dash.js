import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Doughnut from './doughnut';
import LineChart from './Linechart';
import axios from 'axios';
import { Calendar, Flex,Popover,Tooltip, Typography, theme } from 'antd';
import Link from 'antd/es/typography/Link';
import { getEmailFromSession } from '../EmailRetrieval';
const Dash = () => {
  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };
  const [adminData, setAdminData] = useState({});
  const Email = sessionStorage.getItem('AdminEmail');
  const [CalendarData,setCalendarData]=useState('');
  useEffect(() => {
      
      axios.post('http://localhost:8000/Admin/Dashboard/dash.php', `email=${encodeURIComponent(getEmailFromSession())}`)
        .then(response => {
          const data = response.data;
          if (data) {
            setAdminData(data);
          }
        })
        .catch(error => {
          console.error('Error fetching admin data:', error);
        });
        const params = {
          email: getEmailFromSession(),
        };
        axios.get('http://localhost:8000/Admin/Dashboard/minicalendar.php', {params})
        .then(response => {
          const data = response.data.data;
          if (data) {
            setCalendarData(data);
          }
        })
        .catch(error => {
          console.error('Error fetching admin data:', error);
        });
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
                  </div>
                  <Flex align='center' justify='space-between'>
                  <Typography.Title level={1} id="updates">Updates</Typography.Title>
                  <Link href='/admin/dashboard/Calendar'>see Calendar</Link>
                  </Flex>
                  <div style={wrapperStyle}>
                  <Popover title={selectedDate}>
                    <div>
                  <Calendar fullscreen={false} onSelect={onSelect}/>
                  </div>
                  </Popover>
                  </div>
                  <Typography.Title level={1} id="reports">Complaints</Typography.Title>
                  <div className="table"></div>
                </div>
              </div>
            </>
  );
};

export default Dash;
