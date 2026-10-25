import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/session';
import { getGoogleToken, gfetch } from '@/lib/google';

const MIME = { sheets: 'application/vnd.google-apps.spreadsheet', docs: 'application/vnd.google-apps.document', folders: 'application/vnd.google-apps.folder' };

async function guard() {
  const session = await getServerSession();
  if (!session) return { error: NextResponse.json({ error: 'Login required' }, { status: 401 }) };
  const token = await getGoogleToken();
  if (!token) return { error: NextResponse.json({ error: 'google_not_connected' }, { status: 403 }) };
  return { token };
}

export async function GET(req) {
  const { token, error } = await guard();
  if (error) return error;
  const kind = new URL(req.url).searchParams.get('kind') || 'files';
  const q = ['trashed = false', MIME[kind] && `mimeType = '${MIME[kind]}'`].filter(Boolean).join(' and ');
  const fields = 'files(id,name,mimeType,size,modifiedTime,webViewLink)';
  try {
    const data = await gfetch(token, `https://www.googleapis.com/drive/v3/files?pageSize=30&orderBy=modifiedTime desc&q=${encodeURIComponent(q)}&fields=${encodeURIComponent(fields)}`);
    return NextResponse.json({ files: data.files || [] });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}

export async function POST(req) {
  const { token, error } = await guard();
  if (error) return error;
  const { kind, title } = await req.json().catch(() => ({}));
  const name = String(title || '').trim().slice(0, 120);
  if (!name) return NextResponse.json({ error: 'Title required' }, { status: 400 });
  const json = (body) => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  try {
    let link;
    if (kind === 'sheets') {
      const r = await gfetch(token, 'https://sheets.googleapis.com/v4/spreadsheets', json({ properties: { title: name } }));
      link = r.spreadsheetUrl;
    } else if (kind === 'docs') {
      const r = await gfetch(token, 'https://docs.googleapis.com/v1/documents', json({ title: name }));
      link = `https://docs.google.com/document/d/${r.documentId}/edit`;
    } else if (kind === 'folders') {
      const r = await gfetch(token, 'https://www.googleapis.com/drive/v3/files?fields=id,webViewLink', json({ name, mimeType: MIME.folders }));
      link = r.webViewLink;
    } else return NextResponse.json({ error: 'Invalid kind' }, { status: 400 });
    return NextResponse.json({ link });
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 502 });
  }
}
