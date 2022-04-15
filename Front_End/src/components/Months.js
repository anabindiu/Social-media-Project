import React from 'react';
import {Button} from "../components/Buttons";

export default function Months({year}) {
  const display_stats = (month) => {
    alert(`Placeholder Stats pop up for ${year}, ${month}`)
  }
  return (
    <>
    <Button onClick={display_stats.bind(this, "January")}>January</Button>
    <Button onClick={display_stats.bind(this, "February")}>February</Button>
    <Button onClick={display_stats.bind(this, "March")}>March</Button>
    <Button onClick={display_stats.bind(this, "April")}>April</Button>
    <Button onClick={display_stats.bind(this, "May")}>May</Button>
    <Button onClick={display_stats.bind(this, "June")}>June</Button>
    <Button onClick={display_stats.bind(this, "July")}>July</Button>
    <Button onClick={display_stats.bind(this, "August")}>August</Button>
    <Button onClick={display_stats.bind(this, "September")}>September</Button>
    <Button onClick={display_stats.bind(this, "October")}>October</Button>
    <Button onClick={display_stats.bind(this, "November")}>November</Button>
    <Button onClick={display_stats.bind(this, "December")}>December</Button>
    </>
  )
}
