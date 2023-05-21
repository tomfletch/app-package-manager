import dbConnect from './dbConnect';
import AppPackage from '../models/AppPackage';
import Note, { INewNote, INote } from '../models/Note';
import { serializable } from './util';

export async function createNote(appPackageId: string, newNote: INewNote): Promise<INote[]> {
  await dbConnect();
  const newNoteObj = new Note(newNote);
  await AppPackage.findByIdAndUpdate(appPackageId, { $push: { notes: newNoteObj } });
  return serializable(newNoteObj);
}

export async function deleteNote(appPackageId: string, noteId: string): Promise<void> {
  await dbConnect();
  await AppPackage.findByIdAndUpdate(appPackageId, {
    $pull: { notes: { _id: noteId }}
  });
}
