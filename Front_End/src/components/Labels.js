
import React, { useState, useContext, useEffect } from "react";
import { Create_Schedule, Delete_Schedule, Get_Features, Get_Schedules, Update_Features, Update_Schedule, Delete_All_Note, Get_Events} from "../auth/action/API_requests";
import GlobalContext from "../context/GlobalContext";
import { TiEdit, TiTick, TiTimes, TiTrash} from 'react-icons/ti';

export default function Labels() {
  const { labels, updateLabel, setSavedEvents} = useContext(GlobalContext);
  const [schedules, setSchedules] = useState([]);
  const [schedule_name, setScheduleName] = useState("");
  const [new_schedule_name, setNewScheduleName] = useState("");
  const [adding_new, setAddingNew] = useState(false);

  useEffect(async () => {
    await Update_Local_Schedules();
  }, []);

  const Update_Local_Schedules = async () => {
    await Get_Features().then(async (features) => {
      await Get_Schedules().then((schedules)=>{
        const list = new Array();
        schedules.forEach(element => {
          if(features.Schedule_ID == element.ID){
            list.push({schedule:element, active:true, changing:false});
          }
          else{
            list.push({schedule:element, active:false, changing:false});
          }
        });
        setSchedules([...list]);
      });
    });
  }

  const set_active_schedule = async (ele) => {
    schedules.forEach(element => element.active = false);
    ele.active = true;
    await Update_Features("Schedule_ID", ele.schedule.ID);
    setSchedules([...schedules]);
    await Get_Events().then((events)=>{
      setSavedEvents([...events]);
    });
  }

  const set_change_schedule = async (ele) => {
    ele.changing = true;
    setSchedules([...schedules]);
  }

  const update_schedule = async (ele) => {
    ele.changing = false;
    ele.schedule.Calendar_Name = schedule_name;
    await Update_Schedule(ele.schedule);
    setScheduleName("");
    setSchedules([...schedules]);
  }

  const cancel_update = async (ele) => {
    ele.changing = false;
    setSchedules([...schedules]);
  }

  const delete_schedule = async (ele) => {
    await Delete_All_Note(ele.schedule.ID);
    await Delete_Schedule(ele.schedule);
    await Update_Local_Schedules();
  }

  const add_new_schedule = async (name) => {
    await Create_Schedule(name);
    setAddingNew(false);
    await Update_Local_Schedules();
  }

  return (
    <React.Fragment>
      <p className="text-black-500 font-bold mt-10">Label</p>
      {labels.map(({ label: lbl, checked }, idx) => (
        <label key={idx} className="items-center mt-3 block">
          <input
            type="checkbox"
            checked={checked}
            onChange={() =>
              updateLabel({ label: lbl, checked: !checked })
            }
            className={`form-checkbox h-5 w-5 text-${lbl}-400 rounded focus:ring-0 cursor-pointer`}
          />
          <span className="ml-2 text-gray-700 capitalize">{lbl}</span>
        </label>
      ))}
      <p className="text-black-500 font-bold mt-10">Schedules</p>

      {schedules.map((ele, idx) => (
        <>
          <input
            type="checkbox"
            checked={ele.active}
            onChange={set_active_schedule.bind(this, ele)}
            className={`form-checkbox h-5 w-5 text-${ele.schedule.Calendar_Name}-400 rounded focus:ring-0 cursor-pointer`}
          />
          {ele.changing ? 
          <><input type="text" value={schedule_name} onChange={(e)=>setScheduleName(e.target.value)} placeholder="New Name..." className="ml-2 text-gray-700 capitalize"/>
          <TiTick onClick={update_schedule.bind(this, ele)}/>
          <TiTimes onClick={cancel_update.bind(this, ele)}/>
          {ele.active ? <></> : <TiTrash onClick={delete_schedule.bind(this, ele)}/>}
          </>
          :
          <><span className="ml-2 text-gray-700 capitalize">{ele.schedule.Calendar_Name}</span>
          <TiEdit onClick={set_change_schedule.bind(this, ele)}/></>}
        </>
      ))}
      {adding_new ?
      <>
      <input type="text" value={new_schedule_name} onChange={(e)=>setNewScheduleName(e.target.value)} placeholder="New Name..." className="ml-2 text-gray-700 capitalize"/>
      <TiTick onClick={add_new_schedule.bind(this, new_schedule_name)}/>
      <TiTimes onClick={setAddingNew.bind(this, false)}/>
      </>
      :
      <>
      <button className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl"
      onClick={setAddingNew.bind(this, true)}>
      <span className="pl-3 pr-7">Create</span>
      </button>
      </>}

    </React.Fragment>
  );
}


