import React, { useState, useEffect, useRef } from 'react';
import {convert_date} from "../auth/action/API_requests";

function TaskForm({edit, disabled, callingFunction, start, edit_task}) {
  const [title, setTitle] = useState(`${start.title}`);
  const [description, setDescription] = useState(`${start.description}`);
  const [location, setLocation] = useState(`${start.location}`);
  console.log("Start", start.deadline);
  console.log("After", start.deadline);
  const [deadline, setDeadline] = useState(`${start.deadline}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    var task_data;
    if(edit){
      task_data = {
        "ID":edit_task.ID,
        "Tasks_ID":edit_task.Tasks_ID,
        "Title":title, 
        "Description":description, 
        "Location":location, 
        "Deadline":deadline,
        "Completion_Status":false
      };
    }
    else{
      task_data = {
        "Title":title, 
        "Description":description, 
        "Location":location, 
        "Deadline":deadline,
        "Completion_Status":false
      };
    }

    console.log(task_data);

    callingFunction(task_data);
    setTitle("");
    setDescription("");
    setLocation("");
    setDeadline("");
  };

  return (
    <form onSubmit={handleSubmit.bind(this)} className='todo-form'>
      {disabled ? 
        <>
          <input
            disabled={true}
            value="Title..."
            className='todo-input-disabled mr-20'
          />
          <input
            disabled={true}
            value="Description..."
            className='todo-input-disabled mr-20'
          />
          <input
            disabled={true}
            value="Location..."
            className='todo-input-disabled mr-20'
          />
          <input
            disabled={true}
            value="Deadline"
            className='todo-input-disabled mr-5'
          />
          <button disabled={true} className='todo-button-disabled'>Add</button> 
      </>
      :
      <>
        <input
          type="text"
          name="Title"
          placeholder="Title..."
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          className='todo-input mr-20'
          required
        />
        <input
          type="text"
          name="Description"
          placeholder="Description..."
          value={description}
          onChange={(e) => {setDescription(e.target.value)}}
          className='todo-input mr-20'
        />
        <input
          type="text"
          name="Location"
          placeholder="Location..."
          value={location}
          onChange={(e) => {setLocation(e.target.value)}}
          className='todo-input mr-20'
        />
        <input
          type="datetime-local"
          name="Deadline"
          value={deadline}
          onChange={(e) => {console.log(e.target.value); setDeadline(e.target.value)}}
          className='todo-input mr-5'
        />
        {edit ? 
          <button type="submit" className='todo-button'>Update</button>
          :
          <button type="submit" className='todo-button'>Add</button>
        }
        </>
      }
    </form>
  );
}

export default TaskForm;