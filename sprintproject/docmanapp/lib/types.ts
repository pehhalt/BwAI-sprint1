export interface Document {
  id: string;
  title: string;
  body: string;
  updatedAt: number; // timestamp in ms
  createdAt: number; // timestamp in ms
}
