import { NextApiRequest, NextApiResponse } from 'next';
import { createFile, readFile } from '../../../../lib/file';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { appPackageId },
    body: appPackageFile,
    method,
  } = req;

  if (method === 'GET') {
    try {
      const packageFile = readFile(appPackageId as string);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-disposition', 'attachment; filename=package.apk');
      res.status(200).send(packageFile);
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === 'PUT') {
    try {
      createFile(appPackageId as string, appPackageFile);
      res.status(204).end();
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}
