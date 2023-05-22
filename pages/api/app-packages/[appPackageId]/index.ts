import { NextApiRequest, NextApiResponse } from 'next';
import { deleteAppPackage, updateAppPackage } from '../../../../lib/appPackages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { appPackageId },
    body,
    method,
  } = req;

  if (method === 'DELETE') {
    try {
      await deleteAppPackage(appPackageId as string);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === 'PATCH') {
    try {
      const appPackage = await updateAppPackage(appPackageId as string, body);
      res.status(200).json(appPackage);
    } catch (error) {
      res.status(500).json({ success: false });
    }
  }
}
