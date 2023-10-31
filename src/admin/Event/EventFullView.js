import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FiCircle, FiPlusSquare } from 'react-icons/fi';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import Cookies from 'js-cookie';
import CopyToClipboard from '../CopyToClipboard';
import { useNavigate } from 'react-router';

import { Table, Button} from 'antd';
const MAX_TIMEOUT = 10000;

const FullEvents = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [EventData, setEventData] = useState([]);
  const Email = Cookies.get('AdminEmail');
  const response = (id) => {
    navigate("/admin/Events/eventInfo/" + id + "/response");
  };

  const modify = (id) => {
    navigate("/admin/Events/eventInfo/" + id + "/modify");
  };

  useEffect(() => {
    if (Email) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);
      const timeoutId = setTimeout(() => {
        setIsLoading(false); // Handle timeout
      }, MAX_TIMEOUT);

      // Make a request using Axios to fetch admin's Name based on the decrypted email
      axios.get(`http://192.168.157.250:8000/SCP/EventInfoAdmin.php?email=${email}`)
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
    {
      title: 'Student Link',
      key: 'studentLink',
      render: (_, record) => (
        <CopyToClipboard
          className="text-center w-100"
          textToCopy={"http://192.168.157.250:3000/student/events/EventInfo/" + record.event_id}
        ></CopyToClipboard>
      ),
    },
    {
      title: 'Modify',
      key: 'modify',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => modify(record.event_id)}
          style={{ cursor: "pointer" }}
        >
          Modify...
        </Button>
      ),
    },
    {
      title: 'Response',
      key: 'response',
      render: (_, record) => (
        <Button
          type="link"
          onClick={() => response(record.event_id)}
          style={{ cursor: "pointer" }}
        >
          View
        </Button>
      ),
    },
  ];

  const mappedTableData = EventData.map((item, index) => ({
    key: index,
    sno: index + 1,
    
    Limits: item.Limits,
    StartDate:item.Date,
    IntervalTime: item.IntervalTime,
    Status: item.Status,
    event_id: item.event_id, // Assuming 'event_id' is the key in your data
  }));

  return (
    <>
      {isLoading ? (
        <div className='right col-10'>
          none
        </div>
      ) : (
        <div>
          <div className=" bg-light row ">
            <div className="border-bottom pb-3 d-float">
              <div className="float-start">
                <span className="fs-2 fw-bolder fst-italic"> Events</span><br></br>
                <span className="text-black-50 fst-italic no-warp">Overview of your events</span>
              </div>
              <div className='float-end'>
                <a className='btn text-black' href='/admin/Events/EventFormCreation'><FiPlusSquare size={30} />New Events</a>
              </div>
            </div>
          </div>
          <div className='row'>
            <span className='fs-2 fw-bolder fst-italic'>Your Events:</span>
            <div>
              <div className=' rounded-3  m-2'>
                <Table
                  columns={columns}
                  dataSource={mappedTableData}
                  scroll={{ x: 150 }}
                  bordered
                  pagination={false}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default FullEvents;
