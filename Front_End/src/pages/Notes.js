import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./Notes.css";
import Note from "../components/Note";
import Side_bar_Notes from "../components/Side_bar_Notes";
import {Get_Note, Get_Notes, Create_Note, Delete_Note, Update_Note} from "../auth/action/API_requests";
import {trackPromise, usePromiseTracker} from "react-promise-tracker";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(false);

  useEffect(async () => {
    trackPromise(
      Get_Note().then((note_list) => {
        setNotes([...note_list]);
      })
    );
  }, []);

  const onAddNote = async () => {
    const notes = await Get_Notes();
    const note_data = {
      "Notes_ID": notes.ID, 
      "Date_Created":`${new Date()}`, 
      "Last_Modified":`${new Date()}`, 
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
    await Update_Note(activeNote, field, value);

    await Get_Note().then((note_list) => {
      setNotes([...note_list]);
    })
  };

  const getActiveNote = () => {
    return notes.find(({ID}) => ID === activeNote);
  };

  return (
    <div className="Notes">
      <Side_bar_Notes
        notes={notes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <Note activeNote={getActiveNote()} setActiveNote={setActiveNote} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default Notes;