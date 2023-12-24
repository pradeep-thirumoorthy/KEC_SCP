import { Layout, theme,Button,Typography } from 'antd';
import React, { useState, useEffect } from 'react';
import { FiFileText, FiTrello, FiPieChart, FiCheckCircle, FiLayers, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from './admin/AuthContext';
import { useNavigate, useLocation } from 'react-router';
import CryptoJS from 'crypto-js';
import he from './images/1ec5967d-b9f1-46bc-b0df-af793c5d868d-1532534529493-school-pic.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Accordion from 'react-bootstrap/Accordion';
import checkEmail from './FacultyAccess';
import Card from 'react-bootstrap/Card';
import Link from 'antd/es/typography/Link';
const {  Content, Sider } = Layout;
const Layout1 = ({element}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { logout } = useAuth();
    const [dropdownStates, setDropdownStates] = useState({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [checkedEmail, setCheckedEmail] = useState(false);
    const [selectedTheme, setSelectedTheme] = useState('light'); 
  // Update windowWidth when the window is resized
  const setTheme = (theme) => {
    window.location.reload();
    setSelectedTheme(theme);
    localStorage.setItem('theme', theme);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await checkEmail(); // Assuming checkEmail is an asynchronous function
        setCheckedEmail(result);
      } catch (error) {
        // Handle error if the promise rejects
        console.error('Error checking email:', error);
      }
    };
  
    fetchData();
  }, []);
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      setSelectedTheme(storedTheme);
    }
    console.log(selectedTheme);

    const foldersToCheck = [
        '/admin/dashboard',
        '/admin/Complaints',
        '/admin/Events',
        '/admin/Activity',
        '/admin/History',
        '/admin/PersonalInfo',
        '/admin/createPost',
        '/admin/Faculty',
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
    
    navigate("/admin/login");
};

