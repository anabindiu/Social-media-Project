import dayjs from "dayjs";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import GlobalContext from "../context/GlobalContext";
import {Button} from "../components/Buttons"
import {Title} from "../components/Headers"
// <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
// include this after header className for return 
export default function CalendarHeader() {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1);
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1);
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-black fond-bold">
        Schedule
      </h1>
      <Button onClick={handleReset}>Today</Button>
      <Button onClick={handlePrevMonth}>&lt;</Button>
      <Button onClick={handleNextMonth}>&gt;</Button>
      <h2 className="ml-4 text-xl text-black-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format(
          "MMMM YYYY"
        )}
      </h2>
    </header>
  );
}
