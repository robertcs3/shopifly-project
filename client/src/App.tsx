import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserContext } from "./contexts/UserContext"
import { useContext } from "react";
import Navbar from './components/Navbar';
import Home from './pages/Home'
import Shop from './pages/Shop'
import User from './pages/Profile'
import Profile from './pages/Profile';

function App() {
  return (

    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;