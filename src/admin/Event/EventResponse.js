import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { Table, Segmented, Descriptions, Empty, Result, Button, Card } from 'antd';
import { getEmailFromSession } from '../EmailRetrieval';
import * as XLSX from 'xlsx';

const Eventviewresp = () => {
  const [adminData, setAdminData] = useState([]);
  
  const location = useLocation();
  const { EventId } = location.state || '';
  const [selectedOption, setSelectedOption] = useState('List');
  const [Title,getTitle]=useState('');
   useEffect(() => {
    console.log(EventId);
    const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/Admin/Events/EventResponse.php?email=${getEmailFromSession()}&EventId=${EventId}`);
          const data = response.data.responses;
          getTitle(response.data.title);
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
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  
  const columnsTable = [
    {
      title: 'S.no',
      dataIndex: 'S.no',
      key: 'S.no',
    },
    ...(adminData.length > 0
      ? Object.keys(adminData[0]?.Response).map((key, index) => ({
          title: key,
          dataIndex: `${key}`,
          key: `${key}`,
        }))
      : []),
      {
        title: 'Time Record',
        dataIndex: 'Time Record',
        key: 'Time Record',
        filteredValue: filteredInfo['Time Record'] || null,
        onFilter: (value, record) => record['Time Record'].includes(value),
        sorter: (a, b) => {
          const dateA = new Date(a['Time Record']);
          const dateB = new Date(b['Time Record']);
          return dateA - dateB;
        },
        sortOrder: sortedInfo.columnKey === 'Time Record' ? sortedInfo.order : null,
        ellipsis: true,
      },
  ];
  const DateDisplay = ({ dateString }) => {
    // Parse the ISO date string
    const parsedDate = new Date(dateString);
  
    // Format the date as "dd MMM yyyy HH:mm:ss"
    const formattedDate = parsedDate.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  
    return formattedDate;
  };
  
  
  const dataTable = adminData.length > 0
  ? adminData.map((item, index) => ({
      'S.no': index + 1,
      ...(adminData.length > 0
        ? Object.entries(item.Response).reduce((acc, [key, value]) => {
            acc[`${key}`] = value;
            return acc;
          }, {})
        : {}),
      'Time Record':DateDisplay({ dateString: item.ResponseTime }),
    }))
  : [];

  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(dataTable);
    XLSX.utils.book_append_sheet(wb, ws,Title);
    XLSX.writeFile(wb, Title+'.xlsx');
  };
  

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
              <Button onClick={handleExport}>Export</Button>
              <Table rowKey={(record) => record.uid}scroll={{x:1000}}
            columns={columnsTable}
            onChange={handleChange}
            dataSource={
              dataTable
            }
            pagination={false}
          />            </div>
          ) : (
            <div>
              <div>
                {adminData.length > 0 ? (
                  <div>
                    {adminData.map((item, index) => (
                      <Card extra={<DateDisplay dateString={item.ResponseTime}/>} title={`Response ${index + 1}`} key={index}>
                          <Descriptions
                            column={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 1, xxl: 1 }}
                          >{Object.keys(item.Response).map((key, subIndex) => (
                            <Descriptions.Item key={subIndex} label={key}>
                              {item.Response[key]}
                            </Descriptions.Item>
                          ))}
                          </Descriptions>
                      </Card>
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
