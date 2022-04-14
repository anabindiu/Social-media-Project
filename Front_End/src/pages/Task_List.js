import { useEffect, useState } from "react";
import {Get_Task, Get_Tasks, Create_Task, Delete_Task, Update_Task} from "../auth/action/API_requests";
import {trackPromise} from "react-promise-tracker";
import TaskForm from '../components/TaskForm';
import Task from '../components/Task';
import * as comp from "../components/Tasks_Components";

function Task_List() {
  const [task_list, setTaskList] = useState([]);
  const [isDisabled, setDisabled] = useState(false);

  useEffect(async () => {
    trackPromise(
      Get_Task().then((task_list) => {
        setTaskList([...task_list]);
      })
    );
  }, []);

  const onAddTask = async (task) => {
    const tasks = await Get_Tasks();
    const task_data = {
      "Tasks_ID": tasks.ID, 
      "Title":task.Title, 
      "Description":task.Description, 
      "Location":task.Location, 
      "Deadline":task.Deadline,
      "Completion_Status":false
    };
    console.log(task_data);
    await Create_Task(task_data);
      
    await Get_Task().then((task_list) => {
      setTaskList([...task_list]);
    })
  };

  const onDeleteTask = async (task) => {
    console.log("TO DELETE", task);
    await Delete_Task(task);

    await Get_Task().then((task_list) => {
      setTaskList([...task_list]);
    })
  };

  const onUpdateTask = async (new_task) => {
    await Update_Task(new_task);

    await Get_Task().then((task_list) => {
      setTaskList([...task_list]);
      setDisabled(false);
    })
  };

  const setCompletion = async (ID) => {
    const completed_task = task_list.find((task) => task.ID === ID);
    completed_task["Completion_Status"] = !completed_task["Completion_Status"];
    await Update_Task(completed_task);

    await Get_Task().then((task_list) => {
      setTaskList([...task_list]);
    })
  };

  const cancelUpdate = () => {
    setDisabled(false);
  }

  const blockMainForm = () => {
    setDisabled(true);
  }

  return (
    <comp.Task_List_Base>
      <comp.Task_List_Header>Task List</comp.Task_List_Header>
      <TaskForm edit={false} disabled={isDisabled} callingFunction={onAddTask} start={{title:"", description:"", location:"", deadline:""}}/>
      <Task
        task_list={task_list}
        setCompletion={setCompletion}
        onDeleteTask={onDeleteTask}
        onUpdateTask={onUpdateTask}
        blockMainForm={blockMainForm}
        cancelUpdate={cancelUpdate}
      />
    </comp.Task_List_Base>
  );
}

export default Task_List;