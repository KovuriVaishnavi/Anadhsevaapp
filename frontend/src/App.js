import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Aboutus from './components/Aboutus';
import AdminDashboard from './components/Admindashboard';
import Contact from './components/Contact';
import Donate from "./components/Donate";
import Header from './components/Header';
import Home from './components/Home';
import Homepage from './components/Homepage';
import Log from './components/Logs/log';
import UserTypeSelection from './components/UserTypeSelection';
import { default as VolunteerActiveRequests, default as VolunteerDashboard } from './components/VolunteerDashboard';
import Login from './components/login';
import UserRegistration from './components/userRegistration';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/homepage" element={<Homepage/>} />
    
          <Route path="/aboutus" element={<Aboutus/>} />
          <Route path="/contactus" element={<Contact/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<UserRegistration/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/user-type-selection" element={<UserTypeSelection />} />
          <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
          <Route path="/volunteer" element={<VolunteerActiveRequests/>} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/log" element={<Log />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
