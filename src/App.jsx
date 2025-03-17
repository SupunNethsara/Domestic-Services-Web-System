import { useState } from 'react'
import './App.css'
import Welcome from './Components/Onboard Flow Components/Welcome'
import { BrowserRouter as Router, Routes, Route } from "react-router";

import RoleSelection from './Components/Onboard Flow Components/Role';
import ClientRegister from './Components/Forms/ClientRegister';
import WorkersRegister from './Components/Forms/WorkersRegister';

function App() {


  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/select-role" element={<RoleSelection/>} />
        <Route path='/Client-Register' element={<ClientRegister/>} />
        <Route path='/Worker-Register' element={<WorkersRegister/>} />
      </Routes>
      </Router>
    </>
  )
}

export default App
