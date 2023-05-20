import mongoose from 'mongoose';

export interface INote {
  _id: string;
  email: string;
  name: string;
  body: string;
  avatarUrl: string;
  createdAt: string;
}

export interface INewNote {
  email: string;
  name: string;
  body: string;
  avatarUrl: string;
}

export const noteSchema = new mongoose.Schema(
  {
    appPackage: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'AppPackage'
    },
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    avatarUrl: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  }
);

export default mongoose.models.Note || mongoose.model('Note', noteSchema);
