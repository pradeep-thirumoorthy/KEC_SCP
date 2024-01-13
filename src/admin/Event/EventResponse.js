import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Table, Segmented, Descriptions, ConfigProvider, Empty, Result, Button } from 'antd';
import { getEmailFromSession } from '../EmailRetrieval';

const Eventviewresp = () => {
  const [adminData, setAdminData] = useState([]);
  
  const location = useLocation();
  const { EventId } = location.state || '';
  const [selectedOption, setSelectedOption] = useState('List');
   useEffect(() => {
    console.log(EventId);
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/Admin/Events/EventResponse.php?email=${getEmailFromSession()}&EventId=${EventId}`);
          const data = response.data;
          if (Array.isArray(data) && data.length > 0) {
            const parsedData = data.map((item) => ({
              ...item,
              Response: JSON.parse(item.Response.replace(/^"|"$/g, '')),
            }));
            setAdminData(parsedData);
          } else {
            console.error('Data is not an array or is empty:', data);
          }
        } catch (error) {
          console.error('An error occurred:', error);
        }
    };
  
    fetchData();
  }, []);
  

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  const navigate= useNavigate();
  return (
    <div>
      {EventId === '' ? (
        
        <><Result
        status="error"
        title="No Event Choosen"
        subTitle="Please check and modify the following information before resubmitting."
        extra={[
          <Button type="primary" onClick={()=>{navigate('/admin/Events')}}>
            Go Console
          </Button>
        ]}
      >
      </Result></>
      ) : (
        // If EventId is not an empty string, execute the rest of the return statement
        <div>
          <Segmented
            options={[
              {
                label: 'List',
                value: 'List',
              },
              {
                label: 'Form',
                value: 'Form',
              },
            ]}
            value={selectedOption}
            onChange={handleOptionChange}
          />

          {/* The rest of your return statement based on the value of selectedOption */}
          {selectedOption === 'List' ? (
            <div className="table-responsive w-100">
              
              <Table rowKey={(record) => record.uid}scroll={{x:1000}} style={{height:'100vh'}}
            columns={[
              {
                title: 'S.no',
                dataIndex: 'S.no',
                key: 'S.no',
              },
              ...(adminData.length > 0
                ? Object.keys(adminData[0]?.Response).map((key, index) => ({
                    title: key,
                    dataIndex: `Response.${key}`,
                    key: `Response.${key}`,
                  }))
                : []),
              {
                title: 'Time Record',
                dataIndex: 'Time Record',
                key: 'Time Record',
              },
            ]}
            dataSource={
              adminData.length > 0
                ? adminData.map((item, index) => ({
                    key: index,
                    'S.no': index + 1,
                    ...(adminData.length > 0
                      ? Object.entries(item.Response).reduce((acc, [key, value]) => {
                          acc[`Response.${key}`] = value;
                          return acc;
                        }, {})
                      : {}),
                    'Time Record': item.TimeStop,
                  }))
                : []
            }
            pagination={false}
          />            </div>
          ) : (
            <div>
              <div className=''>
                {/* Your Form content */}
                {adminData.length > 0 ? (
                  <div className=' py-3'>
                    {adminData.map((item, index) => (
                      <div className='bg-white mx-5' key={index}>
                        <ConfigProvider
                          theme={{
                            token: {
                              colorFillAlter: '#f8f8f8',
                            },
                          }}
                        >
                          <Descriptions
                            title={`Response${index + 1}:`}
                            column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                          >{Object.keys(item.Response).map((key, subIndex) => (
                            <Descriptions.Item key={subIndex} label={key}>
                              {item.Response[key]}
                            </Descriptions.Item>
                          ))}
                          <Descriptions.Item label="Time Record">{item.TimeStop}</Descriptions.Item>
                        </Descriptions>
                        </ConfigProvider>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Eventviewresp;
