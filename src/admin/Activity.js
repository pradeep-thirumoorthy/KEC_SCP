import React ,{ useEffect, useState } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar1 from './Sidebar1';
const Complaintsview= () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [search, setSearch] = useState('');

  const navigate = useNavigate();
  // function nextpage(){
  //   return navigate('/forward');
  // }

  const [info,setInfo]=useState('');
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
 

  const fetchData = () => {
    const apiUrl = 'http://localhost:8000/SCP/viewComp.php';

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

  const filterData = () => {
    const apiUrl = 'http://localhost:8000/SCP/viewComp.php';
    const params = {
      Filter:'Yes',
      start_date: startDate,
      end_date: endDate,
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
                <div className='sidebar1 col-2 '>
                  <Sidebar1/>
                </div>
                <div className='right col-10 float-end'>
                <div className="App">
                <div className=" bg-light row ">
              <div className="row border-bottom pb-3">
                <div className="col-lg-10">
                  <span className="fs-2 fw-bolder fst-italic">Activity</span><br></br>
                  <span className="text-black-50 fst-italic no-warp">Aceepted Complaints will be viewed here</span>
                </div>
              </div>
            </div>
            <div className='row'>
            <div className=' col-lg-6'>
      <form>
        <input
          className='my-3 form-control'
          type='search'
          placeholder='search name'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // onClick={fetchData}
        />
      </form></div>
          <div className='d-flex col-lg-6 align-content-center py-3'>
            <div className='d-flex justify-content-around align-items-center'>
              <label>Start Date:</label>
              <input className=' form-control-sm w-25' type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
              <label>End Date</label>
              <input className='form-control-sm w-25' type="date" value={endDate}  onChange={(e) => setEndDate(e.target.value)}/>
              
            </div>
            <button className='filter btn btn-dark' onClick={filterData}>Filter</button>

      </div>
      
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        <div className='table-responsive pt-3'>
          <table className="table table-success table-striped table-bordered table-responsive">
            <thead>
              <tr>
                <th>Email id</th>
                <th>Type</th>
                <th>Subject</th>
                <th>Date</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((item) => {
                  return (
                    search.toLowerCase() === '' ||
                    Object.values(item).some((value) =>
                      value !== null &&
                      value.toString().toLowerCase().includes(search.toLowerCase())
                    )
                  );
                })
                .map((item) => (
                  <tr className=' text-nowrap'>
                    <td>{item.Email}</td>
                    <td>{item.Type}</td>
                    <td>{item.Subject}</td>
                    <td>{item.Date}</td>
                    <td style={{cursor:'pointer'}}  onClick={() => handleButtonClick(item)}>Update Activity</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </>
      )}
      
    </div>
              </div>
        </div>
        </>
      );
   }
export default Complaintsview;

