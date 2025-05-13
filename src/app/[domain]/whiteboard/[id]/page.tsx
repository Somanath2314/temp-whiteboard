'use client';

import { useParams } from 'next/navigation';

export default function WhiteboardPage() {
  const { domain, id } = useParams();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="p-8 max-w-2xl w-full text-center bg-blue-50 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">🧾 Whiteboard</h1>
        <p className="text-lg text-gray-700 mb-2">
          Domain: <span className="font-mono text-purple-600">{domain}</span>
        </p>
        <p className="text-lg text-gray-700">
          Whiteboard ID: <span className="font-mono text-blue-600">{id}</span>
        </p>
        <p className="mt-6 text-gray-500">📝 Whiteboard content will be displayed here.</p>
      </div>
    </main>
  );
}
