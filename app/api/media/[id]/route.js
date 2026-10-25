import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/mongodb';

export async function GET(_req, { params }) {
  const { id } = await params;
  if (!ObjectId.isValid(id)) return new Response('Not found', { status: 404 });
  const db = await getDb();
  const doc = await db.collection('media').findOne({ _id: new ObjectId(id) });
  if (!doc) return new Response('Not found', { status: 404 });
  return new Response(doc.data.buffer, { headers: { 'Content-Type': doc.type, 'Cache-Control': 'public, max-age=31536000, immutable', 'X-Content-Type-Options': 'nosniff' } });
}
