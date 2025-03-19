import { useState } from 'react'
import './App.css'
import Welcome from './Components/Onboard Flow Components/Welcome'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import RoleSelection from './Components/Onboard Flow Components/Role';
import ClientRegister from './Components/Forms/ClientRegister';
import WorkersRegister from './Components/Forms/WorkersRegister';
import Login from './Components/Forms/Loging Forms/Login';
import UserSelection from './Components/Onboard Flow Components/UserSelection';
import ClientDashboard from './Components/Dashboard/ClientDashboard';
import WorkerDashboard from './Components/Dashboard/WorkerDashboard';

function App() {

  const [isNewVisitor, setIsNewVisitor] = useState(() => {
    return localStorage.getItem("visited") ? false : true;
  });

  if (isNewVisitor) {
    localStorage.setItem("visited", "true");
  }
  return (
    <Router>
      <Routes>
        
        {isNewVisitor ? (
          <>
            <Route path="/" element={<Welcome />} />
            <Route path="/user-select" element={<UserSelection />} />
            <Route path="/select-role" element={<RoleSelection />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
          
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Client-Register" element={<ClientRegister />} />
            <Route path="/Worker-Register" element={<WorkersRegister />} />
            <Route path="/client-dashboard" element={<ClientDashboard />} />
            <Route path="/worker-dashboard" element={<WorkerDashboard />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  )
}

export default App
