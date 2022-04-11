import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import {BrowserRouter, Route, Routes, Link, Outlet} from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Task_List from "./pages/Task_List";
import Settings from "./pages/Settings";
import Note_app from "./pages/Notes";
import Features from "./pages/Features";
import Calendar from "./pages/Calendar"
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import { ProtectedRoute } from "./ProtectedRoutes";
import auth from "./auth/auth";

function App() {
  const [page, setPrevPage] = useState('');
  
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element = {<Login />}></Route>
          <Route path="/signup" element = {<Signup />}></Route>
          <Route path="/welcome" element = {<Welcome />}/>
          <Route path="/profile" element = {<ProtectedRoute> <Profile /> </ProtectedRoute>}/>
          <Route path="/settings" element =  {<ProtectedRoute> <Settings /> </ProtectedRoute>}/>
          <Route path="/features" element =  {<ProtectedRoute> <Features /> </ProtectedRoute>}/>
          <Route path="/calendar" element =  {<ProtectedRoute> <Calendar /> </ProtectedRoute>}/>
          <Route path="/notes" element =  {<ProtectedRoute> <Note_app /> </ProtectedRoute>}/>
          <Route path="/taskList" element =  {<ProtectedRoute> <Task_List /> </ProtectedRoute>}/>
          <Route path = "*" element ={<p> Error 404 Not found!</p>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
