import { useState, useEffect } from "react";
import "./App.css";
import MainContent from "./components/MainContent";
import SideBar from "./components/SideBar";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function onAddNotes() {
    const newNote = {
      id: uuid(),
      title: "Untitled Notes",
      body: "",
    };
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
  }

  const onUpdateNotes = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesArr);
  };

  const onDelete = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
  };

  const onSaveNote = () => {
    console.log("Save function triggered");
  };

  function getActiveNote() {
    return notes.find(({ id }) => id === activeNote);
  }

  return (
    <div className="App">
      <SideBar
        notes={notes}
        onAddNotes={onAddNotes}
        onDelete={onDelete}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      <MainContent
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNotes}
        onSaveNote={onSaveNote}
      />
    </div>
  );
}

export default App;
