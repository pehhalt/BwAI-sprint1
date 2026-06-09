'use client';

import { useState } from 'react';
import { useDocumentsContext } from '@/lib/DocumentsContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocsLayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { documents, isLoaded, createDocument, deleteDocument } = useDocumentsContext();
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNewDocument = () => {
    createDocument();
  };

  const getCurrentDocId = () => {
    const match = pathname.match(/\/docs\/(.+?)$/);
    return match ? match[1] : null;
  };

  const currentDocId = getCurrentDocId();

  const allTags = Array.from(new Set(documents.flatMap(doc => doc.tags || [])));

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag ? (doc.tags || []).includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const handleDeleteClick = (e: React.MouseEvent, docId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteConfirmId(docId);
  };

  const handleConfirmDelete = (docId: string) => {
    deleteDocument(docId);
    setDeleteConfirmId(null);
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      {/* App container with max-width */}
      <div className="flex flex-col flex-1 max-w-6xl mx-auto w-full">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-4 py-4 md:px-6 flex items-center justify-between md:rounded-t-lg">
        <Link href="/" className="text-2xl font-bold text-slate-900 hover:text-slate-700 transition-colors">
          DocMan
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Toggle sidebar"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main workspace container */}
      <div className="flex flex-1 overflow-hidden gap-0 md:gap-6 bg-white md:rounded-b-lg">
        {/* Sidebar */}
        <aside className={`fixed md:static inset-y-0 left-0 w-64 border-r border-slate-200 bg-slate-50 p-4 overflow-y-auto transition-transform duration-200 z-50 md:z-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}>
          <div className="mb-4 flex flex-col gap-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-slate-700">Documents</h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="md:hidden p-1 text-slate-500 hover:text-slate-900 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <button
              onClick={handleNewDocument}
              className="w-full rounded-lg bg-slate-900 px-4 py-2 text-white font-medium hover:bg-slate-800 transition-colors"
            >
              + New Document
            </button>
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Tag filter */}
          {allTags.length > 0 && (
            <div className="mb-3 space-y-2">
              <p className="text-xs font-semibold text-slate-600">Filters:</p>
              <div className="flex flex-wrap gap-1">
                {selectedTag && (
                  <button
                    onClick={() => setSelectedTag(null)}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-900 text-white text-xs rounded-full hover:bg-slate-800 transition-colors"
                  >
                    #{selectedTag}
                    <span>✕</span>
                  </button>
                )}
                {allTags.filter(tag => tag !== selectedTag).map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className="px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-full hover:bg-slate-300 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Document list */}
          {!isLoaded ? (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">Loading...</p>
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">No documents yet</p>
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-500 text-sm">No results {selectedTag ? `for #${selectedTag}` : `for "${searchQuery}"`}</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {filteredDocuments.map(doc => (
                <li key={doc.id} className="group">
                  <div className="flex flex-col gap-1">
                    <Link
                      href={`/docs/${doc.id}`}
                      onClick={() => setIsSidebarOpen(false)}
                      className={`block rounded-lg border p-3 transition-colors truncate text-sm ${
                        currentDocId === doc.id
                          ? 'border-slate-300 bg-white text-slate-900 font-medium'
                          : 'border-transparent text-slate-900 hover:bg-white hover:border-slate-200'
                      }`}
                    >
                      {doc.title || 'Untitled'}
                    </Link>
                    {(doc.tags || []).length > 0 && (
                      <div className="px-3 flex flex-wrap gap-1">
                        {doc.tags.map(tag => (
                          <span
                            key={tag}
                            className="inline-text-xs px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 px-3">
                    <button
                      onClick={e => handleDeleteClick(e, doc.id)}
                      className="mr-2 p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete document"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Content area */}
        <main className="flex-1 overflow-hidden w-full md:w-auto">{children}</main>
      </div>

      {/* Delete confirmation modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete document?</h3>
            <p className="text-slate-600 mb-6">
              This action cannot be undone. The document will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-slate-900 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmDelete(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
