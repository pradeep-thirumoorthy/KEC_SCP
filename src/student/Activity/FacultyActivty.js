import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CryptoJS from 'crypto-js';
import { Radio,Table,Space,Button, Input, Typography } from 'antd';
const FacutlyActivity= () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [Filter,setFilter]= useState('');
  const navigate = useNavigate();
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  // function nextpage(){
  //   return navigate('/forward');
  // }
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const handleButtonClick=(rowData)=>
  {
    navigate('/student/Activity/Panel', { state: { info: rowData ,Heading:'Activity'} });
  };
  useEffect(() => {
    const hashValue = window.location.hash.replace('#', '');
    
    const [value1, value2] = hashValue.split('=');
    if(value1!=="" && value2!=="")
    {
    if(value2 !==''){
      if(value2==='Sent'){
        setFilter('Arrived');
      }
      else{
    setFilter(value2);
      }
    }
    console.log('Value 1:', value1);
console.log('Value 2:', value2);
    const filteredType = value1;
    if(value1==='Maintenance'||value1==='Academic'||value1==='Lab'||value1==='Courses'||value1==='Faculty'||value1==='Others'){    setFilteredInfo({
        Type: [filteredType],
      });}}
    filterData();
  }, []);
 
  const columns = [
    {
      title: 'Roll No',
      dataIndex: 'Roll',
      key: 'Roll',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
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
  const Email = sessionStorage.getItem('StudentEmail');
  const bytes = CryptoJS.AES.decrypt(Email, 'student-_?info');
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const filterData = () => {
    const apiUrl = 'http://192.168.77.250:8000/FacutlyActivity.php';
    const params = {
      start_date: startDate,
      end_date: endDate,
      email:email,
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
