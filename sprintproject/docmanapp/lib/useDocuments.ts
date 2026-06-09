'use client';

import { useEffect, useState } from 'react';
import { Document } from './types';
import {
  getAllDocuments,
  getDocumentById,
  createDocument as createDocumentStorage,
  updateDocument as updateDocumentStorage,
  softDeleteDocument as softDeleteDocumentStorage,
  restoreDocument as restoreDocumentStorage,
  permanentlyDeleteDocument as permanentlyDeleteDocumentStorage,
  emptyTrash as emptyTrashStorage,
} from './storage';

export function useDocuments() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const docs = getAllDocuments();
    setDocuments(docs);
    setIsLoaded(true);
  }, []);

  const createDocument = (title: string = 'Untitled'): Document => {
    const doc = createDocumentStorage(title);
    setDocuments(prev => [...prev, doc].sort((a, b) => b.updatedAt - a.updatedAt));
    return doc;
  };

  const updateDocument = (id: string, updates: Partial<Omit<Document, 'id' | 'createdAt'>>): Document | null => {
    const updated = updateDocumentStorage(id, updates);
    if (updated) {
      setDocuments(prev =>
        prev.map(doc => (doc.id === id ? updated : doc)).sort((a, b) => b.updatedAt - a.updatedAt)
      );
    }
    return updated;
  };

  const deleteDocument = (id: string): boolean => {
    const deleted = softDeleteDocumentStorage(id);
    if (deleted) {
      setDocuments(prev =>
        prev.map(doc => (doc.id === id ? deleted : doc))
      );
    }
    return deleted !== null;
  };

  const restoreDocument = (id: string): boolean => {
    const restored = restoreDocumentStorage(id);
    if (restored) {
      setDocuments(prev =>
        prev.map(doc => (doc.id === id ? restored : doc))
      );
    }
    return restored !== null;
  };

  const emptyTrash = (): void => {
    emptyTrashStorage();
    setDocuments(prev => prev.filter(doc => !doc.isDeleted));
  };

  const getDocument = (id: string): Document | null => {
    return getDocumentById(id);
  };

  const getSortedDocuments = (): Document[] => {
    return [...documents].sort((a, b) => b.updatedAt - a.updatedAt);
  };

  return {
    documents: getSortedDocuments(),
    isLoaded,
    createDocument,
    updateDocument,
    deleteDocument,
    restoreDocument,
    emptyTrash,
    getDocument,
  };
}
