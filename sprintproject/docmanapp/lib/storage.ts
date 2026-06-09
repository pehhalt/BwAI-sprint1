import { Document } from './types';

const STORAGE_KEY = 'docman_documents';

function getAllDocuments(): Document[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function getDocumentById(id: string): Document | null {
  const docs = getAllDocuments();
  return docs.find(doc => doc.id === id) || null;
}

function createDocument(title: string = 'Untitled'): Document {
  const id = Math.random().toString(36).substring(2, 11);
  const now = Date.now();

  const doc: Document = {
    id,
    title,
    body: '',
    tags: [],
    isDeleted: false,
    createdAt: now,
    updatedAt: now,
  };

  const docs = getAllDocuments();
  docs.push(doc);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));

  return doc;
}

function updateDocument(id: string, updates: Partial<Omit<Document, 'id' | 'createdAt'>>): Document | null {
  const docs = getAllDocuments();
  const docIndex = docs.findIndex(doc => doc.id === id);

  if (docIndex === -1) return null;

  const doc = docs[docIndex];
  const updated: Document = {
    ...doc,
    ...updates,
    updatedAt: Date.now(),
  };

  docs[docIndex] = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));

  return updated;
}

function softDeleteDocument(id: string): Document | null {
  const docs = getAllDocuments();
  const docIndex = docs.findIndex(doc => doc.id === id);

  if (docIndex === -1) return null;

  const doc = docs[docIndex];
  const deleted: Document = {
    ...doc,
    isDeleted: true,
    deletedAt: Date.now(),
    updatedAt: Date.now(),
  };

  docs[docIndex] = deleted;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));

  return deleted;
}

function restoreDocument(id: string): Document | null {
  const docs = getAllDocuments();
  const docIndex = docs.findIndex(doc => doc.id === id);

  if (docIndex === -1) return null;

  const doc = docs[docIndex];
  const restored: Document = {
    ...doc,
    isDeleted: false,
    deletedAt: undefined,
    updatedAt: Date.now(),
  };

  docs[docIndex] = restored;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));

  return restored;
}

function permanentlyDeleteDocument(id: string): boolean {
  const docs = getAllDocuments();
  const filtered = docs.filter(doc => doc.id !== id);

  if (filtered.length === docs.length) return false;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
}

function emptyTrash(): void {
  const docs = getAllDocuments();
  const active = docs.filter(doc => !doc.isDeleted);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(active));
}

export { getAllDocuments, getDocumentById, createDocument, updateDocument, softDeleteDocument, restoreDocument, permanentlyDeleteDocument, emptyTrash };
