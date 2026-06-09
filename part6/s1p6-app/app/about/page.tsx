import Link from 'next/link';

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">About This App</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        This is a personal document management app that allows users to create, edit, and delete documents with all data stored locally in the browser.
      </p>
      <Link href="/" className="text-blue-600 hover:text-blue-800 font-semibold">
        Back to Home
      </Link>
    </div>
  );
}
