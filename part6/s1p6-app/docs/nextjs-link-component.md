# Next.js Link Component Reference
Source: https://nextjs.org/docs/app/api-reference/components/link

---

<Link> is a React component that extends the HTML <a> element to provide prefetching and client-side navigation between routes. It is the primary way to navigate between routes in Next.js.

Basic usage:
app/page.tsx
TypeScript

import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}

Reference

The following props can be passed to the <Link> component:
Prop	Example	Type	Required
href	href="/dashboard"	String or Object	Yes
replace	replace={false}	Boolean	-
scroll	scroll={false}	Boolean	-
prefetch	prefetch={false}	Boolean or null	-
onNavigate	onNavigate={(e) => {}}	Function	-
transitionTypes	transitionTypes={['slide-in']}	string[]	-

    Good to know: <a> tag attributes such as className or target="_blank" can be added to <Link> as props and will be passed to the underlying <a> element.

href (required)

The path or URL to navigate to.
app/page.tsx
TypeScript

import Link from 'next/link'
 
// Navigate to /about?name=test
export default function Page() {
  return (
    <Link
      href={{
        pathname: '/about',
        query: { name: 'test' },
      }}
    >
      About
    </Link>
  )
}