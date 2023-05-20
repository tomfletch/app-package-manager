import { NextApiRequest, NextApiResponse } from 'next';
import { createNote } from '../../../../lib/notes';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  const { name, email, image } = session.user;

  const { id } = req.query;
  const { body } =  req.body;
  const requestMethod = req.method;

  if (requestMethod === 'POST') {
    try {
      const note = await createNote(id as string, {
        email,
        name,
        avatarUrl: image,
        body,
      });
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
