import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { getGoogleToken, gfetch } from '@/lib/google';

const MAX = 25 * 1024 * 1024;

export async function POST(req) {
  if (!(await getServerSession())) return NextResponse.json({ error: 'Login required' }, { status: 401 });
  const token = await getGoogleToken();
  if (!token) return NextResponse.json({ error: 'google_not_connected' }, { status: 403 });

  const form = await req.formData().catch(() => null);
  const file = form?.get('file');
  if (!file || typeof file === 'string') return NextResponse.json({ error: 'File required' }, { status: 400 });
  if (file.size > MAX) return NextResponse.json({ error: 'File too large (max 25 MB)' }, { status: 413 });

  const boundary = 'bcti' + Date.now();
  const meta = JSON.stringify({ name: file.name, mimeType: file.type || 'application/octet-stream' });
  const body = new Blob([
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n`,
    `--${boundary}\r\nContent-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`,
    file,
    `\r\n--${boundary}--`,
  ]);
  try {
    const r = await gfetch(token, 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
      method: 'POST', headers: { 'Content-Type': `multipart/related; boundary=${boundary}` }, body,
    });
    return NextResponse.json({ file: r });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}
