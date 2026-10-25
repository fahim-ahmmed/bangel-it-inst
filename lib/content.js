import { getDb } from '@/lib/mongodb';
import { INSTITUTE, SPECIAL_OFFER, NOTICES, FACILITIES, TESTIMONIALS } from '@/data/institute';
import { COURSES } from '@/data/courses';
import { TEACHERS } from '@/data/teachers';
import { ROADMAP } from '@/data/roadmap';

const withIds = (arr, prefix) => arr.map((x, i) => ({ id: x.id || `${prefix}-${i + 1}`, order: i, ...x }));

export const SEEDS = {
  courses: () => COURSES.map((c, i) => ({ visibility: 'published', order: i, ...c })),
  teachers: () => TEACHERS.map((t, i) => ({ order: i, ...t })),
  roadmap: () => withIds(ROADMAP, 'day'),
  testimonials: () => withIds(TESTIMONIALS, 't'),
  notices: () => withIds(NOTICES, 'n'),
  facilities: () => withIds(FACILITIES, 'f'),
};

const clean = (rows) => rows.map(({ _id, ...r }) => ({ ...r, _id: String(_id) }));

async function isTouched(db, type) {
  const meta = await db.collection('site_meta').findOne({ _id: 'touched' });
  return Boolean(meta?.[type]);
}

// Public read: DB rows if any; otherwise the built-in defaults (until the admin imports/edits content).
export async function getList(type) {
  try {
    const db = await getDb();
    const rows = await db.collection(type).find({}).sort({ order: 1, createdAt: 1 }).toArray();
    if (rows.length || (await isTouched(db, type))) return clean(rows);
  } catch { /* DB unavailable -> defaults */ }
  return SEEDS[type]();
}

export async function getCourses() {
  return (await getList('courses')).filter((c) => (c.visibility || 'published') === 'published');
}
export async function getCourse(id) {
  return (await getCourses()).find((c) => c.id === id) || null;
}
export async function getTeachers() { return getList('teachers'); }
export async function getTeacher(id) { return (await getTeachers()).find((t) => t.id === id) || null; }

export async function getSettings() {
  const defaults = {
    ...INSTITUTE,
    offerActive: true, couponCode: SPECIAL_OFFER.couponCode, couponPercent: SPECIAL_OFFER.discount,
    offerPeriodBn: SPECIAL_OFFER.period, offerPeriodEn: 'April–June 2026 Session',
    statPlacement: '92.9%', statStudents: '4420+', statDuration: '৩.৭ মাস',
  };
  try {
    const db = await getDb();
    const doc = await db.collection('site_meta').findOne({ _id: 'settings' });
    if (doc) { const { _id, ...rest } = doc; return { ...defaults, ...rest }; }
  } catch { /* defaults */ }
  return defaults;
}
