import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { ConfigProvider, Descriptions, List, Typography } from 'antd';

const MAX_TIMEOUT = 10000;

const PersonalInfo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState({});
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const Email = sessionStorage.getItem('AdminEmail');

  useEffect(() => {
    if (Email) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);

      axios
        .post('http://192.168.77.250:8000/Admin_info.php', `email=${encodeURIComponent(email)}`)
        .then((response) => {
          const data = response.data;
          if (data) {
            setAdminData(data);
            setIsDataLoaded(true);
            clearTimeout(timeoutId);
          }
        })
        .catch((error) => {
          setShowTimeoutMessage(true);
          console.error('Error fetching admin data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });

      const timeoutId = setTimeout(() => {
        setShowTimeoutMessage(true);
        setIsLoading(false);
      }, MAX_TIMEOUT);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [Email]);

  if (isLoading) {
    return (
      <>
      nothing
      </>
    );
  }

  return (
    <>
      <div className="">
        {showTimeoutMessage && !isDataLoaded && !isLoading ? (
          <div className="alert alert-danger" role="alert">
            Unable to fetch data. Please check your connection and try again.
          </div>
        ) : (
          <div className="table-responsive">
            <Typography.Title className="p-5 fs-2 text-center">Personal Info</Typography.Title>
            
            <Descriptions title="User Info" bordered column={{ xs: 1, sm: 2, md: 3, lg: 3 }}>
              <Descriptions.Item label="Name">{adminData.adminInfo.Name}</Descriptions.Item>
              <Descriptions.Item label="Designation">{adminData.adminInfo.Designation}</Descriptions.Item>
              <Descriptions.Item label="Phone">{adminData.adminInfo.PhoneNo}</Descriptions.Item>
              <Descriptions.Item label="Email">{adminData.adminInfo.Email}</Descriptions.Item>
              <Descriptions.Item label="Department">{adminData.adminInfo.Department}</Descriptions.Item>
            </Descriptions>
            <Descriptions title="Subject Details" bordered column={{ xs: 1, sm: 2, md: 3, lg: 3 }}>
              {adminData.subjectData.map((subject, index) => (
                <>
                <Descriptions.Item key={index} label="Class">
                  {subject.Class}
                </Descriptions.Item>
                <Descriptions.Item key={index} label="Batch">
                  {subject.Batch}
                </Descriptions.Item>
                <Descriptions.Item key={index} label="Roll">
                  <List
                    dataSource={subject.Roll}
                    renderItem={(roll, i) => (
                      <List.Item key={i}>{roll}</List.Item>
                    )}
                  />
                </Descriptions.Item>
                </>
              ))}
              </Descriptions>
          </div>
        )}
      </div>
    </>
  );
};

export default PersonalInfo;
