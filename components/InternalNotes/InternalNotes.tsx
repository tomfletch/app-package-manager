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

  return (
    <section>
      <h2>Internal Notes</h2>
      <AddNote appPackageId={appPackageId} onAddNote={onAddNote}/>
      {notes.length !== 0 && (
        <ul className={styles.notesList}>
          {notes.map((note) => (
            <InternalNote key={note._id} note={note} />
          ))}
        </ul>
      )}
    </section>
  );
}