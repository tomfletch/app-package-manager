import { useState } from 'react';
import { Avatar, Button, TextField } from '@mui/material';
import styles from './AddNote.module.css';
import useUser from '../../../hooks/useUser';
import { INote } from '../../../models/Note';

type AddNoteProps = {
  appPackageId: string;
  onAddNote: (newNote: INote) => void;
};

export default function AddNote({ appPackageId, onAddNote }: AddNoteProps) {
  const { isLoggedIn, user } = useUser();
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteBody, setNewNoteBody] = useState('');

  const handleAddNote = async () => {
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
    onAddNote(note);
    setNewNoteBody('');
    setIsAdding(false);
  };


  if (!isLoggedIn) {
    return <div className="message">Please sign in to add a note</div>;
  }

  return (
    <div className={styles.newNote}>
      <Avatar
        alt={user.name}
        sx={{ width: 50, height: 50 }}
        src={user.image}
      />
      <div>
        <TextField
          id="new-note-input"
          className={styles.newNoteBody}
          multiline
          fullWidth
          minRows={2}
          placeholder="Add a note..."
          value={newNoteBody}
          onChange={(event) => setNewNoteBody(event.target.value)}
          disabled={isAdding}
        />
        <div className={styles.addNewNoteBtnContainer}>
          <Button
            variant="contained"
            onClick={handleAddNote}
            disabled={isAdding}
            disableElevation
          >
            Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}