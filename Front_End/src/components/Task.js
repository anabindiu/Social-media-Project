import React, { useState } from 'react';
import TaskForm from './TaskForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';
import * as comp from "../components/Tasks_Components";

const Task = ({task_list, setCompletion, onDeleteTask, onUpdateTask, blockMainForm, cancelUpdate}) => {
  const [edit, setEdit] = useState({isEditing: false, edit_task:null});

  const editTask = (task) =>{
    blockMainForm();
    setEdit({isEditing:true, edit_task:task});
  }

  const submitUpdate = (task) => {
    onUpdateTask(task);
    setEdit({isEditing:false, edit_task:null});
  }

  const CancelUpdate = () => {
    cancelUpdate();
    setEdit({isEditing:false, edit_task:null});
  }

  if(edit.isEditing){
    const task = edit.edit_task;
    console.log("Edit", task);
    return(
    <>
      <TaskForm
        edit={true} 
        callingFunction={submitUpdate}
        start={{title:task.Title, description:task.Description, location:task.Location, deadline:task.Deadline}}
        edit_task={task}
      />
      <comp.Task_Form_Button className='todo-button' onClick={CancelUpdate}>Cancel</comp.Task_Form_Button>
      </>
    );
  }

  return task_list.map((task) => (
    <comp.Task_Base
      primary={task.Completion_Status ? true : false} 
      key={task.ID}
    >
      <comp.Task_Title key={task.ID} onClick={() => setCompletion(task.ID)}>
        {task.Title}
      </comp.Task_Title>
      <comp.Task_Icons>
        <RiCloseCircleLine onClick={() => onDeleteTask(task)}/>
        <TiEdit onClick={() => editTask(task)}/>
      </comp.Task_Icons>
    </comp.Task_Base>
  ));
};

export default Task;
