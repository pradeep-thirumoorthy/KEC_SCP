import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Input, Table, Typography} from 'antd';
import { getEmailFromSession } from '../EmailRetrieval';
import * as XLSX from 'xlsx';
import { useLocation } from 'react-router-dom';
const Report= () => {
  const location = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');
  const [filteredInfo, setFilteredInfo] = useState({}); 
  const [sortedInfo, setSortedInfo] = useState({});
  const {TypeState} = location.state || [];
  const handleChange = (pagination, filters, sorter) => {
    //console.log('Various parameters', pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  


  useEffect(() => {
    if(TypeState){
      setFilteredInfo({Type: [TypeState],});}
    filterData();
  }, []);
 
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
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
      sorter: (a, b) => new Date(a.Date) - new Date(b.Date),
      sortOrder: sortedInfo.columnKey === 'Date' ? sortedInfo.order : null,
    },
    {
        title: 'Status',
        dataIndex: 'Status',
        key: 'Status',
      },{
        title: 'Completed Time',
        dataIndex: 'Completed Time',
        key: 'Completed Time',
        sorter: (a, b) => new Date(a.Date) - new Date(b.Date),
sortOrder: sortedInfo.columnKey === 'Completed Time' ? sortedInfo.order : null,

      },
  ];

  const exportHistory = ()=>{
        const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(mappedTableData);
      XLSX.utils.book_append_sheet(wb, ws,'History');
      XLSX.writeFile(wb, 'History.xlsx');
      //console.log("toucjedidnhfew");
        setLoading(false);
    
  }
  
  
  const mappedTableData = data
        .filter((item) => {
          return (
            (search.toLowerCase() === '' || // Search condition
            Object.values(item).some(
              (value) =>
                value !== null &&
                value.toString().toLowerCase().includes(search.toLowerCase())
            ))
          );
        })
        .map((item, i) => {
          // Parse the 'Extra' field as JSON
          const extraData = item.Extra ? (item.Type === 'Maintenance')?JSON.parse(item.Extra):{'category':item.Extra} : {};
          let datetimeString = "";

            if (item.info4) {
            try {
                const dataArray = JSON.parse(item.info4);
                datetimeString = dataArray[1].slice(0,10) || "";
            } catch (error) {
                console.error("Error parsing JSON:", error,item.info4);
            }
            }

          return {
            key: i + 1,
            Name: item.Name,
            Class: item.Class,
            Batch: item.Batch,
            Roll_No: item.Roll_No,
            Department:item.Department,
            Type: item.Type,
            Date: item.info1,
            'Completed Time':datetimeString,
            Status: item.Status,
            Description: item.Description,
            Category: extraData.category || null,
            Floor: extraData.Floor || null,
            Data: extraData.data || null,
          };
        }).reverse();
  const email=getEmailFromSession();
  const filterData = () => {
    const apiUrl = 'http://localhost:8000/Admin/History/Report.php';
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
      <div className='d-flex justify-content-around'>
        <div>
        <Typography>Start Date:</Typography>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        /></div>
        <div>
        <Typography>End Date:</Typography>
        <Input
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
        </>
      )}
      
    </div>
              
      <Button onClick={()=>{exportHistory()}}>Export</Button>
    <Table 
        rowKey={(record) => record.key}
    scroll={{x:1000}} columns={columns} dataSource={mappedTableData} onChange={handleChange}  pagination={false}/>;
        </>
      );
   }
export default Report;