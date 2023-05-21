import { useState } from 'react';
import { INote } from '../../models/Note';
import InternalNote from './InternalNote/InternalNote';
import styles from './InternalNotes.module.css';
import AddNote from './AddNote/AddNote';

type InternalNotesProps = {
  appPackageId: string;
  notes: INote[];
};

export default function InternalNotes({ appPackageId, notes: initialNotes }: InternalNotesProps) {
  const [notes, setNotes] = useState<INote[]>(initialNotes.slice().reverse());

  const onAddNote = (note: INote) => {
    setNotes((prevNotes) => [note, ...prevNotes]);
  };

  const handleDeleteNote = (noteId: string) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId))
  };

  const handleEditNote = (newNote: INote) => {
    setNotes((prevNotes) => prevNotes.map((n) => n._id === newNote._id ? {...newNote } : n));
  };

  return (
    <section>
      <h2>Internal Notes</h2>
      <AddNote appPackageId={appPackageId} onAddNote={onAddNote}/>
      {notes.length !== 0 && (
        <ul className={styles.notesList}>
          {notes.map((note) => (
            <InternalNote
              key={note._id}
              appPackageId={appPackageId}
              note={note}
              onDelete={() => handleDeleteNote(note._id)}
              onEdit={handleEditNote}
            />
          ))}
        </ul>
      )}
    </section>
  );
}