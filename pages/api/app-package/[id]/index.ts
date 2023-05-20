import { NextApiRequest, NextApiResponse } from 'next';
import { deleteAppPackage, updateAppPackageStatus } from '../../../../lib/appPackages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    body: { status },
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
      await updateAppPackageStatus(id as string, status as string);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
}
