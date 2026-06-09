# Building with AI - Sprint 1 Output

A comprehensive sprint showcasing foundational web development projects built with AI assistance through Claude Code.

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

## Part 6 - Next.js Document Management App

**Overview:** A modern web application for document management, built with Next.js and React.

- **Technology Stack:**
  - Next.js 16 with App Router
  - React 19
  - TypeScript
  - Tailwind CSS
  - Browser localStorage for data persistence

- **Features:**
  - Create, edit, and delete documents
  - Navigation bar with Home and About links
  - Responsive page layout
  - Client-side routing with Next.js Link component
  - Type-safe development with TypeScript

**Project Structure:**
- `/app/layout.tsx` - Root layout with navigation bar
- `/app/page.tsx` - Home page
- `/app/about/page.tsx` - About page
- `/docs/` - Documentation folder
- `/app/components/` - (reserved for UI components)

**Running the app:** `npm run dev` → runs at http://localhost:3000

**Pages:**
- `/` - Home page with app title and description
- `/about` - About page describing the app
- Navigation bar appears on every page for easy navigation

---

## Summary

This sprint demonstrates progression from basic research and static HTML to modern JavaScript frameworks:

1. **Part 2** - Foundation: Research and learning
2. **Part 3** - Static sites: Portfolio with vanilla HTML/CSS/JS
3. **Part 4** - Interactive applications: Todo app with persistence
4. **Part 6** - Modern frameworks: Next.js with routing and components

Each project builds upon learning from previous parts, showcasing practical web development patterns and best practices with AI-assisted development.
