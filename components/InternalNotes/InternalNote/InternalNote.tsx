import { useState } from 'react';
import { Button, IconButton, TextField } from '@mui/material';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { dateToAgo } from '../../../lib/util';
import { INote } from '../../../models/Note';
import styles from './InternalNote.module.css';
import useUser from '../../../hooks/useUser';

type InternalNoteProps = {
  appPackageId: string;
  note: INote;
  onDelete: () => void;
  onEdit: (newNoteBody: string) => void;
};

export default function InternalNote({ appPackageId, note, onDelete, onEdit }: InternalNoteProps) {
  const { user } = useUser();

  const isCurrentUser = user && user.email === note.email;

  const [isEditing, setIsEditing] = useState(false);
  const [newNoteBody, setNewNoteBody] = useState(note.body);

  const handleSaveEdit = async() => {
    await fetch(`/api/app-packages/${appPackageId}/notes/${note._id}`, {
      method: 'PATCH',
      body: JSON.stringify({ body: newNoteBody }),
      headers: { 'Content-Type': 'application/json' }
    });
    onEdit(newNoteBody);
  }

  const handleDelete = async () => {
    await fetch(`/api/app-packages/${appPackageId}/notes/${note._id}`, { method: 'DELETE' });
    onDelete();
  }

  const handleCancelEdit = () => {
    setNewNoteBody(note.body);
    setIsEditing(false);
  }

  return (
    <li className={styles.note}>
      <img className={styles.avatar} src={note.avatarUrl} width={50} height={50} />
      <div>
        <div className={styles.noteMeta}>
          <div>
            <span className={styles.name}>{note.name}</span>
            <span className={styles.age}>{dateToAgo(new Date(note.createdAt))}</span>
          </div>
          {isCurrentUser && (
            <div>
              <IconButton
                onClick={() => setIsEditing(true)}
                aria-label="Edit"
                size="small"
                disabled={isEditing}
              >
                <Edit />
              </IconButton>
              <IconButton
                onClick={handleDelete}
                aria-label="Delete"
                size="small"
              >
                <Delete />
              </IconButton>
            </div>
          )}
        </div>
        <div className={styles.body}>
          {isEditing ? (
            <div>
              <TextField
                className={styles.newNoteBody}
                multiline
                fullWidth
                minRows={2}
                placeholder="Add a comment..."
                value={newNoteBody}
                onChange={(event) => setNewNoteBody(event.target.value)}
              />
              <div className={styles.optionsContainer}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleCancelEdit}
                  startIcon={<Cancel />}
                  disableElevation
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveEdit}
                  startIcon={<Save />}
                  disableElevation
                >
                  Save
                </Button>
              </div>
            </div>
          ) : note.body}
        </div>
      </div>
    </li>
  );
}