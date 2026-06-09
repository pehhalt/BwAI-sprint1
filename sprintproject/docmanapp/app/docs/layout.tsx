'use client';

import { DocumentsProvider } from '@/lib/DocumentsContext';
import DocsLayoutContent from './layout-content';

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocumentsProvider>
      <DocsLayoutContent>{children}</DocsLayoutContent>
    </DocumentsProvider>
  );
}
