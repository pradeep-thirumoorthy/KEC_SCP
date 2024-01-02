import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './admin/Authenticate/AuthContext';
import { StudentAuthProvider,useStudentAuth} from './student/Authenticate/StudentAuthContext';
import FNF from './FNF';
import Home from './Home';
import About from './About';
import Contact from './Contact';



import { Login,ForgAdmPass,Dash,Complaintsview,EventFormCreation,Activity,Admincalendar,History,FullEvents,Forward,ActivityPanel,PersonalInfo,Eventviewresp,EventModifier,Events, FacultyInfo } from './admin';

import {StudentLogin,StudentDash,Complaint,EventForm,ForgetPass,StudentActivityPanel,StudentActivity, Nfcalendar} from './student/index';
import {Academic,Others,Maintenance,Faculty,Lab,Courses} from "./student/index";
import Layout1 from './Layout';
import { useState } from 'react';
import { useEffect } from 'react';
import Layout2 from './student/Layout2';

import Forward2 from './admin/Complaint/MoreInfo2';

import { EventInfoWrapper, StudentHistory } from './student';
import { ConfigProvider, Spin,theme } from 'antd';
import Facultyview from './admin/Complaint/Facultyview';
import checkEmail from './FacultyAccess';
import CSVReaderComponent from './master_admin/upload';
import FacutlyActivity from './student/Activity/FacultyActivty';
import AdminFacultyActivity from './admin/Activity/FacultyActivity';
import ActivityFacultyPanel from './admin/Activity/FacultyPanel';
import FacultyHistory from './admin/History/FacultyHistory';
import FacultyHistory2 from './student/History/FacultyHistory2';
import FacultyActivitypanel from './student/Activity/FacultyActivitypanel';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isEmailPresent, setIsEmailPresent] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('theme');
    
    console.log('kdhdbhjdd '+storedDarkMode);
    if (storedDarkMode==='dark') {
      setDarkMode(true);
    }
    else{
      setDarkMode(false);
    }
    document.body.style.backgroundColor = darkMode?'#000000':'#f5f5f5';
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);
    console.log("dark : "+darkMode);
    const getEmailStatus = async () => {
      const emailPresent = await checkEmail();
      setIsEmailPresent(emailPresent);
    };

    getEmailStatus();
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
    const { isStudentAuthenticated } = useStudentAuth();
    if (isStudentAuthenticated) {
      return <>{element}</>;
    } else {
      return <Navigate to={redirectTo || "/student/login"} replace />;
    }
  };
  
  const AccessFac = ({ element}) => {
    if (isEmailPresent) {
      return <>{element}</>;
    } else {
      return <FNF/>;
    }
  };
  const RedirectToAdmLogin = ({ element}) => {
    const { isAuthenticated} = useAuth();
    if (isAuthenticated) {
      return <>{element}</>;
    } else {
      return <Navigate to={"/admin/login"} replace />;
    }
  };
  const RedirectToStudentLogin = ({ element}) => {
    const { isStudentAuthenticated} = useStudentAuth();
    console.log(isStudentAuthenticated);
    if (isStudentAuthenticated) {
      
      return <>{element}</>;
    } else {
      return <Navigate to={"/student/login"} replace />;
    }
  };



  const withLoader = (WrappedComponent) => {
    return class extends React.Component {
      state = {
        loading: true,
      };
  
      componentDidMount() {
        // Simulate delay (replace with actual data fetching)
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1000);
      }
  
      render() {
        const { loading } = this.state;
  
        if (loading) {
          return <div>Loading...</div>;
        }
  
        return <WrappedComponent {...this.props} />;
      }
    };
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



            <Route path="/admin/dashboard" element={isLoading ? <LoadingScreen />:<PrivateRoute element={<Layout1 element={<Dash  />} data={['Dashboard','Here is your complaints arrived']}/>}/>}/>
            <Route path="/admin/dashboard/Calendar" element={isLoading ? <LoadingScreen />:<PrivateRoute element={<Layout1 element={<Admincalendar  />} data={['Calendar','Here is your complaints arrived']}/>}/>}/>
                
                <Route path="/admin/Complaints" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Complaintsview  />} data={['Complaints','Here is your complaints arrived']}/>}/>}/>
                <Route path="/admin/Complaints/MoreInfo" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Forward2  />} data={['Complaint Information','Here is your complaints arrived']}/>}/>}/>
                
                
                <Route path="/admin/Events" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Events />} data={['Events','Here is your complaints arrived']}/>}/>}/>
                <Route path="/admin/Events/eventInfo/:eventId/modify" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<EventModifier  />} data={['Events','Here is your complaints arrived']}/>}/>}/>
                <Route path="/admin/Events/EventFormCreation" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<EventFormCreation  />} data={['Event Creation','Here is your complaints arrived']}/>}/>}/>
                <Route path="/admin/Events/Fullview" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<FullEvents  />} data={['Events','Here is your complaints arrived']}/>}/>}/>
                <Route path="/admin/Events/eventInfo/:eventId/response" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Eventviewresp  />} data={['Event Responses','Here is your complaints arrived']}/>}/>}/>
                
                
                
                <Route path="/admin/History" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<History />} data={['History','Here is your complaints arrived']}/>}/>}/>
                <Route path="/admin/History/Faculty" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<FacultyHistory />} data={['Faculty History','Here is your complaints arrived']}/>}/>}/>
                
                <Route path="/admin/PersonalInfo" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<PersonalInfo  />} data={['Account','Here is your complaints arrived']}/>}/>}/>
                

                <Route path="/admin/Faculty" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<AccessFac element={<Layout1 element={<Facultyview  />} data={['Faculty','Here is your complaints arrived']}/>}/>}/>}/>
                <Route path="/admin/Faculty/Panel" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<AccessFac element={<Layout1 element={<FacultyInfo  />} data={['Faculty Panel','Here is your complaints arrived']}/>}/>}/>}/>
                
                
                
                <Route path="/admin/Activity/Panel" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<ActivityPanel  />} data={['Activity','Here is your complaints arrived']}/>}/>}/>
                <Route path="/admin/Activity" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<Activity  />} data={['Activity Panel','Here is your complaints arrived']}/>}/>}/>
                <Route path='/admin/Activity/Faculty' element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<AdminFacultyActivity />} data={['Faculty','Here is your complaints arrived']}/>}/>}/>
                <Route path='/admin/Activity/Faculty/Panel' element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<Layout1 element={<ActivityFacultyPanel />} data={['Faculty Panel','Here is your complaints arrived']}/>}/>}/>
                
                
                
                
                <Route path='/master/admin/' element={<CSVReaderComponent/>}/>




                  <Route path='/student/login' element={isLoading ? <LoadingScreen />:<StudentLogin/>} />
                  <Route path='/student/ForgetPass' element={isLoading ? <LoadingScreen />:<ForgetPass/>}/>




                  <Route path='/student/dashboard' element={isLoading ? <LoadingScreen />:<PrivateStudentRoute element={<Layout2 element={<StudentDash/>}data={['Dashboard','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/dashboard/Calendar' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Nfcalendar />} data={['Calendar','Here is your complaints arrived']}/>}/>}/>



                  <Route path='/student/Complaints' element={isLoading ? <LoadingScreen />:<PrivateStudentRoute element={<Layout2 element={<Complaint />} data={['Complaints','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Complaints/Academic' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Academic />} data={['Academic','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Complaints/Maintenance' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Maintenance />} data={['Maintenance','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Complaints/Lab' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Lab />} data={['Lab','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Complaints/Courses' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Courses />} data={['Courses','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Complaints/Faculty' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Faculty />} data={['Faculty','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Complaints/Others' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<Others />} data={['Others','Here is your complaints arrived']}/>}/>}/>
                  
                  

                  <Route path='/student/EventForm' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<EventForm />} data={['Events','Here is your complaints arrived']}/>}/>}/>
                  


                  <Route path='/student/Activity' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentActivity />} data={['Activity','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Activity/Panel' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentActivityPanel />} data={['Activity Panel','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Activity/Faculty' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<FacutlyActivity />} data={['Faculty','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/Activity/Faculty/Panel' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<FacultyActivitypanel />} data={['Faculty','Here is your complaints arrived']}/>}/>}/>

                  
                  
                  <Route path='/student/History' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentHistory />} data={['History','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/History/Panel' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentActivityPanel />} data={['History Panel','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/History/Faculty' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<FacultyHistory2 />} data={['History','Here is your complaints arrived']}/>}/>}/>
                  <Route path='/student/History/Faculty/Panel' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<FacultyActivitypanel />} data={['History Panel','Here is your complaints arrived']}/>}/>}/>
                  
                  
                  <Route path='/student/Complaints/Panel' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<StudentActivityPanel />} data={['Complaints Panel','Here is your complaints arrived']}/>}/>}/>
                  <Route path="/student/Events/eventInfo/:eventId" element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Layout2 element={<EventInfoWrapper />} data={['Event Form','Here is your complaints arrived']}/>}/>}/>
                  
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
  <div>
    <Spin spinning={true} fullscreen />
    </div>


  );
export default App;