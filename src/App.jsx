import { useState } from 'react';
import './App.css';
import Welcome from './Components/Onboard Flow Components/Welcome';
import { Routes, Route, Navigate } from 'react-router-dom';  // Import from react-router-dom
import RoleSelection from './Components/Onboard Flow Components/Role';
import ClientRegister from './Components/Forms/ClientRegister';
import WorkersRegister from './Components/Forms/WorkersRegister';
import Login from './Components/Forms/Loging Forms/Login';
import UserSelection from './Components/Onboard Flow Components/UserSelection';
import ClientDashboard from './Components/Dashboard/ClientDashboard';
import WorkerDashboard from './Components/Dashboard/WorkerDashboard';
import ClientHome from './Components/Dashboard/DashboardComponents/Client Routes Component/ClientHome';
import MakePost from './Components/Dashboard/DashboardComponents/Client Routes Component/MakePost';
import WorkerHome from './Components/Dashboard/DashboardComponents/Worker Routes Component/WorkerHome';
import MakeRequest from './Components/Dashboard/DashboardComponents/Worker Routes Component/MakeRequest';
import MakeProfile from './Components/Dashboard/DashboardComponents/Client Routes Component/MakeProfile';
import ProfilePage from './Components/Dashboard/DashboardComponents/Client Routes Component/ClientDashboard Components/ProfilePage';
import MakeProfileOwrkers from './Components/Dashboard/DashboardComponents/Worker Routes Component/MakeProfileWorkers';
import WorkerProfile from './Components/Dashboard/DashboardComponents/Worker Routes Component/WorkerDashboard Components/WorkerProfile';
import AdminDashbaord from './Components/Dashboard/DashboardComponents/Admin Panel/AdminDashbaord';
import Statics_dashboard from './Components/Dashboard/DashboardComponents/Admin Panel/Routing Components/Statics_dashboard';
import UserTable from './Components/Dashboard/DashboardComponents/Admin Panel/Routing Components/UserTable';
import UsersWeb from './Components/Web/UsersWeb';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PostTable from './Components/Dashboard/DashboardComponents/Admin Panel/Routing Components/PostTable';
import Availability from './Components/Dashboard/DashboardComponents/Worker Routes Component/Availability';
import AvailabilityWorkers from './Components/Dashboard/DashboardComponents/Client Routes Component/AvailabilityWorkers';
import ChatSection from './Components/Dashboard/DashboardComponents/Worker Routes Component/WorkerDashboard Components/Chat Services/ChatSection';
import { AuthProvider } from './Context/Authcontext';
import UserOnlineStatus from './Components/Dashboard/DashboardComponents/Client Routes Component/ClientDashboard Components/UserOnlineStatus';
import FindWorkers from './Components/Dashboard/DashboardComponents/Client Routes Component/FindWorkers';
import ClientRequest from './Components/Dashboard/DashboardComponents/Worker Routes Component/ClientRequest';
import MainProfilesForClient from './Components/Dashboard/DashboardComponents/Client Routes Component/ClientDashboard Components/Client Request Components/MainProfilesForClient';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<UsersWeb />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/user-select" element={<UserSelection />} />
        <Route path="/select-role" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Client-Register" element={<ClientRegister />} />
        <Route path="/Worker-Register" element={<WorkersRegister />} />

        <Route path="/adminpanel" element={<AdminDashbaord />}>
          <Route index element={<Statics_dashboard />} />
          <Route path="statics" element={<Statics_dashboard />} />
          <Route path="user_manage" element={<UserTable />} />
          <Route path="post_manage" element={<PostTable />} />
        </Route>
        <Route path="/client-dashboard" element={<ClientDashboard />} >
          <Route index element={<ClientHome />} />
          <Route path='worker_availability' element={<AvailabilityWorkers />} />
          <Route path="clienthome" element={<ClientHome />} />
          <Route path="makeprofile" element={<MakeProfile />} />
          <Route path="makepost" element={<MakePost />} />
          <Route path="profilepage" element={<ProfilePage />} />
          <Route path="findworkers" element={<FindWorkers />} />
          <Route path="ClientWorkersProfile" element={<MainProfilesForClient />} />
          <Route path="online-users" element={<UserOnlineStatus />} />
        </Route>
        <Route path="/worker-dashboard" element={<WorkerDashboard />} >
          <Route index element={<WorkerHome />} />
          <Route path="workerhome" element={<WorkerHome />} />
          <Route path="makeworkerprofile" element={<MakeProfileOwrkers />} />
          <Route path="makerequest" element={<MakeRequest />} />
          <Route path="makeprofile" element={<MakeProfile />} />
          <Route path="workerprofile" element={<WorkerProfile />} />
          <Route path="workeravailability" element={<Availability />} />
          <Route path='clientreqesting' element={<ClientRequest />} />
          <Route path="chat" element={<ChatSection />} />
        </Route>


      </Routes>
    </AuthProvider>
  );
}

export default App;