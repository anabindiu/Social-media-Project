import { useEffect, useState } from "react";
import Note from "../components/Note";
import NotesSideBar from "../components/NotesSideBar";
import {Get_Note, Get_Notes, Create_Note, Delete_Note, Update_Note} from "../auth/action/API_requests";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import * as comp from "../components/Notes_Components";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    async function fetchData(){
      trackPromise(
        Get_Note().then((note_list) => {
          setNotes([...note_list]);
        })
      );
    }
    fetchData();
  }, []);

  const onAddNote = async () => {
    const notes = await Get_Notes();
    const note_data = {
      "Notes_ID": notes.ID, 
      "Date_Created":`${(new Date()).toLocaleString()}`, 
      "Last_Modified":`${(new Date()).toLocaleString()}`, 
      "Title":"Note Title", 
      "Content":"Write your note here..."
    };
    await Create_Note(note_data);
    
    await Get_Note().then((note_list) => {
      setNotes([...note_list]);
    })
  };

  const onDeleteNote = async (note) => {
    console.log("TO DELETE", note);
    await Delete_Note(note);

    await Get_Note().then((note_list) => {
      setNotes([...note_list]);
    })
  };

  const onUpdateNote = async (activeNote, field, value) => {
    activeNote.Last_Modified = (new Date()).toLocaleString();
    await Update_Note(activeNote, field, value);

    await Get_Note().then((note_list) => {
      setNotes([...note_list]);
    })
  };

  const getActiveNote = () => {
    return notes.find(({ID}) => ID === activeNote);
  };

  const {promiseInProgress} = usePromiseTracker();

  return (
    <comp.Notes_Base>
      {promiseInProgress ? <ClimbingBoxLoader color={"black"} size={20}/> :<>
      <NotesSideBar
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Note activeNote={getActiveNote()} setActiveNote={setActiveNote} onUpdateNote={onUpdateNote} />
      </>}
    </comp.Notes_Base>
  );
}

export default Notes;