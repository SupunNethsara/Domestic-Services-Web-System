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
function App() {
  return (
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
        <Route path="clienthome" element={<ClientHome />} />
        <Route path="makeprofile" element={<MakeProfile />} />
        <Route path="makepost" element={<MakePost />} />
        <Route path="profilepage" element={<ProfilePage />} />

      </Route>
      <Route path="/worker-dashboard" element={<WorkerDashboard />} >
        <Route index element={<WorkerHome />} />
        <Route path="workerhome" element={<WorkerHome />} />
        <Route path="makeworkerprofile" element={<MakeProfileOwrkers />} />
        <Route path="makerequest" element={<MakeRequest />} />
        <Route path="workerprofile" element={<WorkerProfile />} />
      </Route>


    </Routes>
  );
}

export default App;