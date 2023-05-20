import { NextApiRequest, NextApiResponse } from 'next';
import { deleteAppPackage, updateAppPackage } from '../../../../lib/appPackages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body,
    method,
  } = req;

  if (method === 'DELETE') {
    try {
      await deleteAppPackage(id as string);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === 'PATCH') {
    try {
      await updateAppPackage(id as string, body);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
}
