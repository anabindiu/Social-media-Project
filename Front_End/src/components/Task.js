import React, { useState } from 'react';
import TaskForm from './TaskForm';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

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
        <button className='todo-button' onClick={CancelUpdate}>Cancel</button>
      </>
    );
  }

  return task_list.map((task) => (
    <div
      className={task.Completion_Status ? 'todo-row complete' : 'todo-row'}
      key={task.ID}
    >
      <div key={task.ID} onClick={() => setCompletion(task.ID)}>
        {task.Title}
      </div>
      <div className='icons'>
        <RiCloseCircleLine
          onClick={() => onDeleteTask(task)}
          className='delete-icon'
        />
        <TiEdit
          onClick={() => editTask(task)}
          className='edit-icon'
        />
      </div>
    </div>
  ));
};

export default Task;
