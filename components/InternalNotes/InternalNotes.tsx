import { Note } from '../../models/appPackage';
import styles from './InternalNotes.module.css';

type InternalNotesProps = {
  notes: Note[];
};

export default function InternalNotes({ notes }: InternalNotesProps) {
  return (
    <section>
      <h2>Internal Notes</h2>
      {notes.length !== 0 && (
        <ul className={styles.notesList}>
          {notes.map((note) => (
            <li key={note.id}>
              <img src={`https://i.pravatar.cc/50?u=${note.email}`} />
              <div className={styles.noteMeta}>
                <span className={styles.name}>{note.name}</span>
                <span>{note.createdAt}</span>
              </div>
              <div className={styles.body}>{note.body}</div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}