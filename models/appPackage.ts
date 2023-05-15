export type Note = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  body: string;
}

export type Status = 'Draft' | 'Submitted' | 'Released';

export type AppPackage = {
  name: string;
  packageName: string;
  version: string;
  createdAt: string;
  description: string;
  status: Status;
  notes: Note[];
}
