import React from "react";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import TaskList from "./pages/TaskList";
import Settings from "./pages/Settings";
import NoteApp from "./pages/Notes";
import Calendar from "./pages/Calendar"
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Signup from "./pages/Signup";
import Friends from "./pages/Friends";
import Statistics from "./pages/Statistics";
import { ProtectedRoute } from "./ProtectedRoutes";
import ContextWrapper from "./context/ContextWrapper";

function App() {  
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element = {<Welcome/>}></Route>
        <Route path="/login" element = {<Login />}></Route>
        <Route path="/signup" element = {<Signup />}></Route>
        <Route path="/welcome" element = {<Welcome />}/>
        <Route path="/profile" element = {<ProtectedRoute> <Navbar /><Profile /> </ProtectedRoute>}/>
        <Route path="/settings" element =  {<ProtectedRoute> <Navbar /> <Settings /> </ProtectedRoute>}/>
        <Route path="/calendar" element =  {<ProtectedRoute> <Navbar /><ContextWrapper><Calendar /></ContextWrapper></ProtectedRoute>}/>
        <Route path="/notes" element =  {<ProtectedRoute><Navbar/> <NoteApp /> </ProtectedRoute>}/>
        <Route path="/taskList" element =  {<ProtectedRoute> <Navbar /><TaskList /> </ProtectedRoute>}/>
        <Route path="/friends" element = {<ProtectedRoute> <Navbar /> <Friends /> </ProtectedRoute>}/>
        <Route path="/statistics" element ={<ProtectedRoute> <Navbar /> <Statistics /> </ProtectedRoute>}/>
        <Route path = "*" element ={<p> Error 404 Not found!</p>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
