# part4 - Vanilla Todo Web App

## Overview

A minimal, dependency-free todo application. Pure HTML, CSS, and JavaScript with persistent state using browser `localStorage`. No frameworks, no build tools, no npm packages.

## Project Structure

```
part4/
├── CLAUDE.md         # This file - project documentation
├── index.html        # Todo app UI
├── style.css         # All styling
└── app.js            # Todo logic and localStorage management
```

## Architecture

### Static Files Only

- **index.html:** Minimal HTML scaffold with input form and todo list container
- **style.css:** Complete styling including responsive design
- **app.js:** Todo management logic with localStorage persistence

### How It Works

1. User opens `index.html` in browser
2. `app.js` loads todos from `localStorage` on page load
3. User can:
   - Add new todos via input field
   - Toggle todo completion status (checkbox)
   - Delete todos
   - Clear completed todos
4. Every action syncs to `localStorage` automatically
5. Browser close/refresh preserves todo list

## Features

### Core Functionality

- **Add Todo:** Input field + button or Enter key
- **Toggle Complete:** Click checkbox to mark done/undone
- **Delete Todo:** Remove individual todos
- **Clear Completed:** Remove all finished todos
- **Persistent Storage:** localStorage saves all state
- **Todo Count:** Display active/total todos

### Data Structure

```javascript
// localStorage key: 'todos'
// Array of todo objects:
[
  { id: timestamp, text: "Buy groceries", completed: false },
  { id: timestamp, text: "Finish project", completed: true }
]
```

## localStorage API

- **Get todos:** `JSON.parse(localStorage.getItem('todos') || '[]')`
- **Save todos:** `localStorage.setItem('todos', JSON.stringify(todos))`
- **Clear all:** `localStorage.removeItem('todos')`

## Design Philosophy

- **Simplicity first:** No abstraction beyond what's needed
- **Single responsibility:** Each function does one thing
- **Offline-first:** Works without internet connection
- **Semantic HTML:** Proper form, button, and list elements
- **Accessible:** Keyboard navigation, ARIA labels where needed
- **Responsive:** Works on mobile and desktop
- **Fast:** Minimal DOM manipulation, efficient selectors

## Development Workflow

1. **Edit structure:** Modify `index.html` for form/layout changes
2. **Edit styles:** Update `style.css` for visual changes
3. **Edit logic:** Modify `app.js` for behavior changes
4. **Test locally:** Open `index.html` in browser
5. **Deploy:** Copy three files to web server

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Any modern browser with ES6 and localStorage support

Works offline. No server required.

## What NOT to Add

- Framework (React, Vue, Svelte, etc.)
- Build tools (Webpack, Vite, etc.)
- Package manager (npm, pnpm, yarn)
- State management library
- CSS preprocessor (SASS, LESS)
- External libraries or CDN packages
- Backend/server

If you need these, create a new project. This one is intentionally minimal.

## localStorage Limitations

- ~5-10MB per domain (browser dependent)
- String-only storage (JSON stringified)
- Same-origin policy applies
- No server-side sync
- User can clear browser data

For larger apps, consider IndexedDB instead.

## Common Enhancements (No Frameworks)

Keep these in mind if extending:

- Add `filter` buttons (All, Active, Completed) with localStorage of current filter
- Add `localStorage` export/import via JSON file download
- Add categories/tags with simple select dropdown
- Add due dates with native `<input type="date">`
- Add local themes (light/dark) stored in localStorage
- Add drag-to-reorder with `dragstart`/`drop` events

## File Size Budget

Target < 30KB total uncompressed:

- `index.html`: ~1-2KB
- `style.css`: ~5-8KB
- `app.js`: ~3-5KB
- Total: ~10-15KB

No images, no external resources. Everything is text.

## Deployment

### As Static Files

1. Upload three files to web server
2. No special config needed
3. Works on GitHub Pages, Netlify, S3, etc.

### Local Testing

1. Open `index.html` in browser (file:// protocol works)
2. Or serve locally with `python -m http.server` or similar
3. localStorage works in both cases

## Testing Checklist

- [ ] Add todo with text input
- [ ] Add todo with Enter key
- [ ] Toggle todo completion
- [ ] Delete single todo
- [ ] Clear all completed todos
- [ ] Refresh page - todos persist
- [ ] Close and reopen browser - todos still there
- [ ] Works on mobile (responsive)
- [ ] Empty state message shows when no todos

---

**Start developing:** Open `index.html` in your browser. Add todos. Refresh. They'll still be there!
