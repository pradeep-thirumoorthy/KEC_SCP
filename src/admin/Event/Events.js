import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FiCircle} from 'react-icons/fi';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Table, Button } from 'antd';

const MAX_TIMEOUT = 10000;

const Events = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [EventData, setEventData] = useState([]);
  const Email = Cookies.get('AdminEmail');

  useEffect(() => {
    if (Email) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);
      const timeoutId = setTimeout(() => {
        setIsLoading(false); // Handle timeout
      }, MAX_TIMEOUT);

      // Make a request using Axios to fetch admin's Name based on the decrypted email
      axios
        .get(`http://localhost:8000/SCP/EventInfoAdmin.php?email=${email}`)
        .then((response) => {
          clearTimeout(timeoutId);
          const data = response.data.data;
          if (data) {
            setEventData(data);
          }
        })
        .catch((error) => {
          console.error('Error fetching admin data:', error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [Email]);

  const columns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: 'Limit',
      dataIndex: 'Limits',
      key: 'Limits',
    },
    {
      
      title: 'Start Date',
      dataIndex: 'StartDate',
      key: 'StartDate',
      render: (text) => (text),
    },
    {
      title: 'Last Date',
      dataIndex: 'IntervalTime',
      key: 'IntervalTime',
      render: (text) => (text),
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      render: (text, record) => (
        <>
          {record.Status === 'open' ? (
            <FiCircle color='green' fill='green' />
          ) : (
            <FiCircle color='red' fill='red' />
          )}
          {text}
        </>
      ),
    },
  ];

  const mappedTableData = EventData.slice(-3).map((item, index) => ({
    key: index,
    sno: 3-index,
    
    Limits: item.Limits,
    StartDate:item.Date,
    IntervalTime: item.IntervalTime,
    Status: item.Status,
  })).reverse();

  return (
    <>
      {isLoading ? (
        <div className=''>
          {/* Shimmer loading content */}
        </div>
      ) : (
        <div className=''>
          <div className='bg-light row'>
            {/* Your header */}
          </div>
          <div className='row'>
            <span className='fs-2 fw-bolder fst-italic'>Your Events:</span>
            <div>
              <div className='rounded-3 m-2'>
                <Table scroll={{x:1000}}
                  columns={columns}
                  dataSource={mappedTableData}
                  bordered
                  pagination={false}
                />
                <a href='/admin/Events/Fullview'>See More</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Events;
