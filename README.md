# Building with AI - Sprint 1 Output

A comprehensive sprint showcasing foundational web development projects built with AI assistance through Claude Code, progressing from static sites to a fully-featured document management application.

---

## Part 2 - Research & Profile

**Overview:** Initial research and profile documentation.

- **about-me.md** - Comprehensive profile information for Peter Ehhalt including professional background, musical performances, and location details
- **project-notes.md** - Initial learning notes on Claude Code

**Purpose:** Establishes baseline information and introduces working with AI-powered development tools.

---

## Part 3 - Static Portfolio Page

**Overview:** A simple, dependency-free portfolio website for Peter Ehhalt.

- **Technology:** Vanilla HTML, CSS, and JavaScript (no frameworks)
- **Features:**
  - Responsive design (mobile-first)
  - Professional portfolio layout
  - Semantic HTML structure
  - Complete styling system
  - Minimal JavaScript for interactions

**Files:**
- `index.html` - Semantic portfolio page with full content
- `style.css` - Complete responsive styling
- `app.js` - Optional JavaScript interactivity

**Deployment:** Works anywhere static files are served (GitHub Pages, Netlify, S3, etc). No build step required.

---

## Part 4 - Vanilla Todo Web App

**Overview:** A minimal, fully functional todo application with persistent storage.

- **Technology:** Pure HTML, CSS, and JavaScript with `localStorage`
- **Features:**
  - Add, complete, and delete todos
  - Mark todos as done/undone
  - Clear all completed todos
  - Display todo counts
  - Persistent state across browser sessions
  - Fully responsive design

**Architecture:**
- No frameworks, build tools, or npm packages
- localStorage-based data persistence
- ~10-15KB total file size
- Offline-first approach

**Files:**
- `index.html` - Minimal HTML scaffold
- `style.css` - Complete responsive styling
- `app.js` - Todo logic and localStorage management

**How it works:** Data automatically syncs to browser storage on every action, so todos persist after page refresh or browser close.

---

## Part 6 & 7 - Next.js App Exploration

Part 6 covers learning Next.js fundamentals with the App Router. Part 7 builds upon this with a Next.js application.

---

## SprintProject - DocMan

**Overview:** A complete, production-ready document management application demonstrating modern full-stack development with Next.js.

Located in: `sprintproject/docmanapp/`

### Features
- 📝 **Rich editor** with markdown support (edit/preview toggle)
- 💾 **Autosave** with visual feedback (Saving... → Saved)
- 🔍 **Search** documents by title in real-time
- 📊 **Word count** tracking
- 📱 **Responsive design** (mobile hamburger menu, desktop side-by-side layout)
- 🎯 **Direct document links** (`/docs/[id]`)
- 📋 **Sort** by most recently updated
- ❌ **Delete** with confirmation
- 🔤 **Markdown rendering** with styled preview
- 📄 **DIN A4 width** constraint for document-focused layout

### Technology Stack
- **Framework:** Next.js 16.2.7 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Markdown:** react-markdown
- **Storage:** Browser localStorage (production-ready, IndexedDB migration path available)
- **State:** React Context + Hooks

### Project Structure
```
sprintproject/docmanapp/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   └── docs/
│       ├── layout-content.tsx  # Workspace with sidebar
│       ├── layout.tsx          # Docs layout wrapper
│       ├── page.tsx            # Workspace view
│       └── [id]/page.tsx       # Document editor
├── lib/
│   ├── types.ts                # TypeScript interfaces
│   ├── storage.ts              # localStorage utilities
│   ├── useDocuments.ts         # Document state hook
│   ├── useAutosave.ts          # Autosave debouncing
│   └── DocumentsContext.tsx    # React context
├── docs/
│   └── nextjs-app-router-layouts-and-pages.md  # Reference docs
├── README.md                   # Complete app documentation
└── REFLECTION.md               # Development insights
```

### Running the App
```bash
cd sprintproject/docmanapp
npm install
npm run dev
# Open http://localhost:3001
```

### Key Implementation Details
- **No backend required** - all data persists in browser localStorage
- **Responsive layout** - fixed A4 width on desktop, full-width on mobile
- **Keyboard navigation** - Enter in title field moves focus to body
- **Real-time updates** - document list updates instantly across components
- **Clean abstractions** - persistence layer easily swappable for IndexedDB

### Optional Feature Implemented
**Word count** - Real-time word count display in document header for tracking document length.

---

## Sprint Summary

This sprint demonstrates a complete learning progression:

1. **Part 2** - Foundation: Research and profile documentation
2. **Part 3** - Static sites: Portfolio with vanilla HTML/CSS/JS
3. **Part 4** - Interactive applications: Todo app with persistence
4. **Part 6 & 7** - Modern frameworks: Learning Next.js App Router and React fundamentals
5. **SprintProject** - Capstone: Full-featured DocMan document management application

**Key Achievements:**
- Progressed from vanilla HTML/CSS/JS to modern framework patterns
- Mastered Next.js App Router and TypeScript
- Built responsive, mobile-first applications
- Implemented localStorage persistence with clean abstractions
- Created markdown editor with real-time preview
- Delivered a production-ready document management application

Each project builds upon previous learning, showcasing progressive mastery of web development patterns and best practices with AI-assisted development through Claude Code.
