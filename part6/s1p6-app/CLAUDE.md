# My Next.js App

## What this is
A personal document management app. Users can create, edit, and delete documents.
All data is stored in localStorage — no backend or user accounts yet.

## Stack
- Next.js 16 with the App Router
- React 19
- TypeScript
- Tailwind CSS for all styling

## Running the app
Run `npm run dev`. The app runs at http://localhost:3000.

## Conventions
- New pages go inside the `app/` folder
- Shared UI components go in `app/components/`
- Use TypeScript for all new code

## Do not
- Add npm packages without asking first
- Put secrets or API keys in source files — use .env.local for environment variables
- Modify the app/layout.tsx or app/globals.css without discussing first
