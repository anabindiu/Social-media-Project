import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import * as comp from "./Notes_Components";
const Note = ({ activeNote, onUpdateNote, setActiveNote}) => {
  const [refresh, setRefresh] = useState(false);
  const onBlurEvent = (field, value) => {
    onUpdateNote(activeNote, field, value);
  };
  const onEditField = (field, value) => {
    activeNote[field] = value;
    activeNote["Last_Modified"] = new Date();
    setRefresh(!refresh);
  };

  if (!activeNote) return <comp.Note_NoneActive>No Active Note</comp.Note_NoneActive>;

  return (
    <comp.Note_Base>
        <comp.Note_Input
          placeholder="Note Title"
          value={activeNote.Title}
          onChange={(e) => onEditField("Title", e.target.value)}
          onBlur={onBlurEvent.bind(this, "Title", activeNote.Title)}
          autoFocus
        />
        <comp.Note_TextArea
          placeholder="Write your note here..."
          value={activeNote.Content}
          onChange={(e) => onEditField("Content", e.target.value)}
          onBlur={onBlurEvent.bind(this, "Content", activeNote.Content)}
        />
    </comp.Note_Base>
  );
};

export default Note;
