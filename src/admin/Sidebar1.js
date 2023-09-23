import React, { useState, useEffect } from 'react';
import { FiFileText, FiTrello, FiPieChart, FiCheckCircle, FiLayers, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import he from '../images/1ec5967d-b9f1-46bc-b0df-af793c5d868d-1532534529493-school-pic.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

const Sidebar1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const [dropdownStates, setDropdownStates] = useState({}); // State for dropdown open/closed states

    useEffect(() => {
        const foldersToCheck = [
            '/admin/dashboard',
            '/admin/Complaints',
            '/admin/Events',
            '/admin/Activity',
            '/admin/History',
            '/admin/PersonalInfo',
            '/admin/createPost',
        ];
        const dropdownStatesUpdates = {};

        foldersToCheck.forEach((folder) => {
            dropdownStatesUpdates[folder] = location.pathname.startsWith(folder);
        });

        setDropdownStates(dropdownStatesUpdates);
    }, [location]);

    const handledirect = (link) => {
        if (location.pathname === link) {
            return;
        } else {
            navigate(link);
        }
    };

    const handlelogout = () => {
        logout();
        
        navigate("/admin/login");
    };

    const logo = {
        width: '50px',
        height: '50px',
    };

    const sidebar = {
        minWidth: '80px',
        width: '16%',
        height: '100%',
        whiteSpace: 'nowrap',
    };
    const isEventPage = location.pathname.toLowerCase().includes('/admin/events');
    const Email = Cookies.get("AdminEmail");
    const secretKey = "admin-_?info";
    const bytes = CryptoJS.AES.decrypt(Email, secretKey);
    const FullUsername = bytes.toString(CryptoJS.enc.Utf8);
    const tenUsername = FullUsername.length > 7 ? FullUsername.slice(0, 7) + "..." : FullUsername;

    return(
        <div className="sidebar d-flex flex-column position-fixed flex-shrink-0 p-1 bg-dark border-end" style={sidebar}>
              <div className="text-white w-100 text-white text-center">
                  <a href="/" className="link-light text-decoration-none text-white text-center">
                      <span className=" fs-4 text-white">
                          <img className="rounded " style={logo} src={he} alt=""></img>
                      </span>
                  </a>
              </div>
              <hr className="bg-white"></hr>
              <ul className="sidebar_1 nav nav-pills flex-column mb-auto w-100">
                  <li className="nav-item w-100 " >

                  <Accordion className='bg-dark' activeKey={dropdownStates['/admin/dashboard'] ? 'dashboard' : null}>
                        <Card className=' border-0 bg-dark '>
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/dashboard'] ? 'bg-light text-black' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/dashboard')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse"
                                    aria-expanded="true"
                                >
                                    <FiPieChart size={25} /><div className="d-none d-md-block">Dash</div>
                                </button>
                            <Accordion.Collapse eventKey="dashboard">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled pb-1 small d-block list-group">
                                        <li><a href="#overview" className="link-light text-white-50 w-100 btn m-0 p-0">Overview</a></li>
                                        <li><a href="#updates" className="link-light text-white-50 w-100 btn m-0 p-0">Updates</a></li>
                                        <li><a href="#reports" className="link-light text-white-50 w-100 btn m-0 p-0">Reports</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                  </li>
                  <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/admin/Complaints'] ? 'complaints' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button 
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/Complaints'] ? 'bg-light text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/Complaints')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse1"
                                    aria-expanded="false"
                                >
                                    <FiTrello size={25}/><div className="d-none d-md-block">Complaint</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="complaints">
                                
                                    <ul className="btn-toggle-nav py-2 py-2 py-2list-unstyled small d-block list-group">
                                        <li><a href="#overview"  className="link-light text-white-50 w-100 btn m-0 p-0">Overview</a></li>
                                        <li><a href="#updates"  className="link-light text-white-50 w-100 btn m-0 p-0">Updates</a></li>
                                        <li><a href="/admin/Complaints/MoreInfo"  className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Complaints/MoreInfo' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>MoreInfo</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
                {/* Events */}
                <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={isEventPage ? 'events' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${isEventPage ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/Events')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse2"
                                    aria-expanded="false"
                                >
                                    <FiFileText size={25} /><div className="d-none d-md-block">Events</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="events">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled small d-block list-group">
                                        <li>
                                            <a href='/admin/Events/Fullview' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Events/Fullview' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Fullview</a>
                                            </li><li>
                                            <a href='/admin/Events/EventFormCreation' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Events/EventFormCreation' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Create</a>
                                            </li>
                                        <li><a href="#reports" className="link-light text-white-50 w-100 btn m-0 p-0">Reports</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
                <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/admin/Activity'] ? 'activity' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/Activity'] ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/Activity')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse3"
                                    aria-expanded="false"
                                >
                                    <FiCheckCircle  size={25}/><div className="d-none d-md-block">Activity</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="activity">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled small d-block list-group">
                                        <li><a href="#overview" className="link-light text-white-50 w-100 btn m-0 p-0">Overview</a></li>
                                        <li><a href="#updates" className="link-light text-white-50 w-100 btn m-0 p-0">Updates</a></li>
                                        <li><a href="#reports" className="link-light text-white-50 w-100 btn m-0 p-0">Reports</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
                {/* Event */}
                <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/admin/History'] ? 'history' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/History'] ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`}
                                    onClick={() => handledirect('/admin/History')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse4"
                                    aria-expanded="false"
                                >
                                    <FiLayers  size={25}/><div className="d-none d-md-block">History</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="history">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled small d-block list-group">
                                        <li><a href="#overview" className="link-light text-white-50 w-100 btn m-0 p-0">Overview</a></li>
                                        <li><a href="#updates" className="link-light text-white-50 w-100 btn m-0 p-0">Updates</a></li>
                                        <li><a href="#reports" className="link-light text-white-50 w-100 btn m-0 p-0">Reports</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
                {/* Account */}
                <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/admin/PersonalInfo'] ? 'PersonalInfo' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/PersonalInfo'] ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`}
                                    onClick={() => handledirect('/admin/PersonalInfo')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse4"
                                    aria-expanded="false"
                                >
                                    <FiUser  size={25}/><div className="d-none d-md-block">Account</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="PersonalInfo">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled small d-block list-group">
                                        <li><a href="/admin/PersonalInfo/Contact" className="link-light text-white-50 w-100 btn m-0 p-0">Contact Admin</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
              </ul>
              <hr></hr>
                  <div className="dropdown text-center">
                      <button className="btn bg-transparent text-center w-100 align-items-center link-light text-decoration-none" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src={he} alt="" width="32" height="32" className="rounded-circle me-2 border border-white border-3"></img>
                          <strong className="text-white d-none d-md-block">{tenUsername}</strong>
                        </button>
                      <ul className="w-100 dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                          <li><a className="dropdown-item" href="/">Home</a></li>
                          <li><a className="dropdown-item" href="/about">About</a></li>
                          <li><a className="dropdown-item" href="/Contact">Contact</a></li>
                          <li><hr className="dropdown-divider"></hr></li>
                          <li><button className="dropdown-item" href="#" onClick={handlelogout}><FiLogOut className='mx-2'/>Sign out</button></li>
                      </ul>
                  </div>
        </div>
    );
}
export default Sidebar1;

