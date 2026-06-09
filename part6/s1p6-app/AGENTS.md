# Agent Guidelines

## Before Writing Code
- Check CLAUDE.md for project conventions and constraints
- Verify the Next.js version in package.json before using any API
- Read the relevant Next.js documentation in `node_modules/next/dist/docs/` if you're uncertain about a feature

## When Building Features
- Keep components in `app/components/` for reusability
- Store document data in localStorage via React state or a custom hook
- Use TypeScript types for all props and state
- Test styling with Tailwind's responsive classes (sm:, md:, lg:)

## What NOT to Do
- Do not use external libraries without checking with the user first
- Do not create API routes yet (no backend)
- Do not add authentication or user accounts
- Do not modify core app files without asking (layout.tsx, globals.css)

## Next.js 16 Notes
This is a newer version of Next.js. Check `node_modules/next/dist/docs/` for the current API before assuming patterns from older versions.
