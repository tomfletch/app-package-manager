import dbConnect from './dbConnect';
import AppPackage, { IAppPackage, INewAppPackage } from '../models/AppPackage';
import { serializable } from './util';

export async function getAllAppPackages(): Promise<IAppPackage[]> {
  await dbConnect();
  const result = await AppPackage.find({}).populate('').sort({createdAt: 'desc'});
  return serializable(result);
}

export async function getAppPackage(packageName: string, version: string): Promise<IAppPackage> {
  await dbConnect();
  const result = await AppPackage.findOne({ packageName, version });
  return serializable(result);
}

export async function getRelatedAppPackages(packageName: string): Promise<IAppPackage[]> {
  await dbConnect();
  const result = await AppPackage.find({ packageName }).sort({createdAt: 'desc'});
  return serializable(result);
}

export async function deleteAppPackage(id: string): Promise<void> {
  await dbConnect();
  await AppPackage.findByIdAndDelete(id);
}

export async function updateAppPackageStatus(id: string, status: string): Promise<IAppPackage> {
  await dbConnect();
  const result = await AppPackage.findByIdAndUpdate(id, { status });
  return serializable(result);
}

export async function createAppPackage(appPackage: INewAppPackage): Promise<IAppPackage> {
  await dbConnect();
  const result = await AppPackage.create(appPackage);
  return serializable(result);
}
