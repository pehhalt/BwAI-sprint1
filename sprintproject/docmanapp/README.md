# DocMan

A simple, local-only personal document management app built with Next.js, TypeScript, and Tailwind CSS.

## What is DocMan?

DocMan is a minimal document editor that runs entirely in your browser. Write, organize, and save documents locally without any backend server. All data persists in your browser's localStorage.

**Features:**
- 📝 **Rich document editor** with markdown support (edit/preview toggle)
- 💾 **Autosave** - changes save automatically as you type
- 🔍 **Search** - filter documents by title in real-time
- 📊 **Word count** - see document statistics at a glance
- 📱 **Responsive design** - works on desktop, tablet, and mobile
- 🎯 **Direct document links** - each document has its own URL
- ⏱️ **Sorted by recent** - documents list by most recently updated
- ❌ **Delete with confirmation** - safe deletion with user confirmation
- 🔤 **Markdown rendering** - write markdown, preview the rendered output

## How to Run

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3001](http://localhost:3001) in your browser to use DocMan.

## How to Use

1. **Create a document** - Click "New Document" in the sidebar
2. **Edit** - Type your title and body content
3. **Autosave** - Watch for the "Saving..." → "Saved" indicator
4. **Search** - Use the search box to filter documents by title
5. **Preview markdown** - Click "Preview" to see formatted markdown output
6. **Word count** - Check the word count in the header
7. **Delete** - Hover over a document and click the delete icon (trash)

### Keyboard Shortcuts
- **Enter in title field** → Move focus to document body

## Project Structure

```
app/
├── page.tsx              # Home page
├── layout.tsx            # Root layout with html/body setup
├── docs/
│   ├── layout-content.tsx # Workspace layout with sidebar
│   ├── layout.tsx         # Docs layout wrapper
│   ├── page.tsx           # Empty workspace state
│   └── [id]/
│       └── page.tsx       # Document editor
lib/
├── types.ts              # TypeScript types (Document interface)
├── storage.ts            # localStorage utilities
├── useDocuments.ts       # Document management hook
├── useAutosave.ts        # Autosave debouncing hook
└── DocumentsContext.tsx  # React context for shared state
docs/
└── nextjs-app-router-layouts-and-pages.md # Reference docs
```

## Data Persistence

DocMan uses **localStorage** to persist all documents in your browser. This means:
- ✅ Data persists across page reloads
- ✅ Works completely offline
- ⚠️ Clearing browser data will delete all documents
- ⚠️ Data is local to each browser (not synced across devices)

Future migration to IndexedDB is possible without changing the app's UI or logic.

## Technology Stack

- **Framework**: Next.js 16+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Markdown**: react-markdown
- **Storage**: Browser localStorage
- **State Management**: React Context + Hooks

## Responsive Design

- **Desktop** (≥768px): Sidebar + editor side-by-side, full featured UI
- **Tablet** (≥768px): Same as desktop
- **Mobile** (<768px): Hamburger menu, stacked layout, optimized touch targets

## Optional Features Implemented

**Word Count** - The editor displays a real-time word count in the header. This is useful for:
- Tracking document length
- Meeting word count targets
- Understanding content scope

## Features Completed

✅ Home page (`/`)
✅ Workspace layout (`/docs`)
✅ Document creation & navigation
✅ Dynamic document routes (`/docs/[id]`)
✅ Title & body editing
✅ Autosave with visual feedback
✅ Document search by title
✅ Delete with confirmation
✅ Markdown edit/preview toggle
✅ Word count display
✅ Responsive mobile/desktop layout
✅ Keyboard navigation (Enter in title → focus body)
✅ localStorage persistence
✅ Document sorting (most recent first)

## Next Steps (Future Enhancements)

- [ ] IndexedDB migration for larger storage
- [ ] Document categories/tags
- [ ] Export/import functionality
- [ ] Document history/versioning
- [ ] Dark mode toggle
- [ ] Starred/favorite documents
- [ ] Soft delete with trash

## Development Notes

- Run `npm run dev` to start the development server
- The app is configured for localhost development only
- No backend server required
- All data is stored locally in the browser

## License

Created as part of Turing College BwAI Sprint 1 project.
