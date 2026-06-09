import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
      <main className="flex flex-col items-center justify-center gap-8 py-20 px-6 text-center max-w-2xl">
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-slate-900">DocMan</h1>
          <p className="text-xl text-slate-600">
            A simple, local-only document management app. Write, organize, and save your documents—all in your browser.
          </p>
        </div>

        <div className="pt-6">
          <Link
            href="/docs"
            className="inline-block px-8 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
          >
            Open Workspace
          </Link>
        </div>
      </main>
    </div>
  );
}
