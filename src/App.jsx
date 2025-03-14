import { useState } from 'react'
import './App.css'
import Welcome from './Components/Onboard Flow Components/Welcome'
import {  Routes, Route } from "react-router";
import Role from './Components/Onboard Flow Components/Role';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/select-role" element={<Role/>} />
      </Routes>
    </>
  )
}

export default App
