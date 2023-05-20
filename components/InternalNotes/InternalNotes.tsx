import { Button, TextField } from '@mui/material';
import { INote } from '../../models/Note';
import styles from './InternalNotes.module.css';
import { useState } from 'react';
import { dateToAgo } from '../../lib/util';
import useUser from '../../hooks/useUser';

type InternalNotesProps = {
  appPackageId: string;
  notes: INote[];
};

export default function InternalNotes({ appPackageId, notes: initialNotes }: InternalNotesProps) {
  const { isLoggedIn, user } = useUser();

  const [isAdding, setIsAdding] = useState(false);
  const [newNoteBody, setNewNoteBody] = useState('');
  const [notes, setNotes] = useState(initialNotes.slice().reverse());

  const onAddNote = async () => {
    setIsAdding(true);
    const newNote = { body: newNoteBody };

    const response = await fetch(`/api/app-packages/${appPackageId}/notes`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote)
    });
    const note = await response.json();
    setNotes((prevNotes) => [note, ...prevNotes]);
    setNewNoteBody('');
    setIsAdding(false);
  };

  return (
    <section>
      <h2>Internal Notes</h2>
      {isLoggedIn ? (
        <div className={styles.newNote}>
          <img src={user.image} width="50" height="50" />
          <div>
            <TextField
              className={styles.newNoteBody}
              multiline
              fullWidth
              minRows={2}
              placeholder="Add a comment..."
              value={newNoteBody}
              onChange={(event) => setNewNoteBody(event.target.value)}
              disabled={isAdding}
            />
            <div className={styles.addNewNoteBtnContainer}>
              <Button
                variant="contained"
                onClick={onAddNote}
                disabled={isAdding}
              >
                Add Note
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="message">Please sign in to add a note</div>
      )}


      {notes.length !== 0 && (
        <ul className={styles.notesList}>
          {notes.map((note) => (
            <li key={note._id}>
              <img src={note.avatarUrl} width={50} height={50} />
              <div className={styles.noteMeta}>
                <span className={styles.name}>{note.name}</span>
                <span>{dateToAgo(new Date(note.createdAt))}</span>
              </div>
              <div className={styles.body}>{note.body}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}