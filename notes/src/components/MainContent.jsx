import styles from "./MainContent.module.css";

export default function MainContent({ activeNote, onUpdateNote }) {
  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
    });
  };

  const saveNote = () => {
    const blob = new Blob([activeNote.body], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${activeNote.title}.txt`; // Filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!activeNote)
    return <div className={styles.noActiveNote}>No Active Note</div>;

  return (
    <div className={styles.MainContent}>
      <div className={styles.main}>
        <div className={styles.mainNote}>
          <input
            type="text"
            id="title"
            autoFocus
            value={activeNote.title}
            onChange={(e) => onEditField("title", e.target.value)}
          />
          <textarea
            id="body"
            placeholder="Write your content here..."
            value={activeNote.body}
            onChange={(e) => onEditField("body", e.target.value)}
          />
          <div className={styles.buttons}>
            <button onClick={saveNote}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
}
