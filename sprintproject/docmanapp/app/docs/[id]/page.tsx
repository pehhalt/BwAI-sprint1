'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Document } from '@/lib/types';
import { useDocumentsContext } from '@/lib/DocumentsContext';
import { useAutosave } from '@/lib/useAutosave';

export default function DocumentPage() {
  const params = useParams();
  const documentId = params.id as string;
  const { getDocument, updateDocument } = useDocumentsContext();

  const [document, setDocument] = useState<Document | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const bodyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  const titleStatus = useAutosave(title, (newTitle) => {
    updateDocument(documentId, { title: newTitle });
  });

  const bodyStatus = useAutosave(body, (newBody) => {
    updateDocument(documentId, { body: newBody });
  });

  const tagsStatus = useAutosave(JSON.stringify(tags), () => {
    updateDocument(documentId, { tags });
  });

  useEffect(() => {
    const doc = getDocument(documentId);
    if (doc) {
      setDocument(doc);
      setTitle(doc.title);
      setBody(doc.body);
      setTags(doc.tags || []);
    }
    setIsLoaded(true);
  }, [documentId, getDocument]);

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleBodyChange = (newBody: string) => {
    setBody(newBody);
  };

  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const saveStatus = titleStatus === 'saving' || bodyStatus === 'saving' || tagsStatus === 'saving' ? 'saving' :
                     titleStatus === 'saved' || bodyStatus === 'saved' || tagsStatus === 'saved' ? 'saved' : 'idle';

  const wordCount = body.trim().split(/\s+/).filter(word => word.length > 0).length;

  if (!isLoaded) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-slate-500">Loading...</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2">
            Document not found
          </h2>
          <p className="text-slate-600">
            This document doesn't exist or has been deleted.
          </p>
        </div>
        <Link
          href="/docs"
          className="rounded-lg bg-slate-900 px-4 py-2 text-white font-medium hover:bg-slate-800 transition-colors"
        >
          Back to Workspace
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Title field with autosave indicator and preview toggle */}
      <div className="border-b border-slate-200 bg-white px-3 py-3 md:px-6 md:py-4 space-y-3">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <input
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                bodyTextareaRef.current?.focus();
              }
            }}
            placeholder="Title"
            className="flex-1 text-xl md:text-2xl font-bold text-slate-900 placeholder-slate-400 focus:outline-none bg-transparent"
          />
          <div className="flex flex-col md:flex-row items-end md:items-center gap-2 md:gap-3">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="px-2 md:px-3 py-1 text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors whitespace-nowrap"
            >
              {isPreview ? 'Edit' : 'Preview'}
            </button>
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 whitespace-nowrap">
              {wordCount > 0 && <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>}
              <span>
                {saveStatus === 'saving' && 'Saving...'}
                {saveStatus === 'saved' && 'Saved'}
                {saveStatus === 'idle' && ''}
              </span>
            </div>
          </div>
        </div>

        {/* Tags section */}
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              ref={tagInputRef}
              type="text"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              onFocus={() => {
                setTimeout(() => {
                  tagInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 100);
              }}
              placeholder="Add a tag (press Enter)"
              className="flex-1 px-2 py-1 text-xs md:text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            <button
              onClick={handleAddTag}
              className="px-3 py-1 text-xs md:text-sm font-medium text-slate-600 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Add
            </button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2 py-1 bg-slate-200 text-slate-700 text-xs rounded-full"
                >
                  #{tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Body editor or preview */}
      {isPreview ? (
        <div className="flex-1 overflow-auto bg-white px-6 py-4">
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4 text-slate-900" {...props} />,
                h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3 text-slate-900" {...props} />,
                h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2 text-slate-900" {...props} />,
                p: ({ node, ...props }) => <p className="mb-3 text-slate-700 leading-relaxed" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                em: ({ node, ...props }) => <em className="italic text-slate-700" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-3 space-y-1 text-slate-700" {...props} />,
                ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-3 space-y-1 text-slate-700" {...props} />,
                li: ({ node, ...props }) => <li className="text-slate-700" {...props} />,
              }}
            >
              {body || '*No content*'}
            </ReactMarkdown>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-auto bg-white">
          <textarea
            ref={bodyTextareaRef}
            value={body}
            onChange={e => handleBodyChange(e.target.value)}
            placeholder="Start typing... Use markdown for formatting"
            className="w-full p-6 text-slate-900 placeholder-slate-400 focus:outline-none"
            style={{ minHeight: '400px', resize: 'vertical' }}
          />
        </div>
      )}
    </div>
  );
}
