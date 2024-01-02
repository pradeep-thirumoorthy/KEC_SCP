import { Button, Layout ,Typography} from 'antd';
import React, { useState, useEffect } from 'react';
import { FiFileText, FiTrello, FiPieChart, FiCheckCircle, FiLayers,FiLogOut } from 'react-icons/fi';
import { useStudentAuth } from './Authenticate/StudentAuthContext';
import { useNavigate, useLocation } from 'react-router';
import CryptoJS from 'crypto-js';
import he from '../images/1ec5967d-b9f1-46bc-b0df-af793c5d868d-1532534529493-school-pic.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from 'antd/es/typography/Link';
import { Footer, Header } from 'antd/es/layout/layout';
const {  Content, Sider } = Layout;

const Layout2 = ({element,data=[]}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useStudentAuth();
    const [dropdownStates, setDropdownStates] = useState({});
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const {Title}=Typography;


  const [selectedTheme, setSelectedTheme] = useState('light');
  const setTheme = (theme) => {
    window.location.reload();
    setSelectedTheme(theme);
    localStorage.setItem('theme', theme);
  };



  const isWideLayout = window.innerWidth > 991;
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    }
    console.log(selectedTheme);
    const foldersToCheck = [
        '/student/dashboard',
        '/student/Complaints',
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
      >
        <div style={{height:'100vh',display:'flex', flexDirection:'column',alignItems: 'flex-end'}}>
              <div className={` w-100 text-center`}>
                  <Link  href="/" className={`link-light text-decoration-none text-white text-center`}>
                      <Typography className={` fs-4 text-white`}>
                          <img className="rounded " style={logo} src={he} alt=""></img>
                      </Typography>
                  </Link>
              </div>
              <hr className={`bg-white`}></hr>
              <ul className={`sidebar_1 nav nav-pills flex-column mb-auto w-100`}>
                  <li className={`nav-item w-100 `}>

                  <Accordion  activeKey={dropdownStates['/student/dashboard'] ? 'dashboard' : null}>
                        
                                <Button
                                    type="Button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/dashboard'] ? 'bg-white text-dark' : 'bg-transparent text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/student/dashboard')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse"
                                    aria-expanded="true"
                                >
                                    <FiPieChart size={25} /><div className=''>Dashboard</div>
                                </Button>
                            <Accordion.Collapse eventKey="dashboard">
                                
                                    <ul className={`btn-toggle-nav list-unstyled pb-1 small d-block list-group w-100`}>
                                        <li><Link  href="#overview" className={`link-light text-white-50 w-100 btn px-0 px-lg-0 `}>Overview</Link></li>
                                        <li><Link  href="#updates" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Updates</Link></li>
                                        <li><Link  href='/student/dashboard/Calendar' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/dashboard/Calendar' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Calendar</Link></li>
                                        
                                    </ul>
                                
                            </Accordion.Collapse>
                    </Accordion>
                  </li>
                  <li className={`nav-item w-100 `}>
                    <Accordion activeKey={dropdownStates['/student/Complaints'] ? 'complaints' : null}>
                        
                            
                                <Button 
                                    type="Button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/Complaints'] ? 'bg-white text-dark' : 'bg-transparent text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/student/Complaints')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse1"
                                    aria-expanded="false"
                                >
                                    <FiTrello size={25}/><div className=''>Complaints</div>
                                </Button>
                            
                            <Accordion.Collapse eventKey="complaints">
                                
                                    <ul className={`btn-toggle-nav list-unstyled pb-1 small d-block list-group w-100`}>
                                    <li><Link  href='/student/Complaints/Academic' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaints/Academic' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Academic</Link></li>
                                    <li><Link  href='/student/Complaints/Maintenance' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaints/Maintenance' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Maintenance</Link></li>
                                    <li><Link  href='/student/Complaints/Lab' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaints/Lab' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Lab</Link></li>
                                    <li><Link  href='/student/Complaints/Courses' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaints/Courses' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Courses</Link></li>
                                    <li><Link  href='/student/Complaints/Faculty' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaints/Faculty' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Respective Faculty</Link></li>
                                    <li><Link  href='/student/Complaints/Others' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Complaints/Others' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Others</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                    </Accordion>
                </li>
                {/* Events */}
                <li className={`nav-item w-100 `}>
                    <Accordion activeKey={dropdownStates['/student/EventForm'] ? 'events' : null}>
                        
                            
                                <Button
                                    type="Button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/EventForm'] ? 'bg-white text-dark' : 'bg-transparent text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/student/EventForm')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse2"
                                    aria-expanded="false"
                                >
                                    <FiFileText size={25} /><div className=''>Event</div>
                                </Button>
                            
                            <Accordion.Collapse eventKey="events">
                                
                                    <ul className={`btn-toggle-nav list-unstyled small d-block list-group`}>
                                        <li>
                                            
                                        <Link  href='/student/Events/EventFormCreation' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Events/EventFormCreation' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>FormCreation</Link></li>
                                        <li><Link  href="#updates" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>CreateForm</Link></li>
                                        <li><Link  href="#reports" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Reports</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                    </Accordion>
                </li>
                <li className={`nav-item w-100 `}>
                    <Accordion activeKey={dropdownStates['/student/Activity'] ? 'activity' : null}>
                        
                            
                                <Button
                                    type="Button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/Activity'] ? 'bg-white text-dark' : 'bg-transparent text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/student/Activity')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse3"
                                    aria-expanded="false"
                                >
                                    <FiCheckCircle  size={25}/><div className=''>Activity</div>
                                </Button>
                            
                            <Accordion.Collapse eventKey="activity">
                                
                                    <ul className={`btn-toggle-nav list-unstyled small d-block list-group`}>
                                        <li><div href='/student/Activity/Panel' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Activity/Panel' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Detail</div></li>
                                        <li><Link href='/student/Activity/Faculty' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/Activity/Faculty' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Faculty</Link></li>
                                        <li><Link  href="#updates" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Updates</Link></li>
                                        <li><Link  href="#reports" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Reports</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                    </Accordion>
                </li>
                {/* Event */}
                <li className={`nav-item w-100  `}>
                    <Accordion activeKey={dropdownStates['/student/History'] ? 'history' : null}>
                        
                            
                                <Button
                                    type="Button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center d-flex justify-content-center align-items-center  px-0 ${dropdownStates['/student/History'] ? 'bg-white text-dark' : 'bg-transparent text-light'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`}
                                    onClick={() => handledirect('/student/History')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse4"
                                    aria-expanded="false"
                                >
                                    <FiLayers  size={25}/><div className=''>History</div>
                                </Button>
                            
                            <Accordion.Collapse eventKey="history">
                                
                                    <ul className={`btn-toggle-nav list-unstyled small d-block list-group`}>
                                        
                                    <li><div href='/student/History/Panel' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/student/History/Panel' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Detail</div></li>
                                        <li><Link  href="#updates" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Updates</Link></li>
                                        <li><Link  href="#reports" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Reports</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                    </Accordion>
                </li>

                {/* Updates */}
                {/* <li className={`nav-item w-100 `}>
                    <Accordion activeKey={dropdownStates['/student/Updates'] ? 'updates' : null}>
                        
                            
                                <Button
                                    type="Button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${dropdownStates['/student/Updates'] ? 'bg-white text-dark' : 'bg-transparent text-light'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`}
                                    onClick={() => handledirect('/student/Updates')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse5"
                                    aria-expanded="false"
                                >
                                    <FiSlack  size={25}/><div className=''>Updates</div>
                                </Button>
                            
                            <Accordion.Collapse eventKey="updates">
                                
                                    <ul className={`btn-toggle-nav list-unstyled small d-block list-group`}>
                                        <li><Link  href="#overview" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Overview</Link></li>
                                        <li><Link  href="#updates" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Updates</Link></li>
                                        <li><Link  href="#reports" className={`link-light text-white-50 w-100 btn px-0 px-lg-0`}>Reports</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>
                    </Accordion>
                </li> */}
                {/* createPost */}
                {/* <li className={`nav-item w-100 `}>
                    <Button className={`btn btn-toggle d-flex justify-content-center align-items-center px-0 ${location.pathname === '/student/createPost' ? 'bg-white text-dark diabled' : 'bg-white bg-opacity-25 text-white'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`} onClick={() => handledirect('/student/createPost')}>
                        <FiPlusSquare  size={25}/><div className=''>Post</div>
                    </Button>
                </li> */}
              </ul>
              <hr></hr>
                  <div className="w-100 text-center">
                      <Button className={`btn bg-transparent text-center link-light text-white-50 w-100 align-items-center d-flex justify-content-center`} id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src={he} alt="" width="32" height="32" className="rounded-circle me-2 border border-white border-3"></img>
                              {tenUsername}
                        </Button>
                      <ul className="w-100 dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                          <li><Link  className="dropdown-item" href="/">Home</Link></li>
                          <li><Link  className="dropdown-item" href="/about">About</Link></li>
                          <li><Link  className="dropdown-item" href="/Contact">Contact</Link></li>
                          <li><Button className="dropdown-item btn" onClick={() => setTheme(selectedTheme === 'dark' ? 'light' : 'dark')}>
        {selectedTheme} Theme
      </Button></li>
                          <li><hr className="dropdown-divider"></hr></li>
                          <li><Button className="dropdown-item" href="#" onClick={handlelogout}><FiLogOut className='mx-2'/>Sign out</Button></li>
                      </ul>
                  </div>
        </div>
      </Sider>
      <Layout style={{ marginLeft: isWideLayout ? '200px' : '0'}}>
        <Header
          style={{
            padding:0,
            paddingLeft:'2px',
            backgroundColor:'transparent',
            borderBottom:'2px solid #858585'
          }}
          
        >
          <div>
          <Title level={1} style={{fontFamily:'sans-serif',fontStyle:'italic'}}>{data[0]}</Title>
          <p style={{fontStyle:'oblique',}}>{data[1]}</p>
          </div>
        </Header>
        <Content style={{ margin: '24px 0px 0', overflow: 'initial' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {element}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Kongu Grievance System
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Layout2;

