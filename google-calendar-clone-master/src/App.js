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

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" exact component={Profile}></Route>
          <Route path="/profile" component={Profile}></Route>
          <Route path="/settings" component={Settings}></Route>
          <Route path="/features" component={Features}></Route>
          <Route path="/calendar" component={Calendar}></Route>
          <Route path="/notes" component={Note_app}></Route>
          <Route path="/taskList" component={Task_List}></Route>
        </Routes>
      </BrowserRouter>
      {showEventModal && <EventModal />}

      <div className="h-screen flex flex-col">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currenMonth} />
        </div>
      </div>
    </>
  );
}

export default App;
