"use client";
import "@excalidraw/excalidraw/index.css";
import dynamic from "next/dynamic";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then(mod => mod.Excalidraw),
  { ssr: false }
);

export default function WhiteboardPage({ params }: { params: { domain: string; id: string } }) {
  return (
    <div className="w-full h-screen">
      <Excalidraw />
    </div>
  );
}
