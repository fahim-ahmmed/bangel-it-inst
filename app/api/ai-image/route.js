import { NextResponse } from 'next/server';

const DIMS = { '1:1': [1024, 1024], '16:9': [1280, 720], '9:16': [720, 1280], '4:3': [1024, 768] };
const STYLE_HINTS = {
  'Modern Lab': 'modern high-tech computer training laboratory, dual screen workstations, clean professional campus, architectural lighting',
  'Computer Technology': 'cutting-edge computer technology, glowing circuitry, digital programming interface, modern hardware',
  'AI & Coding': 'artificial intelligence and coding environment, futuristic data visualization, neon cyan and emerald accents',
  'Photorealistic Studio': 'ultra-detailed photorealistic studio photography, cinematic lighting, sharp focus',
  'Cyber Neon': 'glowing neon cyan and emerald lights, futuristic cyber aesthetics, volumetric lighting',
  '3D Digital Art': '3D isometric digital art, Blender render, smooth textures, studio lighting',
};

export async function POST(req) {
  const { prompt, style = 'Modern Lab', aspect = '16:9', action = 'generate', image } = await req.json().catch(() => ({}));
  if (!prompt || String(prompt).length < 3) return NextResponse.json({ error: 'Prompt required' }, { status: 400 });
  const full = `${String(prompt).slice(0, 400)}, ${STYLE_HINTS[style] || style}`;
  const key = process.env.GEMINI_API_KEY;

  // 1) Gemini (needed for editing an uploaded image). Optional: set GEMINI_API_KEY.
  if (key) {
    try {
      const { GoogleGenAI } = await import('@google/genai');
      const ai = new GoogleGenAI({ apiKey: key });
      const parts = [];
      if (action === 'edit' && image) parts.push({ inlineData: { data: String(image).replace(/^data:image\/\w+;base64,/, ''), mimeType: 'image/jpeg' } });
      parts.push({ text: action === 'edit' ? `Edit instruction: ${full}` : full });
      const res = await ai.models.generateContent({ model: process.env.GEMINI_IMAGE_MODEL || 'gemini-2.5-flash-image', contents: [{ role: 'user', parts }] });
      const out = res.candidates?.[0]?.content?.parts?.find((x) => x.inlineData?.data);
      if (out) return NextResponse.json({ url: `data:${out.inlineData.mimeType || 'image/png'};base64,${out.inlineData.data}`, engine: 'gemini' });
    } catch (e) { console.warn('Gemini image failed:', e.message); }
  }
  if (action === 'edit') return NextResponse.json({ error: 'ছবি এডিট করতে GEMINI_API_KEY সেট করুন / Image editing needs GEMINI_API_KEY' }, { status: 501 });

  // 2) Free fallback for text-to-image
  const [w, h] = DIMS[aspect] || DIMS['16:9'];
  return NextResponse.json({ url: `https://image.pollinations.ai/prompt/${encodeURIComponent(full)}?width=${w}&height=${h}&seed=${Math.floor(Math.random() * 1e7)}&nologo=true`, engine: 'pollinations' });
}
