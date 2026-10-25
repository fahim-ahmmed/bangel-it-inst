// Field definitions for every admin-editable content type (shared by admin UI and API sanitiser).
// type: text | textarea | number | bool | lines (one per line) | csv (comma separated) | select | image
const T = (key, label, extra = {}) => ({ key, label, type: 'text', ...extra });

export const CONTENT_SCHEMAS = {
  courses: {
    title: ['কোর্স', 'Courses'], labelKey: 'titleBn',
    fields: [
      T('id', 'Course ID (slug, e.g. web-design)', { required: true, slug: true }),
      { key: 'visibility', label: 'অবস্থা (published = চালু, draft = অপ্রকাশিত, cancelled = বাতিল)', type: 'select', options: ['published', 'draft', 'cancelled'], default: 'published' },
      T('titleBn', 'শিরোনাম (বাংলা)', { required: true }), T('titleEn', 'Title (English)', { required: true }),
      { key: 'category', label: 'ক্যাটাগরি', type: 'select', options: ['office', 'ai', 'coding', 'freelancing', 'language', 'kids'], default: 'office' },
      T('durationBn', 'মেয়াদ (বাংলা)'), T('durationEn', 'Duration (English)'), T('level', 'লেভেল'),
      { key: 'fee', label: 'মূল ফি (৳)', type: 'number', required: true }, { key: 'discountFee', label: 'ছাড়ের ফি (৳)', type: 'number' },
      { key: 'bteb', label: 'BTEB অনুমোদিত', type: 'bool' }, T('tagBn', 'ট্যাগ'),
      { key: 'descBn', label: 'বিবরণ (বাংলা)', type: 'textarea' }, { key: 'descEn', label: 'Description (English)', type: 'textarea' },
      { key: 'modules', label: 'সিলেবাস/মডিউল (প্রতি লাইনে একটি)', type: 'lines' },
      { key: 'software', label: 'সফটওয়্যার (প্রতি লাইনে একটি)', type: 'lines' },
      { key: 'careers', label: 'ক্যারিয়ার (প্রতি লাইনে একটি)', type: 'lines' },
      { key: 'batch.status', label: 'ব্যাচ স্ট্যাটাস', type: 'select', options: ['enrolling', 'full', 'coming_soon'], default: 'enrolling' },
      T('batch.codeBn', 'ব্যাচ নাম (বাংলা)'), T('batch.codeEn', 'Batch name (English)'),
      { key: 'batch.enrolled', label: 'ভর্তি হয়েছে (জন)', type: 'number' }, { key: 'batch.seats', label: 'মোট আসন', type: 'number' },
      T('batch.startBn', 'শুরুর তারিখ (বাংলা)'), T('batch.startEn', 'Start date (English)'),
      { key: 'order', label: 'ক্রম (ছোট সংখ্যা আগে)', type: 'number' },
    ],
  },
  teachers: {
    title: ['শিক্ষক', 'Teachers'], labelKey: 'nameBn',
    fields: [
      T('id', 'Teacher ID (slug, e.g. t-26)', { required: true, slug: true }),
      T('nameBn', 'নাম (বাংলা)', { required: true }), T('nameEn', 'Name (English)', { required: true }),
      T('roleBn', 'পদবি (বাংলা)'), T('roleEn', 'Designation (English)'),
      { key: 'category', label: 'বিভাগ', type: 'select', options: ['office', 'coding', 'design', 'freelancing', 'cyber', 'ict', 'spoken'], default: 'office' },
      T('expBn', 'অভিজ্ঞতা (বাংলা)'), T('expEn', 'Experience (English)'), { key: 'students', label: 'প্রশিক্ষিত শিক্ষার্থী', type: 'number' },
      { key: 'skills', label: 'দক্ষতা (কমা দিয়ে)', type: 'csv' }, { key: 'photo', label: 'শিক্ষকের ছবি (আপলোড করুন বা URL দিন)', type: 'image' },
      T('badgeBn', 'ব্যাজ (বাংলা)'), T('badgeEn', 'Badge (English)'),
      T('eduBn', 'শিক্ষাগত যোগ্যতা (বাংলা)'), T('eduEn', 'Education (English)'),
      { key: 'bioBn', label: 'বায়ো (বাংলা)', type: 'textarea' }, { key: 'bioEn', label: 'Bio (English)', type: 'textarea' },
      T('availBn', 'সময়সূচি (বাংলা)'), T('availEn', 'Availability (English)'),
      { key: 'order', label: 'ক্রম', type: 'number' },
    ],
  },
  roadmap: {
    title: ['১০ দিনের রোডম্যাপ', 'Roadmap'], labelKey: 'tBn',
    fields: [
      T('id', 'ID (e.g. day-11)', { required: true, slug: true }), T('day', 'দিন (e.g. Day 01)'),
      { key: 'icon', label: 'আইকন', type: 'select', options: ['Monitor', 'Keyboard', 'FileText', 'Table', 'Presentation', 'Cloud', 'Cpu', 'Image', 'ShieldCheck', 'Award'], default: 'Monitor' },
      T('tBn', 'শিরোনাম (বাংলা)', { required: true }), T('tEn', 'Title (English)'),
      { key: 'dBn', label: 'বিবরণ (বাংলা)', type: 'textarea' }, { key: 'dEn', label: 'Description (English)', type: 'textarea' },
      T('hBn', 'হাইলাইট (বাংলা)'), T('hEn', 'Highlight (English)'), { key: 'order', label: 'ক্রম', type: 'number' },
    ],
  },
  testimonials: {
    title: ['রিভিউ', 'Reviews'], labelKey: 'name',
    fields: [
      T('id', 'ID', { required: true, slug: true }), T('name', 'নাম', { required: true }), T('role', 'পরিচয়'), T('course', 'কোর্স'),
      { key: 'bn', label: 'রিভিউ (বাংলা)', type: 'textarea' }, { key: 'en', label: 'Review (English)', type: 'textarea' },
      T('result', 'অর্জন / ফলাফল'), { key: 'rating', label: 'রেটিং (১-৫)', type: 'number', default: 5 }, { key: 'order', label: 'ক্রম', type: 'number' },
    ],
  },
  notices: {
    title: ['নোটিশ', 'Notices'], labelKey: 'bn',
    fields: [T('id', 'ID', { required: true, slug: true }), { key: 'bn', label: 'নোটিশ (বাংলা)', type: 'textarea', required: true }, { key: 'en', label: 'Notice (English)', type: 'textarea' }, { key: 'order', label: 'ক্রম', type: 'number' }],
  },
  facilities: {
    title: ['সুবিধা', 'Facilities'], labelKey: 'bn',
    fields: [T('id', 'ID', { required: true, slug: true }), T('bn', 'শিরোনাম (বাংলা)', { required: true }), T('en', 'Title (English)'), { key: 'dbn', label: 'বিবরণ (বাংলা)', type: 'textarea' }, { key: 'den', label: 'Description (English)', type: 'textarea' }, { key: 'order', label: 'ক্রম', type: 'number' }],
  },
};

