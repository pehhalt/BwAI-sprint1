export interface Document {
  id: string;
  title: string;
  body: string;
  tags: string[];
  updatedAt: number; // timestamp in ms
  createdAt: number; // timestamp in ms
  isDeleted: boolean;
  deletedAt?: number; // timestamp when moved to trash
}
