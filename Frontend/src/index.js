
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./Components/Home";
import Login from "./Components/LogIn";
import ReportComplaint from "./Components/ReportComplaint";
import UserSelection from "./Components/UserSelection";
import AuthorityLogin from "./Components/AuthorityLogin";
import W_AuthorityLogin from "./Components/W_AuthorityLogin";
import U_AuthorityLogin from "./Components/U_AuthorityLogin";
import R_AuthorityLogin from "./Components/R_AuthorityLogin";
import AdminLogin from "./Components/AdminLogin";
import ImageComplaint from "./Components/ImageComplaint";
import Help from "./Components/Help";
import Load from "./Components/Load";
import "./index.css";
import Signup from "./Components/Signup";
import About from "./Components/About";
import UserProfile from "./Components/UserProfile";
import AuthorityTable from "./Components/AuthorityTable";
import SelectionPage from "./Components/SelectionPage";
import ComplaintHistory from "./Components/ComplaintHistory";
import ComplaintStatus from "./Components/ComplaintStatus";
import AuthorityProfile from "./Components/AuthorityProfile";
import Logout from "./Components/Logout";
import AdminOperations from "./Components/AdminOperations";
import AuthorityAccounts from "./Components/AuthorityAccounts";
import DeleteAccounts from "./Components/DeleteAccounts";
import AuthoritySelection from "./Components/AuthoritySelection";
import WaterBoard from "./Components/WaterBoard";
import RoadAuthority from "./Components/RoadAuthority";
import AdminTable from "./Components/AdminTable";
import AdminWaterBoard from "./Components/AdminWaterBoard";
import AdminRoadAuthority from "./Components/AdminRoadAuthority";
import AdminSelection from "./Components/AdminSelection";
import { AuthProvider } from "./Components/AuthContext";
import CreateAuthAcc from "./Components/CreateAuthAcc";
import AdminUCredential from "./Components/AdminUCredential";
import AdminProfile from "./Components/AdminProfile";

// import EmailVerification from './Components/EmailVerification ';
// import AdminOperations from './Components/AdminOperations ';



// import EmailVerification from './Components/EmailVerification ';
// import AdminOperations from './Components/AdminOperations ';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>

        <Route path={"/"} element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/user-selection" element={<UserSelection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/AuthorityLogin" element={<AuthorityLogin />} />
        <Route path="/W_AuthorityLogin" element={<W_AuthorityLogin />} />
        <Route path="/U_AuthorityLogin" element={<U_AuthorityLogin />} />
        <Route path="/R_AuthorityLogin" element={<R_AuthorityLogin />} />
        <Route path="/AdminLogin/:authority" element={<AdminLogin />} />
        <Route path="/ImageComplaint" element={<ImageComplaint />} />
        <Route path="/load" element={<Load />} />
        <Route path="/report-complaint" element={<ReportComplaint />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/selection-page" element={<SelectionPage />} />
        <Route path="/ComplaintStatus" element={<ComplaintStatus />} />
        <Route path="/ComplaintHistory" element={<ComplaintHistory />} />
        <Route path="/AuthorityTable" element={<AuthorityTable />} />
        <Route path="/AuthorityProfile" element={<AuthorityProfile />} />

        <Route path="/Logout" element={<Logout />} />

        <Route path="/AdminOperations/:authority" element={<AdminOperations />} />
        {/* using params */}
        <Route path="/AuthorityAccounts/:authority" element={<AuthorityAccounts />} />
        <Route path="/DeleteAccounts/:authority" element={<DeleteAccounts />} />
        <Route path="/CreateAuthAcc/:authority" element={<CreateAuthAcc />} />
        <Route path="/AdminUCredential/:authority" element={<AdminUCredential />} />



        <Route path="/AuthoritySelection" element={<AuthoritySelection />} />
        <Route path="/WaterBoard" element={<WaterBoard />} />
        <Route path="/RoadAuthority" element={<RoadAuthority />} />
        <Route path="/AdminTable/:authority" element={<AdminTable />} />
        <Route path="/AdminWaterBoard" element={<AdminWaterBoard />} />
        <Route path="/AdminRoadAuthority" element={<AdminRoadAuthority />} />
        <Route path="/AdminSelection" element={<AdminSelection />} />
        <Route path="/AdminProfile" element={<AdminProfile />} />

      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

