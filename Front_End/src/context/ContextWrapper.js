import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";
import { Get_Events } from "../auth/action/API_requests";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  console.log(daySelected);

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt) =>
      labels
        .filter((lbl) => lbl.checked)
        .map((lbl) => lbl.label)
        .includes(evt.Label)
    );
  }, [savedEvents, labels]);

  useEffect(async () => {
    Get_Events().then((events)=>{
      setSavedEvents([...events]);
    });
  }, []);

  useEffect(() => {
    setLabels((prevLabels) => {
      console.log(prevLabels);
      return [...new Set(savedEvents.map((evt) => evt.Label))].map(
        (label) => {
          console.log(label);
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, []);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, []);

  function updateLabel(label) {
    setLabels(
      labels.map((lbl) => (lbl.label === label.label ? label : lbl))
    );
  }
  const {promiseInProgress} = usePromiseTracker();
  return (
    <>
    {promiseInProgress ? <ClimbingBoxLoader color={"black"} size={20}/> :
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        smallCalendarMonth,
        setSmallCalendarMonth,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        setSavedEvents,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents
      }}
    >
      {props.children}
    </GlobalContext.Provider>}</>
  );
}