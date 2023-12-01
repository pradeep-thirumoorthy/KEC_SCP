import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useLocation } from 'react-router';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Table, Segmented, Descriptions, ConfigProvider, Empty } from 'antd';

const Eventviewresp = () => {
  const [adminData, setAdminData] = useState([]);
  const Email = Cookies.get('AdminEmail');
  const location = JSON.stringify(useLocation());
  const match = location.match(/eventInfo\/(.*?)\/response/i);
  const [isLoading, setIsLoading] = useState(true);
  const [hasLoadedData, setHasLoadedData] = useState(false);
  const [selectedOption, setSelectedOption] = useState('List');
   // Default selected option
  useEffect(() => {
    if (Email && isLoading && !hasLoadedData) {
      const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
      const email = bytes.toString(CryptoJS.enc.Utf8);

      if (match && match[1]) {
        const EventId = match[1];

        axios
          .get(`http://localhost:8000/SCP/ResponseView.php?email=${email}&EventId=${EventId}`)
          .then((response) => {
            const data = response.data;
            if (Array.isArray(data) && data.length > 0) {
              const parsedData = data.map((item) => ({
                ...item,
                Response: JSON.parse(item.Response.replace(/^"|"$/g, '')),
              }));
              setAdminData(parsedData);
              setHasLoadedData(true); // Mark that data has been loaded
            } else {
              console.error('Data is not an array or is empty:', data);
            }
          })
          .catch((error) => {
            console.error('An error occurred:', error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        console.error('EventId not found in the URL');
      }
    }
  }, [Email, match, isLoading, hasLoadedData]);

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  
  return (
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

      {selectedOption === 'List' ? (
        <div className="table-responsive w-100">
          <Table scroll={{x:1000}} style={{height:'100vh'}}
            columns={[
              {
                title: 'S.no',
                dataIndex: 'S.no',
                key: 'S.no',
              },
              {
                title: 'Email',
                dataIndex: 'Email',
                key: 'Email',
              },
              ...(adminData.length > 0
                ? Object.keys(adminData[0]?.Response).map((key, index) => ({
                    title: key,
                    dataIndex: `Response.${key}`,
                    key: `Response.${key}`,
                  }))
                : []),
              {
                title: 'TimeStop',
                dataIndex: 'TimeStop',
                key: 'TimeStop',
              },
            ]}
            dataSource={
              adminData.length > 0
                ? adminData.map((item, index) => ({
                    key: index,
                    'S.no': index + 1,
                    'Email': item.Email,
                    ...(adminData.length > 0
                      ? Object.entries(item.Response).reduce((acc, [key, value]) => {
                          acc[`Response.${key}`] = value;
                          return acc;
                        }, {})
                      : {}),
                    'TimeStop': item.TimeStop,
                  }))
                : []
            }
            pagination={false}
          />
        </div>
      ) : (
        <div>
              <div className=''>
              {adminData.length > 0 ?
  <div className=' py-3'>
    {adminData.map((item, index) => (
      <div className='bg-white mx-5' key={index}>
        <ConfigProvider
  theme={{
    token: {
      colorFillAlter:'#f8f8f8'
    },
  }}
>
        <Descriptions 
          title={`Response${index + 1}:`}
          bordered
          column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
        >
          {Object.keys(item.Response).map((key, subIndex) => (
            <Descriptions.Item key={subIndex} label={key}>
              {item.Response[key]}
            </Descriptions.Item>
          ))}
          <Descriptions.Item label="TimeStop">{item.TimeStop}</Descriptions.Item>
        </Descriptions>
        </ConfigProvider>
      </div>
    ))}
  </div>
:<><div style={{ display: 'flex', alignItems: 'center',justifyContent:'center', height: '100vh' }}>
<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
</div></>}

            </div>
        </div>
      )}
    </div>
  );
};

export default Eventviewresp;
