import React, { useState, useEffect, useRef } from 'react';
import * as comp from "../components/Tasks_Components";

function TaskForm({edit, disabled, callingFunction, start, edit_task}) {
  const [title, setTitle] = useState(`${start.title}`);
  const [description, setDescription] = useState(`${start.description}`);
  const [location, setLocation] = useState(`${start.location}`);
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

    callingFunction(task_data);
    setTitle("");
    setDescription("");
    setLocation("");
    setDeadline("");
  };

  return (
    <comp.Task_Form onSubmit={handleSubmit.bind(this)}>
      {disabled ? 
        <>
          <comp.Task_Form_Input
            disabled={true}
            value="Title..."
          />
          <comp.Task_Form_Input
            disabled={true}
            value="Description..."
          />
          <comp.Task_Form_Input
            disabled={true}
            value="Location..."
          />
          <comp.Task_Form_Input
            disabled={true}
            value="Deadline"
          />
          <>
          <comp.Task_Form_Button disabled={true}>Add</comp.Task_Form_Button></>
      </>
      :
      <>
        <comp.Task_Form_Input
          type="text"
          name="Title"
          placeholder="Title..."
          value={title}
          onChange={(e) => {setTitle(e.target.value)}}
          required
        />
        <comp.Task_Form_Input
          type="text"
          name="Description"
          placeholder="Description..."
          value={description}
          onChange={(e) => {setDescription(e.target.value)}}
        />
        <comp.Task_Form_Input
          type="text"
          name="Location"
          placeholder="Location..."
          value={location}
          onChange={(e) => {setLocation(e.target.value)}}
        />
        <comp.Task_Form_Input
          type="datetime-local"
          name="Deadline"
          value={deadline}
          onChange={(e) => {console.log(e.target.value); setDeadline(e.target.value)}}
        />
        {edit ? 
          <comp.Task_Form_Button type="submit">Update</comp.Task_Form_Button>
          :
          <comp.Task_Form_Button type="submit">Add</comp.Task_Form_Button>
        }
        </>
      }
    </comp.Task_Form>
  );
}

export default TaskForm;