import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Button, Input, Radio,Table} from 'antd';
import { getEmailFromSession } from '../EmailRetrieval';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';
const FacultyHistory= () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [Filter,setFilter]= useState('');
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const { FilterState} = location.state || [];
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  useEffect(() => {
    
    if(FilterState){setFilter(FilterState);}
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
  .map((item,i) => ({
    key: i+1,
    Email: item.email,
    Type: item.Type,
    FacultyName:item.FacultyName,
    Description:item.Description,
    Date: item.info1,
    Status: item.Status,
  })).reverse();
  const onChange = (e) => {
    setFilter(e.target.value);
    //console.log(Filter);
  };
  const email = getEmailFromSession();
  const filterData = () => {
    const apiUrl = 'http://localhost:8000/Admin/Faculty/FacultyHistory.php';
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


  const exportHistory = ()=>{
    axios.get('http://localhost:8000/Admin/Faculty/FacultyHistory.php', { params:{start_date: startDate, end_date: endDate,email:email,}})
      .then((response) => {
        const resdata = response.data.data || [];
      const mappedTableData = resdata
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
        .map((item, i) => {
      
          return {
            key: i + 1,
            Name: item.Name,
            Roll_No: item.Roll_No,
            Class: item.Class,
            Batch: item.Batch,
            FacultyName:item.FacultyName,
            Type: item.Type,
            Date: item.info1,
            Status: item.Status,
            Description: item.Description,
          };
        });
        const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(mappedTableData);
      XLSX.utils.book_append_sheet(wb, ws,'FacultyHistory');
      XLSX.writeFile(wb, 'FacultyHistory.xlsx');
      //console.log("toucjedidnhfew");
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error filtering data:', error);
        setLoading(false);
      });
    
  }
      return (
        <>
        <div className='row'>
                <div className="App">
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
        <Input
          style={{margin:'30px 0px'}}
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
      <div>
    <Button onClick={()=>{exportHistory()}}>Export</Button> 
    </div>  
    <Table 
    rowKey={(record) => record.key}
    scroll={{x:1000}} columns={columns} dataSource={mappedTableData} onChange={handleChange}   pagination={false}/>;
              </div>
        </>
      );
   }
export default FacultyHistory;

