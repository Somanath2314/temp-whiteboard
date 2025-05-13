'use client';

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';


export default function DomainPage() {
  const [title, setTitle] = useState('');
  const router = useRouter();
  const params = useParams();
  const domain = params.domain;

const handleCreateWhiteboard = (e: React.FormEvent) => {
  e.preventDefault(); // ⛔ Prevents page reload
  if (!title) return; // optional: guard empty titles
  router.push(`/${domain}/whiteboard/${title}`);
};


  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md text-center">
        {/* <h1>Please enter whiteboard name</h1> */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">{domain}</span>
          <br />
          Please enter whiteboard name
        </h2>
        <form onSubmit={handleCreateWhiteboard} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g., dontmail.in/somanat"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
          >
            Go
          </button>
        </form>
      </div>
    </main>
  );
}
