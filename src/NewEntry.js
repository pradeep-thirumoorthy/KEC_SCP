import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';
import Sidebar1 from './admin/Sidebar1';
const NewEntry = ({ element }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [responseIsTrue, setResponseIsTrue] = useState(false);
  const [AdminData,setAdminData]=useState({});
  const [Roll,setRoll]=useState('');
  
  const Email = Cookies.get('AdminEmail');
  const bytes = CryptoJS.AES.decrypt(Email, 'admin-_?info');
  const email = bytes.toString(CryptoJS.enc.Utf8);
  useEffect(() => {
    // Fetch admin data based on the decrypted email
    axios.post('http://localhost:8000/SCP/NewEntry.php', `email=${encodeURIComponent(email)}`)
      .then(response => {
        setAdminData(response.data.data);
        setResponseIsTrue(response.data.success);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching admin data:', error);
        setIsLoading(false);
      });
  }, [email]);
  const handleSubmit = () => {
    axios.post('http://localhost:8000/SCP/RollEntry.php', {
      email: email,
      Roll: Roll
    })
      .then(response => {
        console.log(response.data.response);
        if (response.data.success) {
          setResponseIsTrue(true);
          setAdminData(response.data.data);
        } else {
          setResponseIsTrue(false);
        }
        window.location.reload();
      })
      .catch(error => {
        console.error('Error fetching admin data:', error);
        setIsLoading(false);
      });
      
  }
  
  
  return isLoading ? (
    <div className='row'>
        <div className='col-2'>
            <Sidebar1/>
        </div>
        <div className='right col-10' style={{marginTop:"25%",marginLeft:"50%"}}>
              <h3 style={{fontFamily:"monospace"}}>Loading...</h3>
            </div>
    </div>
  ) : responseIsTrue ? (
    <>{element}</>
  ) : (
    <>
    <div className='vh-100 bg-dark bg-opacity-10 d-flex justify-content-center w-100' >
            <div className='m-5 table-responsive bg-white w-75'>
              <div className='m-5 fs-2 text-center'>Personal Info</div>
              <table className='table table-hover '>
                <tbody>
                  <tr>
                    <td className='fs-3'>Name</td>
                    <td className='fs-3'>{AdminData.Name}</td>
                  </tr>
                  <tr>
                    <td className='fs-3'>Designation</td>
                    <td className='fs-3'>
                      {AdminData.Designation === 'Creator' && 'Creator'}
                      {AdminData.Designation === 'Professor' && 'Professor'}
                      {AdminData.Designation === 'Assistant Professor[SLG]' && 'Assistant Professor[SLG]'}
                      {AdminData.Designation === 'Assistant Professor[SRG]' && 'Assistant Professor[SRG]'}
                      {AdminData.Designation === 'Assistant Professor' && 'Assistant Professor'}
                      {AdminData.Designation === 'Associate Professor' && 'Associate Professor'}
                      {AdminData.Designation === 'Professor,Head' && 'Head of '+AdminData.Department}
                    </td>
                  </tr>
                  
                  <tr>
                    <td className='fs-3'>Phone</td>
                    <td className='fs-3'>{AdminData.PhoneNo}</td>
                  </tr>
                  <tr>
                    <td className='fs-3'>Department</td>
                    <td className='fs-3'>{AdminData.Department}</td>
                  </tr>
                  <tr>
                    
                      {AdminData.Designation === 'Creator' && (
                       <>
                        <td className='fs-3'>Roll</td>
                        <td className='fs-3'>
                            Class Advisor:<input type='text' value={Roll} onChange={(e) => setRoll(e.target.value)} className='form-control'/>
                            </td>
                       </>
                      )}
                      {AdminData.Designation === 'Professor' && (
                        <>
                            <td className='fs-3'>Roll</td>
                            <td className='fs-3'>
                            Year-Incharge(Batch):
                            <select className="form-control" value={Roll} onChange={(e) => setRoll(e.target.value)}>
                                <option  value="">NiL</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                            </select>
                            </td>
                        </>
                      )}
                      {AdminData.Designation === 'Assistant Professor' && (
                        <>
                            <td className='fs-3'>Roll</td>
                    <td className='fs-3'>
                        Class Advisor:
                    <select className="form-control" value={Roll} onChange={(e) => setRoll(e.target.value)}>
                                <option  value="">NiL</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>
                          </td>
                        </>
                      )}
                      {AdminData.Designation === 'Assistant Professor[SRG]' && (
                        <>
                            <td className='fs-3'>Roll</td>
                    <td className='fs-3'>
                        Position:
                            <select className="form-control" value={Roll} onChange={(e) => setRoll(e.target.value)}>
                                <option  value="">NiL</option>
                                <option value="text">Placement Co-ordinator</option>
                                <option value="checkbox">Checkbox options</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="email">Email</option>
                                <option value="radio">Radio options</option>
                            </select>
                            </td>
                        </>
                      )}
                      {AdminData.Designation === 'Assistant Professor[SLG]' && (
                        <>
                            <td className='fs-3'>Roll</td>
                    <td className='fs-3'>
                        Position:
                          <div className='fs-3'>
                            <select className="form-control" value={Roll} onChange={(e) => setRoll(e.target.value)}>
                                <option  value="">NiL</option>
                                <option value="text">Co-ordinator</option>
                                <option value="checkbox">Checkbox options</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="email">Email</option>
                                <option value="radio">Radio options</option>
                            </select>
                            </div>
                            </td>
                        </>
                      )}
                      {AdminData.Designation === 'Associate Professor' && (
                        <>
                            <td className='fs-3'>Roll</td>
                    <td className='fs-3'>
                            Position:
                            <select className="form-control" value={Roll} onChange={(e) => setRoll(e.target.value)}>
                                <option  value="">NiL</option>
                                <option value="text">COE Co-ordinator</option>
                                <option value="checkbox">Checkbox options</option>
                                <option value="number">Number</option>
                                <option value="date">Date</option>
                                <option value="email">Email</option>
                                <option value="radio">Radio options</option>
                            </select>
                            </td>
                        </>
                      )}
                  </tr>
                </tbody>
              </table>
              <div className='w-100 text-center '><button className='btn btn-primary fs-5' onClick={handleSubmit}>Update</button></div>
            </div>
            
          </div>
        </>
  );
};

export default NewEntry;






