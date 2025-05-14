// src/app/models/Whiteboard.ts
import mongoose, { Schema, Model } from 'mongoose';

// Define the schema: domain + boardId identify a scene, and `data` holds the Excalidraw JSON.
const WhiteboardSchema = new Schema({
  domain:   { type: String, required: true },
  boardId:  { type: String, required: true },
  data:     { type: Object, default: {} }, // entire scene JSON
  updatedAt: { type: Date, default: Date.now },
});
// Compound index to ensure one record per domain+boardId
WhiteboardSchema.index({ domain: 1, boardId: 1 }, { unique: true });

export interface IWhiteboard extends mongoose.Document {
  domain: string;
  boardId: string;
  data: Record<string, any>;
  updatedAt: Date;
}

export const Whiteboard: Model<IWhiteboard> =
  mongoose.models.Whiteboard || mongoose.model<IWhiteboard>('Whiteboard', WhiteboardSchema);
