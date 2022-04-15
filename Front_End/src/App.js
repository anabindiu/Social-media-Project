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
import Friends from "./pages/Friends";
import Statistics from "./pages/Statistics";
import { ProtectedRoute } from "./ProtectedRoutes";
import ContextWrapper from "./context/ContextWrapper";
import auth from "./auth/auth";

function App() {  
  return (
    <>
      <BrowserRouter>

        <Routes>
        <Route path="/" element = {<Welcome />}></Route>
        <Route path="/login" element = {<Login />}></Route>
        <Route path="/signup" element = {<Signup />}></Route>
        <Route path="/welcome" element = {<Welcome />}/>
        <Route path="/profile" element = {<ProtectedRoute> <Navbar /><Profile /> </ProtectedRoute>}/>
        <Route path="/settings" element =  {<ProtectedRoute> <Navbar /> <Settings /> </ProtectedRoute>}/>
        <Route path="/features" element =  {<ProtectedRoute><Navbar /> <Features /> </ProtectedRoute>}/>
        <Route path="/calendar" element =  {<ProtectedRoute> <Navbar /><Calendar /> </ProtectedRoute>}/>
        <Route path="/notes" element =  {<ProtectedRoute><Navbar /> <Note_app /> </ProtectedRoute>}/>
        <Route path="/taskList" element =  {<ProtectedRoute> <Navbar /><Task_List /> </ProtectedRoute>}/>
        <Route path="/friends" element = {<ProtectedRoute> <Navbar /> <Friends /> </ProtectedRoute>}/>
        <Route path="/statistics" element ={<ProtectedRoute> <Navbar /> <Statistics /> </ProtectedRoute>}/>
        <Route path = "*" element ={<p> Error 404 Not found!</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
