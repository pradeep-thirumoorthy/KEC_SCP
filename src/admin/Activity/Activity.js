import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import {Table,Button,Space} from 'antd';
const Activity= () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  // function nextpage(){
  //   return navigate('/forward');
  // }

  const handleButtonClick=(rowData)=>
  {
    navigate('/admin/Activity/Panel', { state: { info: rowData } });
  };
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
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status'
    },
    {
      title: 'Details',
    key: 'Details',
    render: (_, record) => (
      <Space size="middle">
        <Button onClick={() => handleButtonClick(record.info)}>More details</Button>
      </Space>
    ),
    }
  ];
  const mappedTableData = data
  .map((item) => ({
    key: item.id, // Assuming 'id' is the key in your data
    Email: item.email,
    Type: item.Type,
    
    Date: item.info1, // Assuming 'info1' is a property in your data
    info: item,
    Status: item.Status,
  })).reverse();
  const fetchData = () => {
    const apiUrl = 'http://192.168.157.250:8000/SCP/viewComp2.php';

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
  const Email = Cookies.get('AdminEmail');
  const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
  const email = bytes.toString(CryptoJS.enc.Utf8);
  const filterData = () => {
    const apiUrl = 'http://192.168.157.250:8000/SCP/viewComp2.php';
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
      <h1>Activity:</h1>
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
          // onClick={fetchData}
        />
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        </>
      )}
      
    </div>
    <Table columns={columns} scroll={{ x: 150 }} dataSource={mappedTableData}  bordered pagination={false}/>;
              </div>
        </>
      );
   }
export default Activity;

