import { dateToAgo } from '../../../lib/util';
import { INote } from '../../../models/Note';
import styles from './InternalNote.module.css';

type InternalNoteProps = {
  note: INote
}

export default function InternalNote({ note }: InternalNoteProps) {
  return (
    <li className={styles.note}>
      <img className={styles.avatar} src={note.avatarUrl} width={50} height={50} />
      <div>
        <div className={styles.noteMeta}>
          <span className={styles.name}>{note.name}</span>
          <span className={styles.age}>{dateToAgo(new Date(note.createdAt))}</span>
        </div>
        <div className={styles.body}>{note.body}</div>
      </div>
    </li>
  );
}