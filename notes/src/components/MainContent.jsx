
// import styles from './MainContent.module.css'
// import ReactMarkdown from "react-markdown";
// import JoditEditor from 'jodit-react';
// import React, { useState, useRef } from 'react';

// export default function MainContent({activeNote, onUpdateNote}) {

//   const editor = useRef(null);
//   const [content, setContent] = useState('');

//   const onEditField = (field, value) => {
//     onUpdateNote({
//       ...activeNote,
//       [field]: value,
//       lastModified: Date.now(),
//     });
//   }
//   if (!activeNote) return <div className={styles.noActiveNote}>No Active Note</div>;

//   return (

//     <div className={styles.main}>
//     <JoditEditor
// 			ref={editor}
// 			value={content}
// 			onChange={newContent => setContent(newContent)}
// 		/>

//     <div className={styles.mainNote}>
//     <input type='text' id='title' autoFocus value={activeNote.title} onChange={(e) => onEditField("title", e.target.value)}/>
//     <textarea id='body' placeholder='write your content here ......' value={activeNote.body} onChange={(e) => onEditField("body", e.target.value)}/>
//     </div>
//     <div className={styles.notePreview}>
//     <h1 className={styles.previewTitle}>{ activeNote.title }</h1>
//     <ReactMarkdown className={styles.markdownPreview}>
//           {activeNote.body}
//         </ReactMarkdown>

//     </div>
//     </div>
//   )
// }


import React, { useState } from 'react';
import styles from './MainContent.module.css';
import ReactMarkdown from "react-markdown";

export default function MainContent({activeNote, onUpdateNote}) {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const onEditField = (field, value) => {
    onUpdateNote({
      ...activeNote,
      [field]: value,
      lastModified: Date.now(),
    });
  };

  const toggleBold = () => {
    setIsBold(!isBold);
    onEditField("body", isBold ? removeFormatting(activeNote.body, 'bold') : applyFormatting(activeNote.body, 'bold'));
  };

  const toggleItalic = () => {
    setIsItalic(!isItalic);
    onEditField("body", isItalic ? removeFormatting(activeNote.body, 'italic') : applyFormatting(activeNote.body, 'italic'));
  };

  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
    onEditField("body", isUnderline ? removeFormatting(activeNote.body, 'underline') : applyFormatting(activeNote.body, 'underline'));
  };

  const saveNote = () => {
    const blob = new Blob([activeNote.body], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeNote.title}.txt`; // Filename
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const applyFormatting = (text, formatting) => {
    switch (formatting) {
      case 'bold':
        return `**${text}**`;
      case 'italic':
        return `*${text}*`;
      case 'underline':
        return `<u>${text}</u>`;
      default:
        return text;
    }
  };

  const removeFormatting = (text, formatting) => {
    switch (formatting) {
      case 'bold':
        return text.replace(/\*\*(.*?)\*\*/g, '$1');
      case 'italic':
        return text.replace(/\*(.*?)\*/g, '$1');
      case 'underline':
        return text.replace(/<u>(.*?)<\/u>/g, '$1');
      default:
        return text;
    }
  };

  if (!activeNote) return <div className={styles.noActiveNote}>No Active Note</div>;

  return (
   <div className={styles.MainContent}>
     <div className={styles.main}>
      <div className={styles.mainNote}>
        <input
          type='text'
          id='title'
          autoFocus
          value={activeNote.title}
          onChange={(e) => onEditField("title", e.target.value)}
        />
        <textarea
          id='body'
          placeholder='Write your content here...'
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
