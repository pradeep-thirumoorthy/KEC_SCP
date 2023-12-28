import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './admin/AuthContext';
import { StudentAuthProvider,useStudentAuth} from './student/StudentAuthContext';
import FNF from './FNF';
import Home from './Home';
import About from './About';
import Contact from './Contact';



import { Login,ForgAdmPass,Dash,Complaintsview,CreatePost,EventFormCreation,Activity,Admincalendar,Updates,History,FullEvents,Forward,ActivityPanel,PersonalInfo,Eventviewresp,EventModifier,Events, FacultyInfo } from './admin';

import {StudentLogin,StudentDash,Complaint, Histandtrends,EventForm,ForgetPass,StudentActivityPanel,StudentActivity, Nfcalendar} from './student/index';
import {Academic,Others,Maintenance,Faculty,Lab,Courses} from "./student/index";
import Layout1 from './Layout';
import { useState } from 'react';
import { useEffect } from 'react';
import Layout2 from './Layout2';

import Forward2 from './admin/Complaint/MoreInfo2';

import { EventInfoWrapper, StudentHistory } from './student';
import { ConfigProvider, Spin,Typography,theme } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Facultyview from './admin/Complaint/Facultyview';
import checkEmail from './FacultyAccess';
import CSVReaderComponent from './master_admin/upload';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('theme');
    
    console.log('kdhdbhjdd '+storedDarkMode);
    if (storedDarkMode==='dark') {
      setDarkMode(true);
    }
    else{
      setDarkMode(false);
    }
    console.log('kdhdbhjddsdddddddddddddddddd '+storedDarkMode);
    document.body.style.backgroundColor = darkMode?'#000000':'#f5f5f5';
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const startTime = performance.now();

    // Your component's rendering logic goes here...

    const endTime = performance.now();
    const renderTime = endTime - startTime;
    console.log(`Component XYZ took ${renderTime} milliseconds to render`);
  
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    console.log("dark : "+darkMode);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  
  const PrivateRoute = ({ element, redirectTo }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
      return <>{element}</>;
    } else {
      return <Navigate to={redirectTo || "/admin/login"} replace />;
    }
  };

  const PrivateStudentRoute = ({ element, redirectTo }) => {
    const { isStudentAuthenticated,CheckStudentLogin } = useStudentAuth();
    CheckStudentLogin();
    if (isStudentAuthenticated) {
      return <>{element}</>;
    } else {
      return <Navigate to={redirectTo || "/student/login"} replace />;
    }
  };
  const RedirectToAdmLogin = ({ element}) => {
    const { isAuthenticated,CheckAuth } = useAuth();
    CheckAuth();
    if (isAuthenticated) {
      return <>{element}</>;
    } else {
      return <Navigate to={"/admin/login"} replace />;
    }
  };
  const AccessFac = ({ element}) => {
    
  
    if (checkEmail()) {
      
      return <>{element}</>;
    } else {
      return <FNF/>;
    }
  };
  
  const RedirectToStudentLogin = ({ element}) => {
    const { isStudentAuthenticated,CheckStudentLogin } = useStudentAuth();
    CheckStudentLogin();
    if (isStudentAuthenticated) {
      
      return <>{element}</>;
    } else {
      return <Navigate to={"/student/login"} replace />;
    }
  };
    return (
      <div className={`${darkMode?'bg-black':''}`}
      style={{
        height: 'calc(100vh)',
      }}
    >
      <ConfigProvider 
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}>
      <Router>
        <AuthProvider>
        <StudentAuthProvider>
          <Routes>
            <Route path="/" element={isLoading ? <LoadingScreen />:<Home />} />
            <Route path="/about" element={isLoading ? <LoadingScreen />:<About/>} />
            <Route path='/contact' element={isLoading ? <LoadingScreen />:<Contact/>}/>
            <Route path="/admin/Login" element={isLoading ? <LoadingScreen />:<Login />} />
                <Route path="/admin/ForgetPass" element={isLoading ? <LoadingScreen />:<ForgAdmPass />}/>
                <Route path="/admin/dashboard" element={isLoading ? <LoadingScreen />:<PrivateRoute element={<Layout1 element={<Dash />}/>}/>}/>
                
                <Route path="/admin/dashboard/Calendar" element={isLoading ? <LoadingScreen />:<PrivateRoute element={<Layout1 element={<Admincalendar />}/>}/>}/>
                <Route path="/admin/Complaints" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Complaintsview />}/>}/>} />
                <Route path="/admin/Activity/post" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<CreatePost />}/>} />
                <Route path="/admin/Events/EventFormCreation" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<EventFormCreation />}/>}/>} />
                <Route path="/admin/Activity" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Activity />}/>}/>} />
                <Route path="/admin/Events" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Events/>}/>}/>} />
                <Route path="/admin/Updates" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Updates/>}/>}/>}/>
                <Route path="/admin/History" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<History/>}/>}/>}/>
                <Route path="/admin/Events/eventInfo/:eventId/modify" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<EventModifier />}/>}/>}/>
                <Route path="/admin/Events/eventInfo/:eventId/response" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Eventviewresp />}/>}/>}/>
                <Route path="/admin/PersonalInfo" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<PersonalInfo />}/>}/>}/>
                <Route path="/admin/Events/Fullview" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<FullEvents />}/>}/>}/>
                <Route path="/admin/Complaints/MoreInfo" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Forward2 />}/>}/>}/>
                
                <Route path="/admin/Faculty" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<AccessFac element={<Layout1 element={<Facultyview />}/>}/>}/>} />
                <Route path="/admin/Faculty/Panel" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<AccessFac element={<Layout1 element={<FacultyInfo />}/>}/>}/>}/>
                <Route path="/admin/Activity/Panel" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<ActivityPanel />}/>}/>}/>
                <Route path='/master/admin/' element={<CSVReaderComponent/>}/>

                <Route path='/student/login' element={isLoading ? <LoadingScreen />:<StudentLogin/>} />
                <Route path='/student/ForgetPass' element={isLoading ? <LoadingScreen />:<ForgetPass/>}/>
                  <Route path='/student/dashboard' element={isLoading ? <LoadingScreen />:<PrivateStudentRoute element={<Layout2 element={<StudentDash/>}/>}/>}/>
                  <Route path='/student/Complaint' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Complaint/>}/>}/>}/>
                  
                  
                  <Route path='/student/Complaint/Academic' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Academic/>}/>}/>}/>
                  <Route path='/student/Complaint/Maintenance' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Maintenance/>}/>}/>}/>
                  <Route path='/student/Complaint/Lab' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Lab/>}/>}/>}/>
                  <Route path='/student/Complaint/Courses' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Courses/>}/>}/>}/>
                  <Route path='/student/Complaint/Faculty' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Faculty/>}/>}/>}/>
                  <Route path='/student/Complaint/Others' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Others/>}/>}/>}/>
                  <Route path='/student/dashboard/Calendar' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Nfcalendar/>}/>}/>}/>
                  
                  
                  <Route path='/student/EventForm' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<EventForm/>}/>}/>}/>
                  <Route path='/student/Histandtrends' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Histandtrends/>}/>}/>}/>
                  
                  <Route path='/student/Activity' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentActivity/>}/>}/>}/>
                  <Route path='/student/History' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentHistory/>}/>}/>}/>
                  <Route path='/student/Activity/Panel' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentActivityPanel/>}/>}/>}/>
                  <Route path='/student/History/Panel' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentActivityPanel/>}/>}/>}/>
                  <Route path='/student/Complaints/Panel' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentActivityPanel/>}/>}/>}/>
                  <Route path="/student/Events/eventInfo/:eventId" element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<EventInfoWrapper/>}/>}/>} />
                  
                <Route path='*' element={<FNF/>}/>
              </Routes>
              
          </StudentAuthProvider>
        </AuthProvider>
      </Router>
      </ConfigProvider>
      </div>
    );
  };
  const LoadingScreen = () => (
    <div className="loading w-100" >
  <Typography.Title level={3} className="flex-column my-auto"><Spin indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} /></Typography.Title>
</div>


  );
export default App;