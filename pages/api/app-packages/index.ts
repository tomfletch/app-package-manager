import { NextApiRequest, NextApiResponse } from 'next';
import { createAppPackage } from '../../../lib/appPackages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const requestMethod = req.method;

  if (requestMethod === 'POST') {
    try {
      const appPackage = await createAppPackage(req.body);
      res.status(201).json(appPackage);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
