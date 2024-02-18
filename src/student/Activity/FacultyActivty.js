import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import {useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Radio,Table,Space,Button, Input, Typography } from 'antd';
import { geteduEmailFromSession } from '../Emailretrieval';
const FacutlyActivity= () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  
  const [Filter,setFilter]= useState('');
  const { FilterState } = location.state || '';
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const handleButtonClick=(rowData)=>
  {
    navigate('/student/Activity/Faculty/Panel', { state: { info: rowData ,Heading:'Activity'} });
  };
  useEffect(() => {
    if(FilterState){
    if(FilterState){setFilter(FilterState);}}
    
    filterData();
  }, []);
 
  const columns = [
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
      filters: [
        {
          text: 'Public',
          value: 'Public',
        },
        {
          text: 'Anonymous',
          value: 'Anonymous',
        },
      ],
      filteredValue: filteredInfo.Type || null,
      onFilter: (value, record) => record.Type.includes(value),
      sorter: (a, b) => a.Type.length - b.Type.length,
      sortOrder: sortedInfo.columnKey === 'Type' ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: 'Roll No',
      dataIndex: 'Roll',
      key: 'Roll',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
      sorter: (a, b) => new Date(a.Date) - new Date(b.Date),
      sortOrder: sortedInfo.columnKey === 'Date' ? sortedInfo.order : null,
    },
  ];
  if (Filter === '') {
    columns.push({
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status'
    });
  }
  columns.push({
    title: 'Details',
    key: 'Details',
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => handleButtonClick(record.info)}>More details</Button>
      </Space>
    ),
  });
  const mappedTableData = data
  .filter((item) => {
    return (
      (search.toLowerCase() === '' || // Search condition
      Object.values(item).some(
        (value) =>
          value !== null &&
          value.toString().toLowerCase().includes(search.toLowerCase())
      )) &&
      (Filter === '' || item.Status === Filter) // Filter condition
    );
  })
  .map((item) => ({
    key: item.id, // Assuming 'id' is the key in your data
    Roll: item.Roll_No,
    Type: item.Type,
    
    Date: item.info1, // Assuming 'info1' is a property in your data
    info: item,
    Status: (item.Status==='Arrived')?'Sent':item.Status,
    Details: 'More',
  })).reverse();
  const onChange = (e) => {
    setFilter(e.target.value);
    console.log(Filter);
  };
  const filterData = () => {
    const apiUrl = 'http://localhost:8000/Student/Activity/FacutlyActivity.php';
    const params = {
      start_date: startDate,
      end_date: endDate,
      email:geteduEmailFromSession(),
    };
    
    axios.get(apiUrl, { params })
      .then((response) => {
        setData(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error filtering data:', error);
        setLoading(false);
      });
  };
      return (
        <>
        <div className='row'>
                <div className="App">
      <Typography.Title level={1}>Activity:</Typography.Title>
      <div className='d-flex justify-content-around'>
        <div>
        <label>Start Date:</label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        /></div>
        <div>
        <label>End Date:</label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        /></div>
        <div className='d-block'>
          <label></label>
        <Button className='filter' onClick={filterData}>Filter</Button>
        </div>
      </div>

      <form>
        <Input
          className='my-3 form-control'
          type='search'
          placeholder='search name'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // onClick={fetchData}
        />
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <Radio.Group  onChange={onChange} defaultValue={Filter}>
      <Radio.Button value="">All</Radio.Button>
      <Radio.Button value="Accepted">Accepted</Radio.Button>
      <Radio.Button value="Arrived">Sent</Radio.Button>
    </Radio.Group>
        </>
      )}
      
    </div>
    <Table rowKey={(record) => record.uid}scroll={{x:1000}} columns={columns} dataSource={mappedTableData} onChange={handleChange} z  pagination={false}/>;
              </div>
        </>
      );
   }
export default FacutlyActivity;