export const SETTINGS_FIELDS = [
  T('phone1', 'ফোন ১'), T('phone2', 'ফোন ২'), T('phone3', 'ফোন ৩'), T('email', 'ইমেইল'),
  { key: 'addressBn', label: 'ঠিকানা (বাংলা)', type: 'textarea' }, { key: 'addressEn', label: 'Address (English)', type: 'textarea' },
  T('hoursBn', 'খোলার সময় (বাংলা)'), T('hoursEn', 'Opening hours (English)'), T('mapsUrl', 'Google Maps লিংক'),
  { key: 'offerActive', label: 'বিশেষ অফার চালু', type: 'bool' }, T('couponCode', 'কুপন কোড'), { key: 'couponPercent', label: 'কুপন ছাড় (%)', type: 'number' },
  T('offerPeriodBn', 'অফারের সময়কাল (বাংলা)'), T('offerPeriodEn', 'Offer period (English)'),
  T('statPlacement', 'গড় প্লেসমেন্ট রেট (যেমন 92.9%)'), T('statStudents', 'সফল শিক্ষার্থী (যেমন 4420+)'), T('statDuration', 'গড় কোর্স মেয়াদ (যেমন ৩.৭ মাস)'),
];

export const getPath = (obj, path) => path.split('.').reduce((o, k) => (o == null ? undefined : o[k]), obj);
export function setPath(obj, path, value) {
  const keys = path.split('.');
  let o = obj;
  keys.slice(0, -1).forEach((k) => { o[k] = o[k] && typeof o[k] === 'object' ? o[k] : {}; o = o[k]; });
  o[keys[keys.length - 1]] = value;
}

// Server-side: keep only whitelisted fields and coerce types.
export function sanitize(fields, input) {
  const out = {};
  for (const f of fields) {
    let v = getPath(input, f.key);
    if (v === undefined) continue;
    if (f.type === 'number') { v = v === '' || v === null ? null : Number(v); if (v !== null && !Number.isFinite(v)) continue; }
    else if (f.type === 'bool') v = Boolean(v);
    else if (f.type === 'lines') v = (Array.isArray(v) ? v : String(v).split('\n')).map((s) => String(s).trim()).filter(Boolean);
    else if (f.type === 'csv') v = (Array.isArray(v) ? v : String(v).split(',')).map((s) => String(s).trim()).filter(Boolean);
    else if (f.type === 'select') { if (!f.options.includes(v)) continue; }
    else v = String(v).slice(0, f.type === 'textarea' ? 4000 : 500);
    if (f.slug) { v = String(v).toLowerCase().replace(/[^a-z0-9-_]/g, '-').replace(/^-+|-+$/g, ''); if (!v) continue; }
    setPath(out, f.key, v);
  }
  return out;
}
