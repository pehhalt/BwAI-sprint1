# CLAUDE.md

@AGENTS.md

## Project brief

Build a local-only personal document management app using:

* Next.js with the App Router
* TypeScript
* Tailwind CSS

The app is reviewed locally at `localhost:3000` after running:

```bash
npm run dev
```

There is no deployment step, no hosted backend, no hosted environment variables, and no public URL. Keep all implementation decisions aligned with a single-user, no-backend, browser-based app.

## Non-negotiable framework rules

* Use the Next.js App Router only.
* Do not use the older Pages Router.
* Put routes under the `app/` directory.
* Describe pages and routes in behaviour-first language when planning implementation.
* Use TypeScript throughout.
* Use Tailwind CSS for styling.
* Keep the app runnable locally with `npm run dev`.
* Do not add a backend, database server, authentication, deployment configuration, or hosted-service dependency unless explicitly requested.

## Required app behaviour

### Home page

Create a home page at `/` with:

* A short description of the app.
* A clear link or button to the document workspace.

### Workspace

Create a workspace at `/docs` with:

* A two-pane document workspace.
* A sidebar on the left.
* A document content area on the right.
* A readable empty state when no document is selected or no documents exist.

At desktop width, the layout should be side-by-side. At phone width, it must be usable as stacked or collapsible content.

### Document routes

Each document must have its own unique address, for example:

```text
/docs/abc123
```

Opening that address directly after a reload must show the correct document if it exists.

If the document ID does not exist, show:

* A clear “Document not found” message.
* A link back to the workspace.

### Sidebar

The sidebar must include:

* A list of all documents.
* Documents sorted by most recently updated first.
* A search box that filters documents by title as the user types.
* A New document button.
* A delete control for each document.
* Confirmation before deleting a document.
* Empty state text when there are no documents.
* Empty state text when search returns no results.

Creating a new document must:

* Create a blank document.
* Assign it a unique ID.
* Open it immediately at its document route.

### Editor

Each document editor must include:

* A title field.
* A body editor.
* Autosave for title and body changes.
* No manual save button as the primary saving mechanism.
* Persistence across a full page reload.

Pressing Enter in the title field must move focus directly into the body field. A user should be able to create and write a document without touching the mouse.

### Markdown support

The body editor must support basic Markdown formatting:

* Headings
* Bold
* Italic
* Bullet lists

Provide either:

* An edit/preview toggle, or
* Separate edit and preview modes.

The preview should render Markdown visibly, not just display the raw text.

## Persistence consultation requirement

Before implementing document storage, run a separate consultation and reason about persistence for this exact context:

* Single user
* Browser-based document app
* No backend
* No user accounts
* Localhost-only project
* Data must persist across reloads

The consultation must identify:

* Recommended persistence mechanism.
* Alternatives considered.
* Why the chosen option fits this project.
* Tradeoffs and limitations.

Likely acceptable options include `localStorage` or `IndexedDB`. Choose deliberately and document the decision in `REFLECTION.md` before or during implementation.

For this project, prefer the simplest mechanism that reliably satisfies the review criteria unless there is a strong reason to add complexity.

## Suggested implementation sequence

Build in small, reviewable increments. Do not implement the entire app in one giant change.

Recommended order:

1. Scaffold the Next.js App Router project with TypeScript and Tailwind CSS.
2. Add the home page at `/`.
3. Add the `/docs` workspace shell with sidebar and content area.
4. Add document data model and persistence after the persistence consultation.
5. Add document creation and direct navigation to newly created documents.
6. Add document routes such as `/docs/[id]`.
7. Add autosaving title and body editor.
8. Add sidebar sorting by most recently updated.
9. Add title search and empty states.
10. Add delete with confirmation.
11. Add Markdown edit/preview support.
12. Add keyboard behaviour: Enter in title moves focus to body.
13. Add responsive layout.
14. Add at least one optional feature through a dedicated feature branch and pull request.
15. Do a focused design pass.
16. Update README.md and REFLECTION.md.

Commit at each stable state.

If the app becomes broken or confused, stop and recommend returning to the last good commit rather than layering fixes blindly.

## Optional feature requirement

Complete at least one optional task through a dedicated feature branch and pull request.

Recommended optional feature for this project: document word count.

Reason: it is useful, visible, low-risk, easy to verify locally, and does not complicate the persistence model.

Other acceptable optional features:

* Starred documents
* Dark-mode toggle
* Tags
* Export/import
* Document history
* Soft delete and trash
* Keyboard command palette
* Folder structure

Do not start optional features until all required behaviour works locally.

## Documentation requirements

Create a `docs/` folder before or early in the project.

Add at least one cited Next.js reference document. The source URL must appear at the top of the file.

Recommended document:

```text
Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages
```

The reference should summarize or paste the relevant App Router layouts/pages guidance needed for this project.

Use the search → paste → cite pattern when a framework detail matters. Do not rely only on memory for framework behaviour.

## README.md requirements

The README must cover:

* What the app does.
* How to run it locally.
* The local URL to open.
* A screenshot of the workspace.
* Which optional task was chosen.

## REFLECTION.md requirements

Write 350–550 words addressing:

1. Persistence consultation: what was asked, what was recommended, what alternatives came up, and why the final option was chosen.
2. One search → paste → cite moment that changed the outcome.
3. One moment where CLAUDE.md corrected agent drift.
4. The design pass: visual direction, typography, spacing, colours, component choices, and what changed from the scaffolded default.
5. One thing harder than expected compared with a plain HTML app.
6. What was useful or noisy in the `docs/` folder.

## Design pass requirement

After the required behaviour works, spend a focused design pass improving the UI.

Do not use vague prompts such as “make it nicer”. Use specific direction, for example:

* Tone: clean, calm, minimal writing workspace.
* Typography: readable document-first type scale, clear title hierarchy.
* Spacing: generous editor whitespace, compact sidebar list density.
* Colour: neutral background, subtle borders, one restrained accent colour.
* Components: rounded cards, visible active document state, clear destructive delete affordance.
* Layout: fixed-width readable editor column on large screens, efficient stacked layout on mobile.

Capture the design direction and final choices in `REFLECTION.md`.

## Quality bar

Before considering the task complete, verify locally that:

* `/` works.
* `/docs` works.
* Creating a document opens it immediately.
* Editing title and body autosaves.
* Reloading keeps documents.
* Direct navigation to `/docs/<id>` works.
* A fake document URL shows “Document not found”.
* Sidebar search filters by title.
* Documents sort by most recently updated.
* Delete asks for confirmation.
* Empty states are readable.
* Markdown edit/preview works.
* Enter in the title moves focus to the body.
* Desktop and mobile layouts are usable.
* Optional feature works and is included via a dedicated feature branch and pull request.
* `.gitignore` covers `node_modules/`, `.env`, and OS/editor clutter.
* At least two PRs are merged in total.
* At least one PR includes a fresh-session diff review note.
