import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import {BrowserRouter, Route, Routes, Link} from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Task_List from "./pages/Task_List";
import Settings from "./pages/Settings";
import Note_app from "./pages/Notes";
import Features from "./pages/Features";
import Calendar from "./pages/Calendar"
import Login from "./pages/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element = {<Profile />}></Route>
          <Route path="/profile" element = {<Profile />}></Route>
          <Route path="/settings" element = {<Settings />}></Route>
          <Route path="/features" element = {<Features />}></Route>
          <Route path="/calendar" element = {<Calendar />}></Route>
          <Route path="/notes" element = {<Note_app />}></Route>
          <Route path="/taskList" element = {<Task_List />}></Route>
          <Route path="/login" element = {<Login />}></Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
