import React, { useState, useContext, useEffect } from "react";
import "./App.css";
import { getMonth } from "./util";
import CalendarHeader from "./components/CalendarHeader";
import Sidebar from "./components/Sidebar";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";
import EventModal from "./components/EventModal";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Consulting from "./pages/Consulting";
import Contactus from "./pages/Contactus";
import Design from "./pages/Design";
import Development from "./pages/Development";
import Marketing from "./pages/Marketing";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Signup from "./pages/Signup";

function App() {
  const [currenMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path="/" exact component={Home}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/contactus" component={Contactus}></Route>
          <Route path="/products" component={Products}></Route>
          <Route path="/services" component={Services}></Route>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/marketing" component={Marketing}></Route>
          <Route path="/development" component={Development}></Route>
          <Route path="/design" component={Design}></Route>
          <Route path="/consulting" component={Consulting}></Route>
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
    </React.Fragment>
  );
}

export default App;
