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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/user-select" element={<UserSelection />} />
      <Route path="/select-role" element={<RoleSelection />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Client-Register" element={<ClientRegister />} />
      <Route path="/Worker-Register" element={<WorkersRegister />} />
      <Route path="/client-dashboard" element={<ClientDashboard />} >
        <Route index element={<ClientHome />} />
        <Route path="clienthome" element={<ClientHome/>} />
        <Route path="makepost" element={<MakePost/>} />
      </Route>
      <Route path="/worker-dashboard" element={<WorkerDashboard />} />
    </Routes>
  );
}

export default App;