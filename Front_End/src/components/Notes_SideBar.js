import * as comp from "./Notes_Components";
import { Link } from "react-router-dom";
import {Button} from "../components/Buttons";

const Notes_Sidebar = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    const sortedNotes = notes.sort((a, b) => (new Date(b.Last_Modified)).getTime() - (new Date(a.Last_Modified)).getTime());
  
    return (
      <comp.Notes_SideBar_Base>
        <comp.Notes_SideBar_Header_Base>
          <comp.Notes_SideBar_Header>Notes</comp.Notes_SideBar_Header>
          <comp.Notes_SideBar_Header_Button onClick={onAddNote}>Add</comp.Notes_SideBar_Header_Button>
        </comp.Notes_SideBar_Header_Base>
        <comp.Notes_SideBar_Notes_List>
          {sortedNotes.map((note) => (
            <comp.Notes_SideBar_Note
              className={`${note.ID === activeNote && "active"}`}
              onClick={() => setActiveNote(note.ID)}
            >
              <comp.Notes_SideBar_Note_Header>
                <comp.Notes_SideBar_Note_Title>{note.Title}</comp.Notes_SideBar_Note_Title>
                <comp.Notes_SideBar_Note_Delete onClick={(e) => onDeleteNote(note)}>Delete</comp.Notes_SideBar_Note_Delete>
              </comp.Notes_SideBar_Note_Header>

              <comp.Notes_SideBar_Note_Content>{note.Content}</comp.Notes_SideBar_Note_Content>
              <comp.Notes_SideBar_Note_Modified> Last Modified: {note.Last_Modified}</comp.Notes_SideBar_Note_Modified>
            </comp.Notes_SideBar_Note>
          ))}
        </comp.Notes_SideBar_Notes_List>
        <div class="dropdown">
            <Button className="dropbtn">Share</Button>
            <div class="dropdown-content"> 
              <>
                <Link to="/friends"> Friend </Link>
                <Link to="/friends"> Friend </Link>
                <Link to="/friends"> Friend </Link>
                <Link to="/friends"> Friend </Link>
                <Link to="/friends"> Friend </Link>
                {console.log("Shared note with friend")}
              </>
            </div>
          </div>
      </comp.Notes_SideBar_Base>
    );
};
  
export default Notes_Sidebar;
  