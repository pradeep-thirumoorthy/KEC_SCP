import React, { useState, useEffect } from 'react';
import Doughnut from './doughnut';
import LineChart from './Linechart';
import axios from 'axios';
import { Calendar, Col,Descriptions,Popover,Row,Typography } from 'antd';
import Link from 'antd/es/typography/Link';
import { getEmailFromSession } from '../EmailRetrieval';
const Dash = () => {
  const [adminData, setAdminData] = useState({});
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
  }, []);

  const onSelect = (newValue) => {
    const value = newValue.format('YYYY-MM-DD');
    let res = 0;

    if (CalendarData[value]) {
        res = CalendarData[value];
    }

    setSelectedDate(newValue.format('YYYY-MM-DD') + " (" + res+" complaints)");
}

  const [selectedDate,setSelectedDate]=useState('');
  
  return (
    <>
    <Row>
      <Row>
        <Col>
          <Typography.Title>Welcome, {adminData.Name}</Typography.Title>
        </Col>
      </Row>
    </Row>

    <Row>
    <Typography.Title level={1} id="overview">
          Overview
        </Typography.Title>
      <Row data-bs-spy="scroll" data-bs-target="#home-collapse" data-bs-offset="0">
        

        <Col lg={12} md={12} sm={24}>
          <LineChart />
        </Col>
        <Col lg={12} md={12} sm={24}>
          <Doughnut />
        </Col>

        <Col span={24}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Title level={1} id="updates">
                Updates
              </Typography.Title>
            </Col>
            <Col>
              <Link href="/admin/dashboard/Calendar">See Calendar</Link>
            </Col>
          </Row>
        </Col>

        <Col span={24}>
        <Row justify={'space-between'} data-bs-spy="scroll" data-bs-target="#home-collapse" data-bs-offset="0">
          <Col lg={8} md={8} sm={24}>
          <Popover content={selectedDate}>
              <div>
                <Calendar fullscreen={false} onSelect={onSelect} />
              </div>
            </Popover>
          </Col>
          <Col lg={15} md={15} sm={24}>
              <Descriptions title="User Info" bordered column={{ xs: 1, sm: 1, md: 1, lg: 1,xxl:1,xl:1 }}>
              <Descriptions.Item label="Name">{adminData.Name}</Descriptions.Item>
              <Descriptions.Item label="Designation">{adminData.Designation}</Descriptions.Item>
              <Descriptions.Item label="Phone">{adminData.PhoneNo}</Descriptions.Item>
              <Descriptions.Item label="Email">{adminData.Email}</Descriptions.Item>
              <Descriptions.Item label="Department">{adminData.Department}</Descriptions.Item>
            </Descriptions>
          </Col>
          </Row>
        </Col>

        <Col span={24}>
          <Typography.Title level={1} id="reports">
            Complaints
          </Typography.Title>
          <div className="table"></div>
        </Col>
      </Row>
    </Row>
  </>
  );
};

export default Dash;
