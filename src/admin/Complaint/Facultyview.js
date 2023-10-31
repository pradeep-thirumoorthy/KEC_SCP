import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { Button, Input, Space, Table } from 'antd';

const Facultyview = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  const handleButtonClick = (rowData) => {
    navigate('/admin/Complaints/Faculty/Panel', { state: { info: rowData } });
  };

  useEffect(() => {
    fetchData();
    const hashValue = window.location.hash.replace('#', '');
    const hashVal=hashValue.replace('%20',' ');
    const filteredType = hashVal;
    if(hashVal==='Maintenance'||hashVal==='Academic'||hashVal==='Lab'||hashVal==='Courses'||hashVal==='Faculty'||hashVal==='Others'){    setFilteredInfo({
        Type: [filteredType],
      });}
    filterData();
  }, []);

  const fetchData = () => {
    const apiUrl = 'http://192.168.157.250:8000/SCP/viewComp.php';
    // Your email retrieval logic here
    const email = getEmailFromCookies();

    axios
      .get(apiUrl, { Filter: 'No', email: email })
      .then((response) => {
        setData(response.data.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const getEmailFromCookies = () => {
    const Email = Cookies.get('AdminEmail');
    const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
    return bytes.toString(CryptoJS.enc.Utf8);
  };
  
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const filterData = () => {
    const apiUrl = 'http://192.168.157.250:8000/SCP/viewFacComp.php';
    const params = {
      Filter: 'Yes',
      start_date: startDate,
      end_date: endDate,
      email: getEmailFromCookies(),
    };

    axios
      .get(apiUrl, { params })
      .then((response) => {
        setData(response.data.data || []);
      })
      .catch((error) => {
        console.error('Error filtering data:', error);
      });
  };

  const columns = [
    {
      title: 'Email',
      dataIndex: 'Email',
      key: 'Email',
      
    },
    {
        title: 'Faculty',
        dataIndex: 'Subject_Data',
        key: 'Subject_Data',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
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
        key: item.id, // Assuming 'id' is the key in your data
        Email: item.email,
        Type: item.Type,
        Subject_Data:JSON.parse(item.Subject_Data).FacultyName,
        Date: item.info1, // Assuming 'info1' is a property in your data
        info: item,
        Status: item.Status,
        Details: 'More',
      })).reverse()
    );
  }, [data, search]);

  return (
    <>
      <div className="row">
        <div className="App">
          <h1>Faculty:</h1>
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

          {loading ? <p>Loading...</p> : <Table columns={columns} scroll={{ x: 150 }} onChange={handleChange} dataSource={filteredData} bordered pagination={false} />}
        </div>
      </div>
    </>
  );
};

export default Facultyview;
