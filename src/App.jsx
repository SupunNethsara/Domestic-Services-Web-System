import { useState } from 'react'
import './App.css'
import Welcome from './Components/Onboard Flow Components/Welcome'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import RoleSelection from './Components/Onboard Flow Components/Role';
import ClientRegister from './Components/Forms/ClientRegister';
import WorkersRegister from './Components/Forms/WorkersRegister';
import Login from './Components/Forms/Loging Forms/Login';
import UserSelection from './Components/Onboard Flow Components/UserSelection';

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user-select" element={<UserSelection/>} />
        <Route path="/select-role" element={<RoleSelection/>} />
       
        <Route path='/Client-Register' element={<ClientRegister/>} />
        <Route path='/Worker-Register' element={<WorkersRegister/>} />
        <Route path='/login' element={<Login/>} />
      
      </Routes>
      </Router>
    </>
  )
}

export default App
