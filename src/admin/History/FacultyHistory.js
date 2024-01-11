import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import CryptoJS from 'crypto-js';
import { Badge, Button, Radio,Table, Typography} from 'antd';
const FacultyHistory= () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [Filter,setFilter]= useState('');
  useEffect(() => {
    const hashValue = window.location.hash.replace('#', ''); // Remove the '#' character
    setSearch(hashValue);
    filterData();
  }, []);
 
  const columns = [
    {
      title: 'Faculty Name',
      dataIndex: 'FacultyName',
      key: 'FacultyName',
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      key: 'Description',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
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
      key: 'Status',
      render: (_, { Status }) => (
        <>
          <Badge status={(Status==='Resolved')?'success':'error'} text={Status} />
        </>
      ),
    });
  }
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
    Email: item.email,
    Type: item.Type,
    FacultyName:item.FacultyName,
    Description:item.Description,
    Date: item.info1,
    Status: item.Status,
  })).reverse();
  const onChange = (e) => {
    setFilter(e.target.value);
    console.log(Filter);
  };
  const Email = sessionStorage.getItem('AdminEmail');
  const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const filterData = () => {
    const apiUrl = 'http://localhost:8000/FacultyHistory.php';
    const params = {
      start_date: startDate,
      end_date: endDate,
      email:email,
    };
    const hashValue = window.location.hash.replace('#', '');
    setSearch(hashValue);
    
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
      <Typography.Title level={1}>FacultyHistory:</Typography.Title>
      <div className='d-flex justify-content-around'>
        <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        /></div>
        <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        /></div>
        <Button className='filter' onClick={filterData}>Filter</Button>
      </div>

      <form>
        <input
          className='my-3 form-control'
          type='search'
          placeholder='search name'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <Radio.Group onChange={onChange} defaultValue="">
      <Radio.Button value="">All</Radio.Button>
      <Radio.Button value="Rejected">Rejected</Radio.Button>
      <Radio.Button value="Resolved">Resolved</Radio.Button>
    </Radio.Group>
        </>
      )}
      
    </div>
              
    <Table rowKey={(record) => record.uid}scroll={{x:1000}} columns={columns} dataSource={mappedTableData}   pagination={false}/>;
              </div>
        </>
      );
   }
export default FacultyHistory;

