import React from "react";
import styles from "./SideBar.module.css";


export default function SideBAr({notes,onAddNotes,onDelete,activeNote,setActiveNote}) {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
    
  return (
   
    <div className={styles.sidebar}>
    <div className={styles.sideHeader}>
      <h1>Notes</h1>
      <button className={styles.btn} onClick={onAddNotes}>Add</button>
    </div>
    <div className={styles.sidebarNotes}>
      {sortedNotes.map((note)=>(
        <div className={`styles.note ${note.id===activeNote && styles.active}`}
        onClick={()=>setActiveNote(note.id)}>
        <div className={styles.noteTitle}>
          <strong>{note.title}</strong>
          <button onClick={()=>onDelete(note.id)} className={styles.btn1}>Delete</button>
        </div>
        <p>{note.body && note.body.substr(0,10)+"..."}</p>
       
      </div>
      )
      )}
    </div>
   </div>

  );
}
