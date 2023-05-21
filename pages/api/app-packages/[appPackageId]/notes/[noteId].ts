import { NextApiRequest, NextApiResponse } from 'next';
import { createNote, deleteNote } from '../../../../../lib/notes';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { name, email, image } = session.user;

  const { appPackageId, noteId } = req.query;
  const { body } =  req.body;
  const requestMethod = req.method;

  if (requestMethod === 'DELETE') {
    try {
      // TODO: Check user is authorised to remove the note
      const note = await deleteNote(appPackageId as string, noteId as string);
      res.status(204).json(note);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
