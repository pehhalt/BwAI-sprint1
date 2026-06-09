# Reflection

## Persistence Consultation: localStorage Decision

**Recommendation:** localStorage with future IndexedDB migration path

We chose **localStorage** for this single-user, browser-only document app. The context demanded speed: tight sprint timeline, small expected dataset (dozens of documents), and localhost-only scope. localStorage provides a synchronous, zero-setup API that fit our constraints. IndexedDB was the alternative—more storage, async, built-in querying—but the complexity cost outweighed the benefits for initial launch. We abstracted the persistence layer behind `storage.ts` and `useDocuments.ts`, so swapping to IndexedDB later requires no UI changes. This proved smart: when initial event-listener syncing caused duplicate document creation, refactoring the hook to direct state updates was isolated to one file.

## Search → Paste → Cite Moment

The most impactful moment came when checking Next.js 16.2.7 layout documentation mid-project. We had a textarea that wouldn't expand to full viewport height despite `flex-1` and `min-h-0` classes. Reading the Next.js layout guide and learning that `html` needs `h-screen` (not just `h-full`) to fill the viewport—not `min-h-full` on body—fixed the issue instantly. This doc-checking discipline prevented hours of CSS debugging and confirmed that framework-specific patterns matter.

## CLAUDE.md Corrected Drift

The project brief specified "do not add error handling, fallbacks, or validation for scenarios that can't happen." Early on, I was considering adding try-catch blocks around localStorage access and null checks everywhere. Rereading CLAUDE.md's "Trust internal code and framework guarantees. Only validate at system boundaries" stopped that drift. We only validate at the entry point (localStorage reads might fail, so we catch), but internal state is trusted. This kept the codebase lean.

## Design Pass: From Default to Focused

The scaffolded Create Next App came with a colorful hero page. We shifted to a clean, document-focused direction:

- **Typography:** Reduced default Geist font noise. Title is bold, body is lean, sidebar is compact (text-xs on mobile).
- **Spacing:** Desktop gets generous padding (px-6 py-4); mobile is tight (px-3 py-3). Editor starts with 400px height, resizable.
- **Colour:** Neutral slate palette (50, 100, 200, 300, 500, 600, 900) instead of Vercel's brand colours. Accent red only for delete (danger affordance).
- **Components:** Sidebar sidebar is fixed on mobile (overlay), static on desktop. Preview toggle is minimal button, no modal. Delete has clear confirmation modal.
- **Layout:** Fixed max-width (A4 ≈ 794px) centered on desktop, full-width on mobile. Respects the paper-like mental model.

Changes from default: removed hero section, Vercel deploy button, and next/font optimization (still loads Geist but unadorned).

## Harder Than Expected: React Context + Autosave + Responsive State Sync

In plain HTML, you'd manually update the DOM and manage a single state object. Here, syncing state across three independent components (layout sidebar, editor, autosave indicator) required React Context. The first approach used custom events (`STORAGE_EVENT`) to notify listeners when documents changed. This caused duplicate creation—the hook would update state, fire an event, the event listener would refetch, and both updates would trigger. Switching to direct state updates in the context fixed it, but it revealed that managing cross-component state in React is more intricate than imperative DOM manipulation.

### Edit Field Height: A Deep Rabbit Hole

The textarea editor would only show 3 lines of text, refusing to expand to fill available space. Spent significant time debugging CSS flex layouts: tried `flex-1`, `min-h-0`, `h-full`, removed `resize-none`, tried inline styles. The real culprit: the root layout had `html { h-full }` instead of `html { h-screen }`. The `h-full` makes the element as tall as its parent, but if the parent isn't constrained to viewport height, nothing cascades properly. Once changed to `h-screen` and ensured `body { h-full }`, the flex chain worked. The lesson: in responsive layouts, the height constraint must flow from the root down; flex-grow (`flex-1`) alone isn't enough if the parent's height is undefined. Made the textarea resizable (`resize-vertical`) as a pragmatic workaround while debugging, which users appreciated anyway.

## Docs Folder: Useful Reference, Light Use

Created `docs/nextjs-app-router-layouts-and-pages.md` with Next.js 16.2.7 reference. Checked it twice—layout structure and Link component. Beyond that, no other docs were needed. The CLAUDE.md and code comments were sufficient. Docs folder is useful as a trail marker but light in practice for a small app.

## Summary

DocMan shipped with full responsive design, autosave, markdown support, word count, and a clean UI. The key lesson: abstract persistence early, check framework docs when stuck, and trust CLAUDE.md's guidance to avoid scope creep. localStorage was the right call for launch; IndexedDB migration is one file away if needed.
