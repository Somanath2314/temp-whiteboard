// src/app/api/[domain]/whiteboard/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/app/lib/dbConnect';
import { Whiteboard } from '@/app/models/Whiteboard';

// GET: Load the board data for a given domain/id
 
export async function GET(req: NextRequest, { params }: { params: { domain: string; id: string } }) {
  const { domain, id } = await params;
  await dbConnect();
  const board = await Whiteboard.findOne({ domain, boardId: id }).lean();
  if (!board) {
    // If not found, return empty scene
    return NextResponse.json({ elements: [], appState: {}, files: {} });
  }
  return NextResponse.json(board.data);
}

// POST: Save or update the board data for a given domain/id
export async function POST(req: NextRequest, { params }: { params: { domain: string; id: string } }) {
  const { domain, id } = await params;
  try {
      const body = await req.json();
      // Expecting body like { elements, appState, files }
      await dbConnect();
      // Upsert the whiteboard data
      await Whiteboard.findOneAndUpdate(
        { domain, boardId: id },
        { domain, boardId: id, data: body, updatedAt: new Date() },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false });
  }
}
