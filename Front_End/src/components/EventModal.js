import React, { useContext, useState } from "react";
import { Create_Event, Delete_Event, Get_Events, Update_Event } from "../auth/action/API_requests";
import GlobalContext from "../context/GlobalContext";
import { TiExport } from 'react-icons/ti';

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

export default function EventModal() {
  const {
    setShowEventModal,
    daySelected,
    setSavedEvents,
    selectedEvent,
    setSelectedEvent
  } = useContext(GlobalContext);

  const [Title, setTitle] = useState(
    selectedEvent ? selectedEvent.Title : ""
  );
  const [Start_Time, setStart] = useState(
    selectedEvent ? selectedEvent.Start_Time : ""
  );
  const [End_Time, setEnd] = useState(
    selectedEvent ? selectedEvent.End_Time : ""
  );
  const [Description, setDescription] = useState(
    selectedEvent ? selectedEvent.Description : ""
  );
  const [Location, setLocation] = useState(
    selectedEvent ? selectedEvent.Location : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.Label)
      : labelsClasses[0]
  );
  
  const add_event = async (event) => {
    await Create_Event(event);
    await Get_Events().then((events)=>{
      setSavedEvents([...events]);
    });
  };
  
  const update_event = async (ID, event) => {
    await Update_Event(ID, event);
    await Get_Events().then((events)=>{
      setSavedEvents([...events]);
    });
  };
  
  const delete_event = async (event) => {
    await Delete_Event(event);
    await Get_Events().then((events)=>{
      setSavedEvents([...events]);
    });

    reset_modal();
  };

  const reset_modal = () => {
    setSelectedEvent(null);
    setShowEventModal(false);
  };

  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      Title,
      Description,
      Label: selectedLabel,
      Day: new Date(daySelected.valueOf()),
      Location,
      Start_Time,
      End_Time,
    };
    if(selectedEvent) {
      update_event(selectedEvent.ID, calendarEvent);
    } else {
      add_event(calendarEvent);
    }

    reset_modal();
  }
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
              <span
                onClick={delete_event.bind(this, selectedEvent)}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button onClick={reset_modal}>
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
            
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={Title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>{daySelected.format("dddd, MMMM DD")}</p>
            <span className="material-icons-outlined text-gray-400">
              watch
            </span>
            <form action="/action_page.php">
            <label htmlFor="from_time">Add a start time:</label>
            <input
              type="time"
              name="from_time"
              value={Start_Time}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setStart(e.target.value)}
            />
            </form>

            <div></div>
            <form action="/action_page.php">
            <label htmlFor="to_time">Add an end time: </label>
            <input
              type="time"
              name="to_time"
              value={End_Time}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setEnd(e.target.value)}
            />
            </form>
            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add a description"
              value={Description}
              className="pt-3 borDer-0 text-gray-600 pb-2 w-full borDer-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setDescription(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              place
            </span>
            <input
              type="text"
              name="location"
              placeholder="Add a location"
              value={Location}
              className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setLocation(e.target.value)}
            />
            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClasses.map((lblClass, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedLabel(lblClass)}
                  className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                >
                  {selectedLabel === lblClass && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}

/*
<div class="dropdown">
            <TiExport className="dropbtn">Share</TiExport>
              <div class="dropdown-content"> 
            <>
            <h1> Friend </h1>
            {console.log("Shared schedule with friend")}
          </>
        </div>
      </div>*/