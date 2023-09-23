import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './admin/AuthContext';
import { StudentAuthProvider,useStudentAuth } from './student/StudentAuthContext';
import FNF from './FNF';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import EventInfoWrapper from './student/EventInfoWrapper';
import NewEntry from './NewEntry';

import Login from './admin/Login.js';
  import Admindash from "./admin/Dash";
  import ForgAdmPass from './admin/ForgAdmPass';
  import Complaintsview from './admin/Complainsview';
  import CreatePost from './admin/CreatePost'
  import EventFormCreation from './admin/EventFormCreate';
  import IndividualDisplay from './admin/IndividualDisp';
  import EventResponse from './admin/EventResponse';
  import Events from './admin/Events';
  import Updates from './admin/Updates';
  import History from './admin/History';
  import EventModify from'./admin/EventModify';
  import PersonalInfo from './admin/PersonalInfo';
  import Activity from './admin/Activity';
  import FullEvents from './admin/EventFullView';
  import Forward from './admin/MoreInfo';
  import ActivityPanel from './admin/ActivityPanel';

import StudentLogin from './student/StudentLogin';
  import StudentDash from './student/StudentDash';
  import Complaint from './student/Complaint';
  import CompEntry from './student/CompEntry';
  import ComplaintStatus from './student/ComplaintStatus';
  import Histandtrends from './student/Histandtrends';
  import EventForm from './student/EventForm';
  import ForgetPass from './student/ForgetPass';
  import StudentActivity from './student/StudentActivity';
import { useState } from 'react';
import { useEffect } from 'react';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 200);

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
  const RedirectToAdmLogin = ({ element}) => {
    const { isAuthenticated } = useAuth();
  
    if (isAuthenticated) {
      return <>{element}</>;
    } else {
      return <Navigate to={"/admin/login"} replace />;
    }
  };
  const RedirectToStudentLogin = ({ element}) => {
    const { isStudentAuthenticated } = useStudentAuth();
  
    if (isStudentAuthenticated) {
      return <>{element}</>;
    } else {
      return <Navigate to={"/student/login"} replace />;
    }
  };
    return (
      <Router>
        <AuthProvider>
        <StudentAuthProvider>
          <Routes>
            <Route path="/" element={isLoading ? <LoadingScreen />:<Home />} />
            <Route path="/about" element={isLoading ? <LoadingScreen />:<About/>} />
            <Route path='/contact' element={isLoading ? <LoadingScreen />:<Contact/>}/>
            <Route path="/admin/Login" element={isLoading ? <LoadingScreen />:<Login />} />
                <Route path="/admin/ForgetPass" element={isLoading ? <LoadingScreen />:<ForgAdmPass />}/>
                <Route path="/admin/dashboard" element={isLoading ? <LoadingScreen />:<PrivateRoute element={<NewEntry element={<Admindash />}/>}/>} />
                <Route path="/admin/Complaints" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<Complaintsview />}/>} />} />
                <Route path="/admin/Activity/post" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<CreatePost />}/>} />} />
                <Route path="/admin/Events/EventFormCreation" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<EventFormCreation />}/>} />} />
                <Route path="/admin/Activity" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<Activity />} />} />} />
                <Route path="/admin/IndividualDisplay" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<IndividualDisplay/>} />} />} />
                <Route path="/admin/Events" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<Events/>} />}/>} />
                <Route path="/admin/Updates" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<Updates/>}/>}/>}/>
                <Route path="/admin/History" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<History/>}/>}/>}/>
                <Route path="/admin/Events/eventInfo/:eventId/modify" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<EventModify />}/>}/>} />
                <Route path="/admin/Events/eventInfo/:eventId/response" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<EventResponse />}/>}/>} />
                <Route path="/admin/PersonalInfo" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<PersonalInfo />}/>}/>}/>
                <Route path="/admin/Events/Fullview" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<FullEvents />}/>}/>} />
                <Route path="/admin/Complaints/MoreInfo" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<Forward />}/>}/>} />
                <Route path="/admin/Activity/Panel" element={isLoading ? <LoadingScreen />:<RedirectToAdmLogin element={<NewEntry element={<ActivityPanel />}/>}/>} />


                <Route path='/student/login' element={isLoading ? <LoadingScreen />:<StudentLogin/>} />
                <Route path='/student/ForgetPass' element={isLoading ? <LoadingScreen />:<ForgetPass/>}/>
                  <Route path='/student/dashboard' element={isLoading ? <LoadingScreen />:<PrivateStudentRoute element={<StudentDash/>}/>}/>
                  <Route path='/student/Complaint' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Complaint/>}/>}/>
                  <Route path='/student/Complaint/ComplaintEntry' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<CompEntry/>}/>}/>
                  <Route path='/student/ComplaintStatus' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<ComplaintStatus/>}/>}/>
                  <Route path='/student/EventForm' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<EventForm/>}/>}/>
                  <Route path='/student/Histandtrends' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<Histandtrends/>}/>}/>
                  <Route path='/student/Activity' element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<StudentActivity/>}/>}/>
                  <Route path="/student/Events/eventInfo/:eventId" element={isLoading ? <LoadingScreen />:<RedirectToStudentLogin element={<ActivityPanel/>}/>} />
                  
                <Route path='*' element={<FNF/>}/>
              </Routes>
              
          </StudentAuthProvider>
        </AuthProvider>
      </Router>
    );
  };
  const LoadingScreen = () => (
    <div className="loading w-100" >
  <h3 className="my-auto">Loading...</h3>
</div>


  );
export default App;