const logo = {
    width: '50px',
    height: '50px',
};
const Email = sessionStorage.getItem('AdminEmail');
const secretKey = "admin-_?info";
const bytes = CryptoJS.AES.decrypt(Email, secretKey);
const FullUsername = bytes.toString(CryptoJS.enc.Utf8);
const tenUsername = FullUsername.length > 7 ? FullUsername.slice(0, 7) + "..." : FullUsername;


  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const isWideLayout = windowWidth > 991;
  return (
    
    <Layout>
      <Sider style={{height:'100vh',position:'fixed',zIndex:'5'}}
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
              <hr className="bg-white "></hr>
              <ul className="nav nav-pills flex-column w-100">
                  <li className="nav-item w-100 " >

                  <Accordion  activeKey={dropdownStates['/admin/dashboard'] ? 'dashboard' : null}>

                                <Button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/dashboard'] ? 'bg-white text-dark' : 'bg-transparent '+'text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/dashboard')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse"
                                    aria-expanded="true"
                                >
                                    <FiPieChart size={25} />Dash
                                </Button>
                            <Accordion.Collapse eventKey="dashboard">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled pb-1 small d-block list-group">
                                        <li><Link  href="#overview" className="link-light text-white-50 w-100 btn m-0 p-0">Overview</Link></li>
                                        <li><Link  href="#updates" className="link-light text-white-50 w-100 btn m-0 p-0">Updates</Link></li>
                                        <li><Link  href="/admin/dashboard/Calendar"  className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/dashboard/Calendar' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Calendar</Link></li>
                                   </ul>
                                
                            </Accordion.Collapse>

                    </Accordion>
                  </li>
                  <li className="nav-item w-100 " >
                    <Accordion activeKey={dropdownStates['/admin/Complaints'] ? 'complaints' : null}>

                            
                                <Button 
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/Complaints'] ? 'bg-white text-dark' : 'bg-transparent '+'text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/Complaints')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse1"
                                    aria-expanded="false"
                                >
                                    <FiTrello size={25}/>Complaint
                                </Button>
                            
                            <Accordion.Collapse eventKey="complaints">
                                
                                    <ul className="btn-toggle-nav py-2 py-2 py-2list-unstyled small d-block list-group">
                                        <li><Link  href="#overview"  className="link-light text-white-50 w-100 btn m-0 p-0">Overview</Link></li>
                                        <li><Link  href="/admin/Complaints/MoreInfo"  className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Complaints/MoreInfo' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>MoreInfo</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>

                    </Accordion>
                    
                </li>
                {(checkedEmail)?<><li className="nav-item w-100 " >
                    <Accordion activeKey={dropdownStates['/admin/Faculty'] ? 'Faculty' : null}>

                            
                                <Button 
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/Faculty'] ? 'bg-white text-dark' : 'bg-transparent '+'text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/Faculty')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse1"
                                    aria-expanded="false"
                                >
                                    <FiTrello size={25}/>Faculty
                                </Button>
                            
                            <Accordion.Collapse eventKey="Faculty">
                                
                                    <ul className="btn-toggle-nav py-2 py-2 py-2list-unstyled small d-block list-group">
                                        <li><Link  href="/admin/Faculty"  className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Faculty' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Faculty</Link></li>
                                        <li><Link  href="/admin/Faculty/Panel" className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Faculty/Panel' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>FacultyInfo</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>

                    </Accordion>
                </li></>:<></>}
                {/* Events */}
                <li className="nav-item w-100 " >
                    <Accordion activeKey={dropdownStates['/admin/Events'] ? 'events' : null}>

                            
                                <Button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/Events'] ? 'bg-white text-dark' : 'bg-transparent '+'text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/Events')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse2"
                                    aria-expanded="false"
                                >
                                    <FiFileText size={25} />Events
                                </Button>
                            
                            <Accordion.Collapse eventKey="events">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled small d-block list-group">
                                        <li>
                                            <Link  href='/admin/Events/Fullview' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Events/Fullview' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Fullview</Link>
                                            </li><li>
                                            <Link  href='/admin/Events/EventFormCreation' className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Events/EventFormCreation' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Create</Link>
                                            </li>
                                            <li>
                                                <Typography className={` w-100 btn m-0 p-0 border-0 ${(location.pathname.includes('/admin/Events/') && location.pathname.includes('/modify')) ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Modify</Typography>
                                            </li>
                                            <li>
                                            <Typography className={` w-100 btn m-0 p-0 border-0 ${(location.pathname.includes('/admin/Events/') && location.pathname.includes('/response')) ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>Response</Typography>
                                            </li>
                                    </ul>
                                
                            </Accordion.Collapse>

                    </Accordion>
                </li>
                <li className="nav-item w-100 " >
                    <Accordion activeKey={dropdownStates['/admin/Activity'] ? 'activity' : null}>

                            
                                <Button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/Activity'] ? 'bg-white text-dark' : 'bg-transparent '+'text-light'} nav-link active w-100 align-items-center text-center rounded collapsed`}
                                    onClick={() => handledirect('/admin/Activity')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse3"
                                    aria-expanded="false"
                                >
                                    <FiCheckCircle  size={25}/>Activity
                                </Button>
                            
                            <Accordion.Collapse eventKey="activity">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled small d-block list-group">
                                        <li><Link  href="#overview" className="link-light text-white-50 w-100 btn m-0 p-0">Overview</Link></li>
                                        <li><Link  href="#updates" className="link-light text-white-50 w-100 btn m-0 p-0">Updates</Link></li>
                                        <li><Link  href="/admin/Activity/Panel"  className={` w-100 btn m-0 p-0 border-0 ${location.pathname === '/admin/Activity/Panel' ? 'text-white' : 'link-light text-white-50'}  active w-100 align-items-center text-center rounded collapsed`}>MoreInfo</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>

                    </Accordion>
                </li>
                {/* Event */}
                <li className="nav-item w-100 " >
                    <Accordion activeKey={dropdownStates['/admin/History'] ? 'history' : null}>

                            
                                <Button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/History'] ? 'bg-white text-dark' : 'bg-transparent '+'text-light'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`}
                                    onClick={() => handledirect('/admin/History')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse4"
                                    aria-expanded="false"
                                >
                                    <FiLayers  size={25}/>History
                                </Button>
                            
                            <Accordion.Collapse eventKey="history">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled small d-block list-group">
                                        <li><Link  href="#overview" className="link-light text-white-50 w-100 btn m-0 p-0">Overview</Link></li>
                                        <li><Link  href="#updates" className="link-light text-white-50 w-100 btn m-0 p-0">Updates</Link></li>
                                        <li><Link  href="#reports" className="link-light text-white-50 w-100 btn m-0 p-0">Reports</Link></li>
                                    </ul>
                                
                            </Accordion.Collapse>

                    </Accordion>
                </li>
                {/* Account */}
                <li className="nav-item w-100 " >
                    <Accordion activeKey={dropdownStates['/admin/PersonalInfo'] ? 'PersonalInfo' : null}>

                            
                                <Button
                                    type="button"
                                    className={`btn btn-toggle d-flex justify-content-center align-items-center ${dropdownStates['/admin/PersonalInfo'] ? 'bg-white text-dark' : 'bg-transparent '+'text-light'} nav-link active w-100 align-items-center text-center rounded collapsed mb-2`}
                                    onClick={() => handledirect('/admin/PersonalInfo')}
                                    data-bs-toggle="collapse"
                                    data-bs-target="#home-collapse4"
                                    aria-expanded="false"
                                >
                                    <FiUser  size={25}/>Account
                                </Button>
                            
                            <Accordion.Collapse eventKey="PersonalInfo">
                                
                                    <ul className="btn-toggle-nav py-2 py-2list-unstyled small d-block list-group">
                                        {/* <li><Link  href="/admin/PersonalInfo/Contact" className="link-light text-white-50 w-100 btn m-0 p-0">Contact Admin</Link></li> */}
                                    </ul>
                                
                            </Accordion.Collapse>

                    </Accordion>
                </li>
              </ul>
                  <div className="w-100 text-center mt-auto mb-5 mb-sm-0">
                      <Button className={`btn bg-transparent text-center link-light text-white-50 w-100 align-items-center d-flex justify-content-center`} id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
                          <img src={he} alt="" width="32" height="32" className="rounded-circle me-2 border border-white border-3"></img>
                              {tenUsername}
                        </Button>
                      <ul className="w-100 dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
                          <li><Link  className="dropdown-item" href="/">Home</Link></li>
                          <li><Link  className="dropdown-item" href="/about">About</Link></li>
                          <li><Link  className="dropdown-item" href="/Contact">Contact</Link></li>
                          <li><hr className="dropdown-divider"></hr></li><li><Button className="dropdown-item btn" onClick={() => setTheme(selectedTheme === 'dark' ? 'light' : 'dark')}>
        {selectedTheme} Theme
      </Button></li>
                          <li><Button className="dropdown-item" href="#" onClick={handlelogout}><FiLogOut className='mx-2'/>Sign out</Button></li>
                      </ul>
                  </div>
        </div>
      </Sider>
      <Layout style={{ marginLeft: isWideLayout ? '200px' : '0' }}>
        
        <Content>
          <div
            style={{
              minHeight: 360,
              background:colorBgContainer,
            }}
          >
            {element}
          </div>
        </Content>
        
      </Layout>
    </Layout>
  );
};
export default Layout1;

