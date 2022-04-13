const Side_bar_Notes = ({
    notes,
    onAddNote,
    onDeleteNote,
    activeNote,
    setActiveNote,
  }) => {
    const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  
    return (
      <div className="notes-sidebar">
        <div className="notes-sidebar-header">
          <h1>Notes</h1>
          <button onClick={onAddNote}>Add</button>
        </div>
        <div className="notes-sidebar-notes">
          {sortedNotes.map((note) => (
            <div
              className={`notes-sidebar-note ${note.ID === activeNote && "active"}`}
              onClick={() => setActiveNote(note.ID)}
            >
              <div className="notes-note-title">
                <strong>{note.Title}</strong>
                <button onClick={(e) => onDeleteNote(note)}>Delete</button>
              </div>
  
              <p>{note.Content}</p>
              <small className="note-meta">
                Last Modified {note.Last_Modified}
              </small>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Side_bar_Notes;
  