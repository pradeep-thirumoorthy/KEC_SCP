import { Avatar, Button, Collapse, ConfigProvider, Layout ,List,Popover,Typography} from 'antd';
import React, { useState, useEffect } from 'react';
import {FileTextOutlined,ProjectOutlined,GroupOutlined,PieChartOutlined,CheckCircleOutlined,LogoutOutlined} from '@ant-design/icons';
import { useStudentAuth } from './Authenticate/StudentAuthContext';
import { useNavigate, useLocation } from 'react-router';
import he from '../images/1ec5967d-b9f1-46bc-b0df-af793c5d868d-1532534529493-school-pic.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'antd/es/typography/Link';
import { Footer, Header } from 'antd/es/layout/layout';
import { geteduEmailFromSession } from './Emailretrieval';
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

  const panels = [
    {
      key: 'dashboard',
      icon: <PieChartOutlined style={{ fontSize: '20px', color: '#08c' }} />,
      title: 'Dashboard',
      links: [
        { href: "#overview", text: "Overview" },
        { href: "#updates", text: "Updates" },
        { href: "/student/dashboard/Calendar", text: "Calendar", key: 'calendar' },
      ],
    },
    {
      key: 'Complaints',
      icon: <ProjectOutlined style={{ fontSize: '20px', color: '#08c' }} />,
      title: 'Complaints',
      links: [
        
        { href: "/student/Complaints/Academic", text: "Academic", key: 'Academic' },
        { href: "/student/Complaints/Maintenance", text: "Maintenance", key: 'Maintenance' },
        { href: "/student/Complaints/Courses", text: "Courses", key: 'Courses' },
        { href: "/student/Complaints/Lab", text: "Lab", key: 'Lab' },
        { href: "/student/Complaints/Others", text: "Others", key: 'Others' },
        { href: "/student/Complaints/Faculty", text: "Faculty", key: 'Faculty' },
      ],
    },
    {
      key: 'Events',
      icon: <FileTextOutlined style={{ fontSize: '20px', color: '#08c' }} />,
      title: 'Events',
      links: [
        { href: "/student/Events/EventFormCreation", text: "Form Creation", key: 'formCreation' },
        { href: "#updates", text: "Create Form" },
        { href: "#reports", text: "Reports" },
      ],
    },
    {
      key: 'Activity',
      icon: <CheckCircleOutlined style={{ fontSize: '20px', color: '#08c' }} />,
      title: 'Activity',
      links: [
        { href: '/student/Activity/Panel', text: "Detail" },
        { href: '/student/Activity/Faculty', text: "Faculty" },
        { href: "#updates", text: "Updates" },
        { href: "#reports", text: "Reports" },
      ],
    },
    {
      key: 'History',
      icon: <GroupOutlined style={{ fontSize: '20px', color: '#08c' }} />,
      title: 'History',
      links: [
        { href: '/student/History/Panel', text: "Detail" },
        { href: '/student/History/Faculty', text: "Faculty" },
        { href: "#reports", text: "Reports" },
      ],
    },
  ];
  

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
        '/student/Events',
        '/student/Activity',
        '/student/History',
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
  }, [location, selectedTheme]);
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
const {Panel} =Collapse;
const FullUsername = geteduEmailFromSession();
const tenUsername = FullUsername.length > 7 ? FullUsername.slice(0, 7) + "..." : FullUsername;
const menuItems = [
  { title: 'Home', link: '/' },
  { title: 'About', link: '/about' },
  { title: 'Contact', link: '/contact' },
  { title: `${selectedTheme} Theme`, onClick: () => setTheme(selectedTheme === 'dark' ? 'light' : 'dark') },
  { title: 'Sign out', onClick: handlelogout, icon: <LogoutOutlined className='mx-2' /> },
];
const content = (
  <List
    size="small"
    dataSource={menuItems}
    renderItem={(item) => (
      <List.Item>
        {item.link ? (
          <Link className="dropdown-item text-center" href={item.link}>
            {item.title}
          </Link>
        ) : (
          <Button type='link' onClick={item.onClick}>
            {item.icon}
            {item.title}
          </Button>
        )}
      </List.Item>
    )}
  />
);
  return (
    
    <Layout>
      <Sider theme='dark' style={{height:'100vh',position:'fixed',zIndex:'5'}}
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
              <ConfigProvider
                theme={{
                  token: {
                    Collapse: {
                      padding:0,paddingXS:3,paddingSM:3,
                    },
                  },
                }}
              >
              {panels.map((panel) => (
                
                <Collapse
                  ghost
                  accordion={true}
                  activeKey={dropdownStates[`/student/${panel.key}`] ? [panel.key] : []}
                  className={`w-100 align-items-center text-center ${
                    location.pathname.includes(`/student/${panel.key}`) ? 'bg-white' : ''
                  }`}
                >
                  <Panel
                    style={{ padding: 0 }}
                    collapsible='header'
                    showArrow={false}
                    header={
                      <Button
                        type='link'
                        className={`w-100 align-items-center text-center ${
                          location.pathname.includes(`/student/${panel.key}`)
                            ? ''
                            : 'text-white'
                        } `}
                      >
                        {panel.icon} {panel.title}
                      </Button>
                    }
                    key={panel.key}
                    onClick={() => handledirect(`/student/${panel.key}`)}
                  >
                    <List
                      size='small'
                      style={{ padding: 0 }}
                      dataSource={panel.links}
                      renderItem={(item) => (
                        <List.Item>
                          <Link
                            href={item.href}
                            className={`w-100 align-items-center text-center ${
                              location.pathname === item.href ||
                              location.pathname.includes(item.key)
                                ? 'text-black'
                                : ' '
                            } `}
                          >
                            {item.text}
                          </Link>
                        </List.Item>
                      )}
                    />
                  </Panel>
                </Collapse>
              
            ))}
            
            </ConfigProvider>
              <hr></hr>
              <div className="w-100 text-center mt-auto mb-5 mb-sm-0">
                    <Popover content={content} trigger="hover" placement="top">
                      <Button className="btn bg-transparent text-center link-light text-white-50 w-100 align-items-center d-flex justify-content-center" id="dropdownUser2">
                        <Avatar src={he} alt="" width="32" height="32" className="rounded-circle me-2 border border-white border-3" />
                        {tenUsername}
                      </Button>
                    </Popover>
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

