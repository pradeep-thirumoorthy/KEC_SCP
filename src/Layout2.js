import { Layout, theme } from 'antd';
import React, { useState, useEffect } from 'react';
import { FiFileText, FiTrello, FiPieChart, FiCheckCircle, FiLayers,FiLogOut } from 'react-icons/fi';
import { useStudentAuth } from './student/StudentAuthContext';
import { useNavigate, useLocation } from 'react-router';
import CryptoJS from 'crypto-js';
import he from './images/1ec5967d-b9f1-46bc-b0df-af793c5d868d-1532534529493-school-pic.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
const {  Content, Sider } = Layout;

const Layout2 = ({element}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useStudentAuth();
    const [dropdownStates, setDropdownStates] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    


  const [selectedTheme, setSelectedTheme] = useState('light'); // Default theme
  // Function to set the theme based on user selection
  const setTheme = (theme) => {
    setSelectedTheme(theme);
    localStorage.setItem('theme', theme); // Save theme preference to localStorage
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    }
  }, []);


  const isWideLayout = window.innerWidth > 991;
  const customTheme = {
    ...theme,
    textColorPrimary: selectedTheme === 'dark' ? '#ffffff' : 'dark', // Example text color based on theme
    backgroundColorPrimary: selectedTheme === 'dark' ? '#212529' : '#ffffff', // Example background color based on theme
    // Add more customizations as needed...
  };
  // Update windowWidth when the window is resized
  useEffect(() => {
    console.log(selectedTheme);
    const foldersToCheck = [
        '/student/dashboard',
        '/student/Complaint',
        '/student/ComplaintEntry',
        '/student/EventForm',
        '/student/Activity',
        '/student/History',
        '/student/Updates',
        '/student/createPost',
    ];
    const dropdownStatesUpdates = {};

    foldersToCheck.forEach((folder) => {
        dropdownStatesUpdates[folder] = location.pathname.startsWith(folder);
    });

    setDropdownStates(dropdownStatesUpdates);
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
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
    
    navigate("/student/login");
};

const logo = {
    width: '50px',
    height: '50px',
};
const Email = sessionStorage.getItem("StudentEmail");
const secretKey = "student-_?info";
const bytes = CryptoJS.AES.decrypt(Email, secretKey);
const FullUsername = bytes.toString(CryptoJS.enc.Utf8);
const tenUsername = FullUsername.length > 7 ? FullUsername.slice(0, 7) + "..." : FullUsername;
  return (
    
    <Layout>
      <Sider theme={(selectedTheme==='light')?'dark':'light'} style={{height:'100vh',position:'fixed',zIndex:'5'}}
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div style={{height:'100vh',display:'flex', flexDirection:'column',alignItems: 'flex-end'}}>
              <div className=" w-100 text-center">
                  <a href="/" className="link-light text-decoration-none text-white text-center">
                      <span className=" fs-4 text-white">
                          <img className="rounded " style={logo} src={he} alt=""></img>
                      </span>
                  </a>
              </div>
              <hr className="bg-white"></hr>
              <ul className="sidebar_1 nav nav-pills flex-column mb-auto w-100">
                  <li className="nav-item w-100 " >

                  <Accordion className='' activeKey={dropdownStates['/student/dashboard'] ? 'dashboard' : null}>
                        <Card className=' border-0 bg-dark '>
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/dashboard'] ? 'bg-light text-black' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/student/dashboard')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse"
                                    aria-expanded="true"
                                >
                                    <FiPieChart size={25} /><div className=''>Dashboard</div>
                                </button>
                            <Accordion.Collapse eventKey="dashboard">
                                
                                    <ul className="btn-toggle-nav list-unstyled pb-1 small d-block list-group w-100">
                                        <li><a href="#overview" className="link-light text-white-50 w-100 btn px-0 px-lg-0 ">Overview</a></li>
                                        <li><a href="#updates" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Updates</a></li>
                                        <li><a href='/student/dashboard/Calendar' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/dashboard/Calendar' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Calendar</a></li>
                                        
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                  </li>
                  <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/student/Complaint'] ? 'complaints' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button 
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/Complaint'] ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/student/Complaint')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse1"
                                    aria-expanded="false"
                                >
                                    <FiTrello size={25}/><div className=''>Complaints</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="complaints">
                                
                                    <ul className="btn-toggle-nav list-unstyled pb-1 small d-block list-group w-100">
                                    <li><a href='/student/Complaint/Academic' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaint/Academic' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Academic</a></li>
                                    <li><a href='/student/Complaint/Maintenance' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaint/Maintenance' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Maintenance</a></li>
                                    <li><a href='/student/Complaint/Lab' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaint/Lab' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Lab</a></li>
                                    <li><a href='/student/Complaint/Courses' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaint/Courses' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Courses</a></li>
                                    <li><a href='/student/Complaint/Faculty' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaint/Faculty' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Respective Faculty</a></li>
                                    <li><a href='/student/Complaint/Others' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaint/Others' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Others</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
                {/* Events */}
                <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/student/EventForm'] ? 'events' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/EventForm'] ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/student/EventForm')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse2"
                                    aria-expanded="false"
                                >
                                    <FiFileText size={25} /><div className=''>Eventform</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="events">
                                
                                    <ul className="btn-toggle-nav list-unstyled small d-block list-group">
                                        <li>
                                            
                                        <a href='/student/Events/EventFormCreation' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Events/EventFormCreation' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>FormCreation</a></li>
                                        <li><a href="#updates" className="link-light text-white-50 w-100 btn px-0 px-lg-0">CreateForm</a></li>
                                        <li><a href="#reports" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Reports</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
                <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/student/Activity'] ? 'activity' : null}>
                        <Card className=' border-0 '>
                            
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/Activity'] ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/student/Activity')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse3"
                                    aria-expanded="false"
                                >
                                    <FiCheckCircle  size={25}/><div className=''>Activity</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="activity">
                                
                                    <ul className="btn-toggle-nav list-unstyled small d-block list-group">
                                    <li><div href='/student/Activity/Panel' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Activity/Panel' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Detail</div></li>
                                        <li><a href="#updates" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Updates</a></li>
                                        <li><a href="#reports" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Reports</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>
                {/* Event */}
                <li className="nav-item w-100  " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/student/History'] ? 'history' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center d-flex justify-content-center align-items-center  px-0 ${dropdownStates['/student/History'] ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`}
                                    onClick={() => handledirect('/student/History')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse4"
                                    aria-expanded="false"
                                >
                                    <FiLayers  size={25}/><div className=''>History</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="history">
                                
                                    <ul className="btn-toggle-nav list-unstyled small d-block list-group">
                                        
                                    <li><div href='/student/History/Panel' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/History/Panel' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Detail</div></li>
                                        <li><a href="#updates" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Updates</a></li>
                                        <li><a href="#reports" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Reports</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li>

                {/* Updates */}
                {/* <li className="nav-item w-100 " >
                    <Accordion className='bg-dark'activeKey={dropdownStates['/student/Updates'] ? 'updates' : null}>
                        <Card className=' border-0 bg-dark '>
                            
                                <button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/Updates'] ? 'bg-white text-dark' : 'bg-dark text-white'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`}
                                    onClick={() => handledirect('/student/Updates')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse5"
                                    aria-expanded="false"
                                >
                                    <FiSlack  size={25}/><div className=''>Updates</div>
                                </button>
                            
                            <Accordion.Collapse eventKey="updates">
                                
                                    <ul className="btn-toggle-nav list-unstyled small d-block list-group">
                                        <li><a href="#overview" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Overview</a></li>
                                        <li><a href="#updates" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Updates</a></li>
                                        <li><a href="#reports" className="link-light text-white-50 w-100 btn px-0 px-lg-0">Reports</a></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </li> */}
                {/* createPost */}
                {/* <li className="nav-item w-100 " >
                    <button className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${location.pathname === '/student/createPost' ? 'bg-white text-dark diabled' : 'bg-white bg-opacity-25 text-white'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`} onClick={() => handledirect('/student/createPost')}>
                        <FiPlusSquare  size={25}/><div className=''>Post</div>
                    </button>
                </li> */}
              </ul>
              <hr></hr>
                  <div className="w-100 text-center">
                      <button className="btn bg-transparent text-center w-100 align-items-center link-light text-decoration-none d-flex justify-content-center" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src={he} alt="" width="32" height="32" className="rounded-circle me-2 border border-white border-3"></img>
                              {tenUsername}
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
      </Sider>
      <Layout style={{ marginLeft: isWideLayout ? '200px' : '0'}}>
        <Content
          style={{
            background: selectedTheme === 'dark' ? '#212529' : '#ffffff', // Apply background based on theme
            color: selectedTheme === 'dark' ? '#ffffff' : '#000000', // Apply text color based on theme
          }}
        >
          <div
            style={{
              minHeight: 360,
            }}
          >
            <button onClick={() => setTheme(selectedTheme === 'dark' ? 'light' : 'dark')}>
        Toggle Theme
      </button>
            {element}
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};
export default Layout2;

