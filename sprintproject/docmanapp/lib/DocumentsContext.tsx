'use client';

import React, { createContext, useContext } from 'react';
import { useDocuments } from './useDocuments';
import { Document } from './types';

interface DocumentsContextType {
  documents: Document[];
  isLoaded: boolean;
  createDocument: (title?: string) => Document;
  updateDocument: (id: string, updates: Partial<Omit<Document, 'id' | 'createdAt'>>) => Document | null;
  deleteDocument: (id: string) => boolean;
  restoreDocument: (id: string) => boolean;
  emptyTrash: () => void;
  getDocument: (id: string) => Document | null;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

export function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const documentsHook = useDocuments();

  return (
    <DocumentsContext.Provider value={documentsHook}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocumentsContext() {
  const context = useContext(DocumentsContext);
  if (!context) {
    throw new Error('useDocumentsContext must be used within DocumentsProvider');
  }
  return context;
}
