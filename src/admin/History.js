import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { Radio,Table} from 'antd';
const History= () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [Filter,setFilter]= useState('');
  useEffect(() => {
    fetchData();
    const hashValue = window.location.hash.replace('#', ''); // Remove the '#' character
    setSearch(hashValue);
    filterData();
  }, []);
 
  const columns = [
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
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
      key: 'Status'
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
    
    Date: item.info1,
    Status: item.Status,
  })).reverse();
  const fetchData = () => {
    const apiUrl = 'http://localhost:8000/SCP/History.php';

    axios.get(apiUrl,{Filter:'No'})
      .then((response) => {
        setData(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };
  const onChange = (e) => {
    setFilter(e.target.value);
    console.log(Filter);
  };
  const Email = Cookies.get('AdminEmail');
  const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const filterData = () => {
    const apiUrl = 'http://localhost:8000/SCP/History.php';
    const params = {
      Filter:'Yes',
      start_date: startDate,
      end_date: endDate,
      email:email,
    };
    const hashValue = window.location.hash.replace('#', '');
    setSearch(hashValue);
    
    axios.get(apiUrl, { params })
      .then((response) => {
        setData(response.data.data || []);
      })
      .catch((error) => {
        console.error('Error filtering data:', error);
      });
  };
      return (
        <>
        <div className='row'>
                <div className="App">
      <h1>History:</h1>
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
        <button className='filter' onClick={filterData}>Filter</button>
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
              
    <Table scroll={{x:1000}} columns={columns} dataSource={mappedTableData} bordered  pagination={false}/>;
              </div>
        </>
      );
   }
export default History;

