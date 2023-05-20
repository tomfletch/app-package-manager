import mongoose from 'mongoose';
import { INote, noteSchema } from './Note';

export interface IAppPackage {
  _id: string;
  name: string;
  packageName: string;
  version: string;
  description: string;
  status: string;
  notes: INote[];
}

export interface INewAppPackage {
  name: string;
  packageName: string;
  version: string;
  description: string;
  status: string;
};

export type IAppPackageUpdate = Partial<INewAppPackage>;

const appPackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  packageName: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'Draft'
  },
  notes: [noteSchema]
}, {
  timestamps: true
});

const AppPackage = mongoose.models.AppPackage || mongoose.model('AppPackage', appPackageSchema);
export default AppPackage;