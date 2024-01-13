import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Input, Space, Table,Typography } from 'antd';
import { getEmailFromSession } from '../EmailRetrieval';

const Activity = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();
  const handleButtonClick=(rowData)=>
  {
    navigate('/admin/Activity/Panel', { state: { info: rowData } });
  };
  useEffect(() => {
    const hashValue = window.location.hash.replace('#', '');
    const hashVal=hashValue.replace('%20',' ');
    const filteredType = hashVal;
    if(hashVal==='Maintenance'||hashVal==='Academic'||hashVal==='Lab'||hashVal==='Courses'||hashVal==='Faculty'||hashVal==='Others'){    setFilteredInfo({
        Type: [filteredType],
      });}
    filterData();
  }, []);
  
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const filterData = () => {
    const apiUrl = 'http://localhost:8000/Admin/Activity/view.php';
    const params = {
      start_date: startDate,
      end_date: endDate,
      email: getEmailFromSession(),
    };

    axios
      .get(apiUrl, { params })
      .then((response) => {
        setData(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error filtering data:', error);
        setLoading(false);
      });
  };

  const columns = [
    {
      title: 'Roll No',
      dataIndex: 'Roll_No',
      key: 'Roll_No',
      
    },
    
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      filters: [
        {
          text: 'Academic',
          value: 'Academic',
        },
        {
          text: 'Maintenance',
          value: 'Maintenance',
        },
        {
          text: 'Faculty',
          value: 'Faculty',
        },
        {
          text: 'Courses',
          value: 'Courses',
        },
        {
          text: 'Lab',
          value: 'Lab',
        },{
          text: 'Others',
          value: 'Others',
        },
      ],
      filteredValue: filteredInfo.Type || null,
      onFilter: (value, record) => record.Type.includes(value),
      sorter: (a, b) => a.Type.length - b.Type.length,
      sortOrder: sortedInfo.columnKey === 'Type' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Class',
      dataIndex: 'Class',
      key: 'Class',
      filters: [
        {
          text: 'A',
          value: 'A',
        },
        {
          text: 'B',
          value: 'B',
        },{
          text: 'C',
          value: 'C',
        },{
          text: 'D',
          value: 'D',
        },
      ],
      filteredValue: filteredInfo.Class || null,
      onFilter: (value, record) => record.Class.includes(value),
      sorter: (a, b) => a.Class.length - b.Class.length,
      sortOrder: sortedInfo.columnKey === 'Class' ? sortedInfo.order : null,
      ellipsis: true,
    },{
      title: 'Batch',
      dataIndex: 'Batch',
      key: 'Batch',
      filters: [
        {
          text: '2024',
          value: '2024',
        },
        {
          text: '2025',
          value: '2025',
        },{
          text: '2026',
          value: '2026',
        },{
          text: '2027',
          value: '2027',
        },
      ],
      filteredValue: filteredInfo.Batch || null,
      onFilter: (value, record) => record.Batch.includes(value),
      sorter: (a, b) => a.Batch.length - b.Batch.length,
      sortOrder: sortedInfo.columnKey === 'Batch' ? sortedInfo.order : null,
      ellipsis: true,
    },
    
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
      sorter: (a, b) => a.Type.length - b.Type.length,
      sortOrder: sortedInfo.columnKey === 'Date' ? sortedInfo.order : null,
    },
    {
      title: 'Details',
      key: 'Details',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleButtonClick(record.info)}>More details</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    setFilteredData(
      data.filter((item) => {
        return (
          (search.toLowerCase() === '' ||
            Object.values(item).some(
              (value) =>
                value !== null && value.toString().toLowerCase().includes(search.toLowerCase())
            ))
        );
      }).map((item) => ({
        key: item.id, 
        Roll_No:item.Roll_No,
        Class:item.Class,
        Batch:JSON.stringify(item.Batch),
        Type: item.Type,
        Date: item.info1,
        info: item,
        Details: 'More',
      })).reverse()
    );
  }, [data, search]);

  return (
    <>
      <div className="row">
          <div className="d-flex justify-content-around">
          

            <div>
              <label>Start Date:</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label>End Date:</label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button className="filter mt-3" onClick={filterData}>
              Filter
            </Button>
          </div>
          <form>
            <input
              className="my-3 form-control"
              type="search"
              placeholder="Search name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {loading ? <Typography.Title level={1}>Loading</Typography.Title> : 
          <Table rowKey={(record) => record.uid}scroll={{x:1000}} columns={columns} onChange={handleChange} dataSource={filteredData}  pagination={false} />}
        </div>
    </>
  );
};

export default Activity;
