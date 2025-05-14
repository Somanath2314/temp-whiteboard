'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function WhiteboardPage() {
  const { domain, id } = useParams() as { domain: string; id: string };
  const [initialData, setInitialData] = useState<any>(null);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  // Load and sanitize saved scene
  useEffect(() => {
    if (!domain || !id) return;
    fetch(`/api/${domain}/whiteboard/${id}`)
      .then((res) => res.json())
      .then((scene) => {
        const safeAppState = {
          ...scene.appState,
          collaborators: Array.isArray(scene.appState?.collaborators)
            ? scene.appState.collaborators
            : [],
        };
        setInitialData({
          elements: scene.elements ?? [],
          appState: safeAppState,
          files: scene.files ?? {},
        });
      })
      .catch(console.error);
  }, [domain, id]);

  // onChange → strip collaborators → debounce save
  const onChange = useCallback(
    (elements: readonly any[], appState: any, files: Record<string, any>) => {
      const { collaborators, ...appStateToSave } = appState;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        fetch(`/api/${domain}/whiteboard/${id}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            elements,
            appState: appStateToSave,
            files,
          }),
        });
      }, 1000);
    },
    [domain, id]
  );

  return (
    <div className="w-full h-screen">
      {initialData ? (
        <Excalidraw initialData={initialData} onChange={onChange} />
      ) : (
        <div>Loading whiteboard…</div>
      )}
    </div>
  );
}
