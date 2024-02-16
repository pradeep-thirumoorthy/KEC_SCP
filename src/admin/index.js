//Activity
import ActivityPanel from "./Activity/ActivityPanel";
import Activity from "./Activity/Activity";

//Events
import EventFormCreation from "./Event/EventFormCreate";
import EventModifier from "./Event/EventModify";
import Eventviewresp from "./Event/EventResponse";
import Events from "./Event/Events";

//History
import History from "./History/History";
//Login
import ForgAdmPass from "./Login/ForgAdmPass";
import Login from "./Login/Login";
import PersonalInfo from "./Account/PersonalInfo";
//Complaint
import Complaintsview from "./Complaint/Complainsview";
import Complaints from "./Complaint/Complaints";
import Forward from "./Complaint/MoreInfo";
import Forward2 from "./Complaint/MoreInfo2";
//Dashboard
import Admincalendar from "./Dashboard/Admincalendar";
import Dash from "./Dashboard/Dash";

//Report
import Report from "./Report/Report";


//Layout
import Layout1 from "./Layout";

//Faculty
import FacultyInfo from "./Complaint/FacultyInfo";
import Facultyview from "./Complaint/Facultyview";
import AdminFacultyActivity from "./Activity/FacultyActivity";
import FacultyHistory from "./History/FacultyHistory";
import checkEmail from "./FacultyAccess";

//Type

import {Academic,Others,Maintenance,Faculty,Lab,Courses} from "../student";
export {Layout1,
        ForgAdmPass,Login,
        Activity,ActivityPanel,
        Forward2,Forward,Complaints,Complaintsview,
        Dash,Admincalendar,
        History,
        FacultyHistory,AdminFacultyActivity,Facultyview,
        Events,EventFormCreation,EventModifier,Eventviewresp,
        PersonalInfo,
        FacultyInfo,
        Report,checkEmail,
        Academic,Others,Maintenance,Faculty,Lab,Courses};
