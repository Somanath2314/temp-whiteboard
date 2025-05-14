// src/types/excalidraw.d.ts
import { ComponentType } from 'react';

declare module '@excalidraw/excalidraw' {
  // Treat the Excalidraw export as a totally untyped React component:
  export const Excalidraw: ComponentType<any>;
  export default Excalidraw;
}
