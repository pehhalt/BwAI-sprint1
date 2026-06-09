# Next.js App Router: Layouts and Pages Reference

Source: https://nextjs.org/docs/app/getting-started/layouts-and-pages

## File-System Based Routing

Next.js uses **file-system based routing**. Folders define route segments, and special files (`page.tsx`, `layout.tsx`) create UI for those segments.

## Creating Pages

A **page** is UI rendered on a specific route. Create by adding a `page.tsx` file in the `app` directory:

```tsx
// app/page.tsx - Creates the "/" route
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

## Creating Layouts

A **layout** is UI shared between multiple pages. Layouts preserve state and don't rerender on navigation.

```tsx
// app/layout.tsx - Root layout (required)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

**Root layout requirements:**
- Must be at the root of the `app` directory
- Must contain `<html>` and `<body>` tags
- Required for every Next.js app

## Nested Routes

Create nested routes by nesting folders. Each folder creates a route segment:

```
app/
  layout.tsx       # Root layout
  page.tsx         # "/" route
  docs/
    layout.tsx     # "/docs" layout (optional, wraps docs pages)
    page.tsx       # "/docs" route
    [id]/
      page.tsx     # "/docs/[id]" dynamic route
```

## Dynamic Routes

Wrap folder names in square brackets to create dynamic segments:

```tsx
// app/docs/[id]/page.tsx
export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return <h1>Document: {params.id}</h1>
}
```

Dynamic segments allow routes like `/docs/abc123`, `/docs/xyz789`, etc.

## Navigation with Link

Use the `<Link>` component from `next/link` to navigate between routes. It's the primary way to navigate in Next.js:

```tsx
import Link from 'next/link'

export default function Page() {
  return <Link href="/docs">Go to Docs</Link>
}
```

**Link component benefits:**
- Client-side navigation (faster than full page reload)
- Prefetching in production (loads linked routes in background)
- Passing `className`, `id`, and other HTML attributes works normally