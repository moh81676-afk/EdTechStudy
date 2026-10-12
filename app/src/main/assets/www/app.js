(function () {
'use strict';

/* ================== أدوات عامة ================== */
const KEY = 'edtech_study_v1';
const NATIVE = typeof Android !== 'undefined';
// سلم الدرجات (4.0). عدّله حسب نظام كليتك.
const GRADES = [['A+', 4], ['A', 4], ['A-', 3.7], ['B+', 3.3], ['B', 3], ['B-', 2.7], ['C+', 2.4], ['C', 2.2], ['C-', 2], ['D+', 1.5], ['D', 1], ['F', 0]];

const $ = (s, r) => (r || document).querySelector(s);
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const pad = n => String(n).padStart(2, '0');
const iso = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
const todayISO = () => iso(new Date());
function daysLeft(s) {
  const p = s.split('-').map(Number);
  const a = new Date(p[0], p[1] - 1, p[2]);
  const n = new Date();
  const b = new Date(n.getFullYear(), n.getMonth(), n.getDate());
  return Math.round((a - b) / 864e5);
}
function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); const x = a[i]; a[i] = a[j]; a[j] = x; }
  return a;
}
function native(fn) {
  if (!NATIVE) return;
  try { const args = Array.prototype.slice.call(arguments, 1); Android[fn].apply(Android, args); } catch (e) { }
}

/* ================== النصوص (عربي / English) ================== */
const L = {
  ar: {
    home: 'الرئيسية', library: 'المكتبة', study: 'المذاكرة', planner: 'المواعيد', timer: 'المؤقت',
    hello: 'أهلاً بيك 👋', subtitle: 'مذاكرتك كلها في مكان واحد وبدون نت',
    pomodoros: 'جلسات تركيز', focusMin: 'دقيقة مذاكرة', dueSoon: 'تسليمات قريبة',
    quick: 'ابدأ بسرعة', searchPh: 'ابحث في الملخصات والملفات والكروت...',
    courses: 'المواد', notes: 'ملخصات', files: 'ملفات PDF', addNote: '＋ إضافة ملخص', addFile: '＋ إضافة PDF', addCourse: '＋ إضافة مادة',
    title: 'العنوان', content: 'المحتوى', save: 'حفظ', cancel: 'إلغاء', del: 'حذف', edit: 'تعديل',
    confirmDel: 'متأكد إنك عايز تحذف؟', noItems: 'لسه مفيش حاجة هنا', openFile: 'فتح', required: 'املأ الحقول المطلوبة',
    flash: 'فلاش كاردز', quiz: 'اختبار', flipHint: 'اضغط على الكارت لقلبه', know: 'عرفتها ✓', again: 'لسه ✗',
    done: 'خلصت الجلسة 🎉', score: 'النتيجة', restart: 'إعادة', next: 'التالي', finish: 'إنهاء',
    question: 'السؤال', option: 'الاختيار', correctOpt: 'رقم الاختيار الصحيح', explanation: 'شرح الإجابة (اختياري)',
    front: 'السؤال / الوجه الأمامي', back: 'الإجابة / الوجه الخلفي', addCard: '＋ كارت جديد', addQ: '＋ سؤال اختبار',
    manage: 'إدارة الكروت والأسئلة', all: 'الكل', cardsCount: 'كروت', qCount: 'أسئلة', bestScore: 'أفضل نتيجة',
    deadlines: 'مواعيد التسليم', addDeadline: '＋ موعد جديد', date: 'التاريخ', course: 'المادة', none: '— بدون —',
    overdue: 'متأخر', todayWord: 'النهارده', daysLeft: 'يوم', gpa: 'حاسبة GPA', credits: 'الساعات', grade: 'التقدير', gname: 'المادة',
    addRow: '＋ مادة', semGpa: 'معدل الفصل', cumGpa: 'المعدل التراكمي', prevGpa: 'المعدل التراكمي السابق', prevCr: 'الساعات السابقة',
    work: 'مذاكرة', shortBreak: 'راحة قصيرة', longBreak: 'راحة طويلة', start: 'ابدأ', pause: 'إيقاف مؤقت', reset: 'إعادة',
    settings: 'الإعدادات', minutes: 'دقائق', language: 'اللغة', theme: 'المظهر', themeAuto: 'تلقائي', themeLight: 'فاتح', themeDark: 'داكن',
    sessionDone: 'انتهت الجلسة!', noNative: 'إضافة وفتح PDF متاحة داخل تطبيق الأندرويد فقط',
    name: 'الاسم', nothing: 'مفيش كروت أو أسئلة للمادة دي لسه', results: 'نتائج البحث', today: 'النهارده',
    cardsTotal: 'كروت', openNote: 'فتح', hint: 'ضع PDF هنا بدون نت للأبد 📚', cardsDone: 'عرفت', cardsAgain: 'لسه محتاج مراجعة',
    todayTasks: 'أقرب التسليمات', offline: 'يعمل بدون إنترنت',
    level: 'المستوى', editCourse: 'تعديل المادة', noLevel: 'غير محدد'
  },
  en: {
    home: 'Home', library: 'Library', study: 'Study', planner: 'Planner', timer: 'Timer',
    hello: 'Welcome 👋', subtitle: 'All your study material in one place, fully offline',
    pomodoros: 'Focus sessions', focusMin: 'Study minutes', dueSoon: 'Due soon',
    quick: 'Quick start', searchPh: 'Search notes, files and cards...',
    courses: 'Courses', notes: 'Notes', files: 'PDF files', addNote: '＋ Add note', addFile: '＋ Add PDF', addCourse: '＋ Add course',
    title: 'Title', content: 'Content', save: 'Save', cancel: 'Cancel', del: 'Delete', edit: 'Edit',
    confirmDel: 'Are you sure you want to delete this?', noItems: 'Nothing here yet', openFile: 'Open', required: 'Please fill the required fields',
    flash: 'Flashcards', quiz: 'Quiz', flipHint: 'Tap the card to flip it', know: 'Got it ✓', again: 'Again ✗',
    done: 'Session complete 🎉', score: 'Score', restart: 'Restart', next: 'Next', finish: 'Finish',
    question: 'Question', option: 'Option', correctOpt: 'Correct option number', explanation: 'Explanation (optional)',
    front: 'Question / front', back: 'Answer / back', addCard: '＋ New card', addQ: '＋ Quiz question',
    manage: 'Manage cards & questions', all: 'All', cardsCount: 'cards', qCount: 'questions', bestScore: 'Best score',
    deadlines: 'Deadlines', addDeadline: '＋ New deadline', date: 'Date', course: 'Course', none: '— None —',
    overdue: 'Overdue', todayWord: 'Today', daysLeft: 'd', gpa: 'GPA calculator', credits: 'Credits', grade: 'Grade', gname: 'Course',
    addRow: '＋ Course', semGpa: 'Semester GPA', cumGpa: 'Cumulative GPA', prevGpa: 'Previous cumulative GPA', prevCr: 'Previous credits',
    work: 'Focus', shortBreak: 'Short break', longBreak: 'Long break', start: 'Start', pause: 'Pause', reset: 'Reset',
    settings: 'Settings', minutes: 'minutes', language: 'Language', theme: 'Theme', themeAuto: 'Auto', themeLight: 'Light', themeDark: 'Dark',
    sessionDone: 'Session finished!', noNative: 'Adding and opening PDFs works inside the Android app only',
    name: 'Name', nothing: 'No cards or questions for this course yet', results: 'Search results', today: 'Today',
    cardsTotal: 'Cards', openNote: 'Open', hint: '', cardsDone: 'Known', cardsAgain: 'Needs review',
    todayTasks: 'Upcoming deadlines', offline: 'Works offline',
    level: 'Level', editCourse: 'Edit course', noLevel: 'Unassigned'
  }
};

/* ================== الحالة والتخزين ================== */
function defaults() {
  const d = JSON.parse(JSON.stringify(window.SEED));
  return {
    lang: 'ar', theme: 'auto', level: 'all',
    courses: d.courses, notes: d.notes, cards: d.cards, quiz: d.quiz,
    files: [], deadlines: [],
    gpa: { rows: [{ id: uid(), name: '', cr: 3, g: 'A' }], prevGpa: '', prevCr: '' },
    pomo: { work: 25, short: 5, long: 15, log: {}, mins: {} },
    best: {}
  };
}
function load() {
  try {
    const r = localStorage.getItem(KEY);
    if (r) return Object.assign(defaults(), JSON.parse(r));
  } catch (e) { }
  return defaults();
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }

let S = load();
const t = k => (L[S.lang] && L[S.lang][k]) || L.en[k] || k;
const V = { tab: 'home', lib: null, q: '', study: { course: 'all', mode: null }, cs: null, qs: null, plan: 'deadlines' };

const courseById = id => S.courses.find(c => c.id === id);
const cname = c => c ? (c.name || c[S.lang] || c.ar || c.en) : '';
const courseOptions = withNone => (withNone ? [['', t('none')]] : []).concat(S.courses.map(c => [c.id, cname(c)]));

/* المستويات الأربعة (الفرق الدراسية) */
const LVN = { ar: ['', 'المستوى الأول', 'المستوى الثاني', 'المستوى الثالث', 'المستوى الرابع'], en: ['', 'Level 1', 'Level 2', 'Level 3', 'Level 4'] };
const lvName = n => LVN[S.lang][parseInt(n, 10)] || t('noLevel');
const levelOptions = () => [['', t('noLevel')], [1, lvName(1)], [2, lvName(2)], [3, lvName(3)], [4, lvName(4)]];
const visibleCourses = () => S.level === 'all' ? S.courses : S.courses.filter(c => String(c.level) === String(S.level));
function levelChips() {
  return '<div class="chips">' + ['all', 1, 2, 3, 4].map(l => '<button class="chip ' + (String(S.level) === String(l) ? 'on' : '') + '" data-act="setlevel" data-lv="' + l + '">' + (l === 'all' ? t('all') : lvName(l)) + '</button>').join('') + '</div>';
}
function inScope(courseId, c) {
  if (c !== 'all') return courseId === c;
  return S.level === 'all' || visibleCourses().some(x => x.id === courseId);
}

/* ================== نوافذ ورسائل ================== */
function modal(html) { const m = $('#modal'); m.innerHTML = '<div class="sheet">' + html + '</div>'; m.hidden = false; return m; }
function closeModal() { const m = $('#modal'); m.hidden = true; m.innerHTML = ''; }
let toastTimer = null;
function toast(msg) {
  const e = $('#toast'); e.textContent = msg; e.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { e.hidden = true; }, 2200);
}
function form(title, fields, init) {
  init = init || {};
  return new Promise(res => {
    const h = '<h3>' + esc(title) + '</h3><form id="f">' + fields.map(f => {
      const v = init[f.k] != null ? init[f.k] : (f.def != null ? f.def : '');
      let inp;
      if (f.type === 'area') inp = '<textarea name="' + f.k + '" rows="' + (f.rows || 6) + '">' + esc(v) + '</textarea>';
      else if (f.type === 'select') inp = '<select name="' + f.k + '">' + f.options.map(o => '<option value="' + esc(o[0]) + '"' + (String(o[0]) === String(v) ? ' selected' : '') + '>' + esc(o[1]) + '</option>').join('') + '</select>';
      else inp = '<input name="' + f.k + '" type="' + (f.type || 'text') + '" value="' + esc(v) + '"' + (f.min != null ? ' min="' + f.min + '"' : '') + '>';
      return '<label>' + esc(f.label) + inp + '</label>';
    }).join('') + '<div class="row"><button type="submit" class="btn pri">' + t('save') + '</button><button type="button" class="btn" id="fc">' + t('cancel') + '</button></div></form>';
    const m = modal(h);
    const fm = $('#f', m);
    fm.onsubmit = e => {
      e.preventDefault();
      const o = {};
      fields.forEach(f => { o[f.k] = fm.elements[f.k].value.trim(); });
      if (fields.some(f => f.req && !o[f.k])) { toast(t('required')); return; }
      closeModal(); res(o);
    };
    $('#fc', m).onclick = () => { closeModal(); res(null); };
  });
}
function confirmBox(msg) {
  return new Promise(res => {
    const m = modal('<h3>' + esc(msg) + '</h3><div class="row"><button class="btn danger" id="cy">' + t('del') + '</button><button class="btn" id="cn">' + t('cancel') + '</button></div>');
    $('#cy', m).onclick = () => { closeModal(); res(true); };
    $('#cn', m).onclick = () => { closeModal(); res(false); };
  });
}

/* ================== المؤقت (Pomodoro) ================== */
const TM = { mode: 'work', running: false, end: 0, left: 0, iv: null };
const dur = m => (parseInt(S.pomo[m], 10) || 1) * 60;
TM.left = dur('work');
function tmReset(mode) {
  if (mode) TM.mode = mode;
  clearInterval(TM.iv); TM.running = false; TM.left = dur(TM.mode); native('keepAwake', false);
}
function tmStart() {
  if (TM.running) return;
  TM.running = true; TM.end = Date.now() + TM.left * 1000;
  TM.iv = setInterval(tick, 250); native('keepAwake', true);
}
function tmPause() {
  if (!TM.running) return;
  TM.left = Math.max(0, Math.round((TM.end - Date.now()) / 1000));
  TM.running = false; clearInterval(TM.iv); native('keepAwake', false);
}
function tick() {
  TM.left = Math.max(0, Math.ceil((TM.end - Date.now()) / 1000));
  if (TM.left <= 0) tmFinish(); else paintTimer();
}
function beep() {
  try {
    const A = window.AudioContext || window.webkitAudioContext; if (!A) return;
    const c = new A(), o = c.createOscillator(), g = c.createGain();
    o.connect(g); g.connect(c.destination); o.frequency.value = 880; g.gain.value = 0.2;
    o.start(); setTimeout(() => { o.stop(); c.close(); }, 700);
  } catch (e) { }
}
function tmFinish() {
  clearInterval(TM.iv); TM.running = false; native('keepAwake', false);
  beep(); native('vibrate', 600);
  if (TM.mode === 'work') {
    const k = todayISO();
    S.pomo.log[k] = (S.pomo.log[k] || 0) + 1;
    S.pomo.mins[k] = (S.pomo.mins[k] || 0) + (parseInt(S.pomo.work, 10) || 0);
    save();
    tmReset(S.pomo.log[k] % 4 === 0 ? 'long' : 'short');
  } else tmReset('work');
  toast(t('sessionDone'));
  if (V.tab === 'timer' || V.tab === 'home') render();
}
function fmtTime(s) { return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }
function paintTimer() {
  const a = $('#tmTime'), f = $('#tmFg');
  if (a) a.textContent = fmtTime(TM.left);
  if (f) { const C = 628.32; f.style.strokeDashoffset = String(C * (1 - TM.left / dur(TM.mode))); }
}

/* ================== العروض ================== */
const TABS = [['home', '🏠'], ['library', '📚'], ['study', '🧠'], ['planner', '📅'], ['timer', '⏱️']];

function render() {
  document.documentElement.lang = S.lang;
  document.documentElement.dir = S.lang === 'ar' ? 'rtl' : 'ltr';
  if (S.theme === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', S.theme);
  const views = { home: vHome, library: vLib, study: vStudy, planner: vPlanner, timer: vTimer };
  $('#view').innerHTML = views[V.tab]();
  $('#nav').innerHTML = TABS.map(x => '<button data-act="nav" data-tab="' + x[0] + '" class="' + (V.tab === x[0] ? 'on' : '') + '"><span class="i">' + x[1] + '</span>' + t(x[0]) + '</button>').join('');
  if (V.tab === 'timer') paintTimer();
  if (V.tab === 'planner' && V.plan === 'gpa') paintGpa();
}

function dlBadge(d) {
  const n = daysLeft(d.date);
  if (d.done) return '';
  if (n < 0) return '<span class="badge bad">' + t('overdue') + '</span>';
  if (n === 0) return '<span class="badge warn">' + t('todayWord') + '</span>';
  return '<span class="badge ' + (n <= 3 ? 'warn' : 'ok') + '">' + n + ' ' + t('daysLeft') + '</span>';
}
function dlItem(d, full) {
  const c = courseById(d.course);
  return '<div class="card dl ' + (d.done ? 'done' : '') + '">' +
    '<button class="btn sm" data-act="toggledl" data-id="' + d.id + '">' + (d.done ? '☑' : '☐') + '</button>' +
    '<div class="tx"><b>' + esc(d.title) + '</b><div class="small muted">' + esc(d.date) + (c ? ' · ' + esc(cname(c)) : '') + '</div></div>' +
    dlBadge(d) + (full ? '<button class="btn sm danger" data-act="deldl" data-id="' + d.id + '">✕</button>' : '') + '</div>';
}

function vHome() {
  const k = todayISO();
  const open = S.deadlines.filter(d => !d.done).sort((a, b) => a.date.localeCompare(b.date));
  const soon = open.filter(d => daysLeft(d.date) <= 7).length;
  return '<header class="hero"><h1>' + t('hello') + '</h1><p>' + t('subtitle') + '</p></header>' +
    '<section class="stats">' +
    '<div class="stat"><b>' + (S.pomo.log[k] || 0) + '</b><span>' + t('pomodoros') + '</span></div>' +
    '<div class="stat"><b>' + (S.pomo.mins[k] || 0) + '</b><span>' + t('focusMin') + '</span></div>' +
    '<div class="stat"><b>' + soon + '</b><span>' + t('dueSoon') + '</span></div></section>' +
    '<h2>' + t('quick') + '</h2><div class="grid2">' +
    '<button class="btn block" data-act="quick" data-to="cards">🃏 ' + t('flash') + '</button>' +
    '<button class="btn block" data-act="quick" data-to="quiz">📝 ' + t('quiz') + '</button>' +
    '<button class="btn block" data-act="nav" data-tab="timer">⏱️ ' + t('timer') + '</button>' +
    '<button class="btn block" data-act="nav" data-tab="library">📚 ' + t('library') + '</button></div>' +
    '<h2>' + t('todayTasks') + '</h2>' +
    (open.length ? open.slice(0, 3).map(d => dlItem(d, false)).join('') : '<div class="empty">' + t('noItems') + '</div>') +
    '<h2>' + t('settings') + '</h2><div class="card">' +
    '<label>' + t('language') + '<select data-input="lang"><option value="ar"' + (S.lang === 'ar' ? ' selected' : '') + '>العربية</option><option value="en"' + (S.lang === 'en' ? ' selected' : '') + '>English</option></select></label>' +
    '<label>' + t('theme') + '<select data-input="theme"><option value="auto"' + (S.theme === 'auto' ? ' selected' : '') + '>' + t('themeAuto') + '</option><option value="light"' + (S.theme === 'light' ? ' selected' : '') + '>' + t('themeLight') + '</option><option value="dark"' + (S.theme === 'dark' ? ' selected' : '') + '>' + t('themeDark') + '</option></select></label>' +
    '<p class="small muted" style="margin:0">✈️ ' + t('offline') + '</p></div>';
}

/* ---------- المكتبة ---------- */
function filesOf(courseId) {
  const b = (window.BUNDLED || []).filter(x => x.course === courseId).map(x => ({ id: 'b:' + x.file, name: x.title, file: x.file, source: 'asset' }));
  const u = S.files.filter(x => x.course === courseId).map(x => ({ id: x.id, name: x.name, file: x.file, source: 'user' }));
  return b.concat(u);
}
function vLib() {
  if (V.lib && V.lib.type === 'note') return vNote();
  if (V.lib && V.lib.type === 'course') return vCourse();
  return '<h1>' + t('library') + '</h1>' + levelChips() +
    '<input class="search" type="search" data-input="search" placeholder="' + esc(t('searchPh')) + '" value="' + esc(V.q) + '">' +
    '<div id="results">' + (V.q ? searchHtml(V.q) : coursesHtml()) + '</div>';
}
function coursesHtml() {
  const vc = visibleCourses();
  return (vc.length ? '' : '<div class="empty">' + t('noItems') + '</div>') + vc.map(c => '<button class="card tap" data-act="course" data-id="' + c.id + '"><span class="ic">' + esc(c.icon || '📘') + '</span><span class="tx"><b>' + esc(cname(c)) + '</b><span class="small muted">' +
    (c.level ? lvName(c.level) + ' · ' : '') + S.notes.filter(n => n.course === c.id).length + ' ' + t('notes') + ' · ' + filesOf(c.id).length + ' PDF · ' + S.cards.filter(k => k.course === c.id).length + ' ' + t('cardsCount') + '</span></span><span class="chev">›</span></button>').join('') +
    '<button class="btn block" data-act="addcourse">' + t('addCourse') + '</button>';
}
function searchHtml(q) {
  q = q.toLowerCase();
  const nn = S.notes.filter(n => (n.title + ' ' + n.body).toLowerCase().indexOf(q) >= 0);
  const ff = [];
  S.courses.forEach(c => filesOf(c.id).forEach(f => { if (f.name.toLowerCase().indexOf(q) >= 0) ff.push({ f: f, c: c }); }));
  const kk = S.cards.filter(k => (k.q + ' ' + k.a).toLowerCase().indexOf(q) >= 0);
  if (!nn.length && !ff.length && !kk.length) return '<div class="empty">' + t('noItems') + '</div>';
  return '<h2>' + t('results') + '</h2>' +
    nn.map(n => '<button class="card tap" data-act="opennote" data-id="' + n.id + '"><span class="ic">📝</span><span class="tx"><b>' + esc(n.title) + '</b><span class="small muted">' + esc(cname(courseById(n.course))) + '</span></span></button>').join('') +
    ff.map(x => '<button class="card tap" data-act="openfile" data-src="' + x.f.source + '" data-file="' + esc(x.f.file) + '"><span class="ic">📄</span><span class="tx"><b>' + esc(x.f.name) + '</b><span class="small muted">' + esc(cname(x.c)) + '</span></span></button>').join('') +
    kk.map(k => '<div class="card"><b>' + esc(k.q) + '</b><p class="muted" style="margin:6px 0 0">' + esc(k.a) + '</p></div>').join('');
}
function vCourse() {
  const c = courseById(V.lib.id);
  if (!c) { V.lib = null; return vLib(); }
  const seg = V.lib.seg;
  let body;
  if (seg === 'notes') {
    const ns = S.notes.filter(n => n.course === c.id);
    body = (ns.length ? ns.map(n => '<button class="card tap" data-act="opennote" data-id="' + n.id + '"><span class="ic">📝</span><span class="tx"><b>' + esc(n.title) + '</b></span><span class="chev">›</span></button>').join('') : '<div class="empty">' + t('noItems') + '</div>') +
      '<button class="btn block" data-act="addnote">' + t('addNote') + '</button>';
  } else {
    const fs = filesOf(c.id);
    body = (fs.length ? fs.map(f => '<div class="card dl"><span style="font-size:26px">📄</span><div class="tx"><b>' + esc(f.name) + '</b></div>' +
      '<button class="btn sm pri" data-act="openfile" data-src="' + f.source + '" data-file="' + esc(f.file) + '">' + t('openFile') + '</button>' +
      (f.source === 'user' ? '<button class="btn sm danger" data-act="delfile" data-id="' + f.id + '">✕</button>' : '') + '</div>').join('') : '<div class="empty">' + t('noItems') + '</div>') +
      '<button class="btn block" data-act="addfile">' + t('addFile') + '</button>';
  }
  return '<div class="row sb"><h1>' + esc(c.icon || '') + ' ' + esc(cname(c)) + '</h1><span class="row"><button class="btn sm" data-act="editcourse">✏️</button><button class="btn sm danger" data-act="delcourse">🗑</button></span></div>' +
    '<div class="seg"><button data-act="seg" data-seg="notes" class="' + (seg === 'notes' ? 'on' : '') + '">' + t('notes') + '</button><button data-act="seg" data-seg="files" class="' + (seg === 'files' ? 'on' : '') + '">' + t('files') + '</button></div>' + body;
}
function vNote() {
  const n = S.notes.find(x => x.id === V.lib.id);
  if (!n) { V.lib = null; return vLib(); }
  return '<h1>' + esc(n.title) + '</h1><p class="small muted">' + esc(cname(courseById(n.course))) + '</p>' +
    '<div class="card note-body">' + esc(n.body) + '</div>' +
    '<div class="row"><button class="btn" data-act="editnote">' + t('edit') + '</button><button class="btn danger" data-act="delnote">' + t('del') + '</button></div>';
}

/* ---------- المذاكرة ---------- */
function cardsFor(c) { return S.cards.filter(k => inScope(k.course, c)); }
function quizFor(c) { return S.quiz.filter(k => inScope(k.course, c)); }
function vStudy() {
  if (V.cs) return vCards();
  if (V.qs) return vQuiz();
  const c = V.study.course;
  if (V.study.mode === 'manage') return vManage();
  const chips = '<div class="chips"><button class="chip ' + (c === 'all' ? 'on' : '') + '" data-act="scourse" data-id="all">' + t('all') + '</button>' +
    visibleCourses().map(x => '<button class="chip ' + (c === x.id ? 'on' : '') + '" data-act="scourse" data-id="' + x.id + '">' + esc(cname(x)) + '</button>').join('') + '</div>';
  const nc = cardsFor(c).length, nq = quizFor(c).length;
  const best = S.best[c];
  return '<h1>' + t('study') + '</h1>' + levelChips() + chips +
    '<button class="card tap" data-act="startcards"><span class="ic">🃏</span><span class="tx"><b>' + t('flash') + '</b><span class="small muted">' + nc + ' ' + t('cardsCount') + '</span></span><span class="chev">›</span></button>' +
    '<button class="card tap" data-act="startquiz"><span class="ic">📝</span><span class="tx"><b>' + t('quiz') + '</b><span class="small muted">' + nq + ' ' + t('qCount') + (best != null ? ' · ' + t('bestScore') + ': ' + best + '%' : '') + '</span></span><span class="chev">›</span></button>' +
    '<button class="card tap" data-act="manage"><span class="ic">🛠</span><span class="tx"><b>' + t('manage') + '</b></span><span class="chev">›</span></button>';
}
function startCards() {
  const list = cardsFor(V.study.course);
  if (!list.length) { toast(t('nothing')); return; }
  const sorted = shuffle(list).sort((a, b) => (a.box || 1) - (b.box || 1)).slice(0, 20);
  V.cs = { q: sorted.map(k => k.id), i: 0, flip: false, know: 0, again: 0 };
  render();
}
function vCards() {
  const s = V.cs;
  if (s.i >= s.q.length) {
    return '<h1>' + t('done') + '</h1><div class="card"><p>✓ ' + t('cardsDone') + ': <b>' + s.know + '</b></p><p>✗ ' + t('cardsAgain') + ': <b>' + s.again + '</b></p></div>' +
      '<div class="row"><button class="btn pri" data-act="startcards">' + t('restart') + '</button><button class="btn" data-act="exitstudy">' + t('study') + '</button></div>';
  }
  const k = S.cards.find(x => x.id === s.q[s.i]);
  return '<div class="row sb"><b>' + (s.i + 1) + ' / ' + s.q.length + '</b><button class="btn sm" data-act="exitstudy">✕</button></div>' +
    '<div class="progress"><i style="width:' + Math.round(s.i / s.q.length * 100) + '%"></i></div>' +
    '<div class="flash ' + (s.flip ? 'back' : '') + '" data-act="flip">' + esc(s.flip ? k.a : k.q) + '</div>' +
    (s.flip ? '<div class="grid2"><button class="btn danger" data-act="again">' + t('again') + '</button><button class="btn pri" data-act="know">' + t('know') + '</button></div>' : '<p class="muted small" style="text-align:center">' + t('flipHint') + '</p>');
}
function startQuiz() {
  const list = shuffle(quizFor(V.study.course)).slice(0, 10);
  if (!list.length) { toast(t('nothing')); return; }
  V.qs = {
    i: 0, score: 0, picked: null,
    list: list.map(q => ({ q: q.q, exp: q.exp, opts: shuffle(q.opts.map((o, i) => ({ t: o, ok: i === q.ans }))) }))
  };
  render();
}
function vQuiz() {
  const s = V.qs;
  if (s.i >= s.list.length) {
    const pct = Math.round(s.score / s.list.length * 100);
    return '<h1>' + t('score') + '</h1><div class="big">' + (pct >= 80 ? '🏆' : pct >= 50 ? '👍' : '📖') + '</div>' +
      '<div class="card" style="text-align:center"><b style="font-size:34px">' + s.score + ' / ' + s.list.length + '</b><p class="muted">' + pct + '%</p></div>' +
      '<div class="row"><button class="btn pri" data-act="startquiz">' + t('restart') + '</button><button class="btn" data-act="exitstudy">' + t('study') + '</button></div>';
  }
  const q = s.list[s.i];
  const opts = q.opts.map((o, i) => {
    let cls = '';
    if (s.picked != null) cls = o.ok ? 'ok' : (i === s.picked ? 'bad' : '');
    return '<button class="opt ' + cls + '" data-act="pick" data-i="' + i + '"' + (s.picked != null ? ' disabled' : '') + '>' + esc(o.t) + '</button>';
  }).join('');
  return '<div class="row sb"><b>' + (s.i + 1) + ' / ' + s.list.length + '</b><button class="btn sm" data-act="exitstudy">✕</button></div>' +
    '<div class="progress"><i style="width:' + Math.round(s.i / s.list.length * 100) + '%"></i></div>' +
    '<h3>' + esc(q.q) + '</h3>' + opts +
    (s.picked != null ? (q.exp ? '<div class="card small">💡 ' + esc(q.exp) + '</div>' : '') + '<button class="btn pri block" data-act="qnext">' + (s.i + 1 >= s.list.length ? t('finish') : t('next')) + '</button>' : '');
}
function vManage() {
  const c = V.study.course;
  const cs = cardsFor(c), qs = quizFor(c);
  return '<div class="row sb"><h1>' + t('manage') + '</h1><button class="btn sm" data-act="exitstudy">✕</button></div>' +
    '<div class="row" style="margin-bottom:12px"><button class="btn pri" data-act="addcard">' + t('addCard') + '</button><button class="btn" data-act="addq">' + t('addQ') + '</button></div>' +
    '<h2>' + t('flash') + ' (' + cs.length + ')</h2>' +
    (cs.map(k => '<div class="card dl"><div class="tx"><b>' + esc(k.q) + '</b><div class="small muted">' + esc(k.a) + '</div></div><button class="btn sm danger" data-act="delcard" data-id="' + k.id + '">✕</button></div>').join('') || '<div class="empty">' + t('noItems') + '</div>') +
    '<h2>' + t('quiz') + ' (' + qs.length + ')</h2>' +
    (qs.map(k => '<div class="card dl"><div class="tx"><b>' + esc(k.q) + '</b></div><button class="btn sm danger" data-act="delq" data-id="' + k.id + '">✕</button></div>').join('') || '<div class="empty">' + t('noItems') + '</div>');
}

/* ---------- المواعيد و GPA ---------- */
function vPlanner() {
  const seg = '<div class="seg"><button data-act="plan" data-seg="deadlines" class="' + (V.plan === 'deadlines' ? 'on' : '') + '">' + t('deadlines') + '</button><button data-act="plan" data-seg="gpa" class="' + (V.plan === 'gpa' ? 'on' : '') + '">' + t('gpa') + '</button></div>';
  if (V.plan === 'gpa') {
    const rows = S.gpa.rows.map(r => '<div class="gpa-row">' +
      '<input data-input="gpa" data-id="' + r.id + '" data-f="name" placeholder="' + esc(t('gname')) + '" value="' + esc(r.name) + '">' +
      '<input data-input="gpa" data-id="' + r.id + '" data-f="cr" type="number" min="0" step="0.5" value="' + esc(r.cr) + '">' +
      '<select data-input="gpa" data-id="' + r.id + '" data-f="g">' + GRADES.map(g => '<option' + (g[0] === r.g ? ' selected' : '') + '>' + g[0] + '</option>').join('') + '</select>' +
      '<button class="btn sm danger" data-act="delrow" data-id="' + r.id + '">✕</button></div>').join('');
    return '<h1>' + t('planner') + '</h1>' + seg +
      '<div class="small muted gpa-row" style="margin-bottom:2px"><span>' + t('gname') + '</span><span>' + t('credits') + '</span><span>' + t('grade') + '</span><span></span></div>' + rows +
      '<button class="btn block" data-act="addrow" style="margin:6px 0 12px">' + t('addRow') + '</button>' +
      '<div class="card"><label>' + t('prevGpa') + '<input data-input="prevGpa" type="number" step="0.01" min="0" max="4" value="' + esc(S.gpa.prevGpa) + '"></label>' +
      '<label>' + t('prevCr') + '<input data-input="prevCr" type="number" step="1" min="0" value="' + esc(S.gpa.prevCr) + '"></label></div>' +
      '<div class="card gpa-out" id="gpaOut"></div>';
  }
  const list = S.deadlines.slice().sort((a, b) => (a.done - b.done) || a.date.localeCompare(b.date));
  return '<h1>' + t('planner') + '</h1>' + seg +
    '<button class="btn pri block" data-act="adddl" style="margin-bottom:12px">' + t('addDeadline') + '</button>' +
    (list.length ? list.map(d => dlItem(d, true)).join('') : '<div class="empty">' + t('noItems') + '</div>');
}
function gpaCalc() {
  let pts = 0, cr = 0;
  S.gpa.rows.forEach(r => {
    const c = parseFloat(r.cr) || 0, g = GRADES.find(x => x[0] === r.g);
    if (c > 0 && g) { pts += c * g[1]; cr += c; }
  });
  const sem = cr ? pts / cr : 0;
  const pg = parseFloat(S.gpa.prevGpa), pc = parseFloat(S.gpa.prevCr);
  const cum = (!isNaN(pg) && !isNaN(pc) && pc > 0 && cr > 0) ? (pg * pc + pts) / (pc + cr) : null;
  return { sem: sem, cr: cr, cum: cum };
}
function paintGpa() {
  const o = $('#gpaOut'); if (!o) return;
  const r = gpaCalc();
  o.innerHTML = '<span class="muted">' + t('semGpa') + '</span><b>' + r.sem.toFixed(2) + '</b>' +
    (r.cum != null ? '<span class="muted">' + t('cumGpa') + '</span><b>' + r.cum.toFixed(2) + '</b>' : '');
}

/* ---------- المؤقت ---------- */
function vTimer() {
  const modes = ['work', 'short', 'long'].map(m => '<button data-act="tmmode" data-m="' + m + '" class="' + (TM.mode === m ? 'on' : '') + '">' + t(m === 'work' ? 'work' : m === 'short' ? 'shortBreak' : 'longBreak') + '</button>').join('');
  const k = todayISO();
  return '<div class="row sb"><h1>' + t('timer') + '</h1><button class="btn sm" data-act="tmset">⚙️ ' + t('settings') + '</button></div>' +
    '<div class="seg">' + modes + '</div>' +
    '<div class="ring-wrap"><div class="ring"><svg width="230" height="230" viewBox="0 0 230 230"><circle class="bg" cx="115" cy="115" r="100"></circle><circle class="fg" id="tmFg" cx="115" cy="115" r="100" stroke-dasharray="628.32" stroke-dashoffset="0"></circle></svg>' +
    '<div class="t"><b id="tmTime">' + fmtTime(TM.left) + '</b></div></div></div>' +
    '<div class="row" style="justify-content:center;margin-bottom:14px">' +
    (TM.running ? '<button class="btn pri" data-act="tmpause">' + t('pause') + '</button>' : '<button class="btn pri" data-act="tmstart">' + t('start') + '</button>') +
    '<button class="btn" data-act="tmreset">' + t('reset') + '</button></div>' +
    '<div class="stats" style="grid-template-columns:1fr 1fr"><div class="stat"><b>' + (S.pomo.log[k] || 0) + '</b><span>' + t('pomodoros') + '</span></div><div class="stat"><b>' + (S.pomo.mins[k] || 0) + '</b><span>' + t('focusMin') + '</span></div></div>';
}

/* ================== الأحداث ================== */
async function act(a, el) {
  const d = el.dataset;
  switch (a) {
    case 'nav': V.tab = d.tab; V.lib = null; V.q = ''; V.cs = null; V.qs = null; V.study.mode = null; render(); $('#view').scrollTop = 0; break;
    case 'quick': V.tab = 'study'; V.study.course = 'all'; V.study.mode = null; if (d.to === 'cards') startCards(); else startQuiz(); if (!V.cs && !V.qs) render(); break;
    case 'course': V.lib = { type: 'course', id: d.id, seg: 'notes' }; render(); break;
    case 'seg': V.lib.seg = d.seg; render(); break;
    case 'addcourse': {
      const r = await form(t('addCourse'), [{ k: 'name', label: t('name'), req: true }, { k: 'icon', label: 'Emoji', def: '📘' }, { k: 'level', label: t('level'), type: 'select', options: levelOptions(), def: S.level === 'all' ? '' : S.level }]);
      if (r) { S.courses.push({ id: uid(), name: r.name, icon: r.icon || '📘', level: r.level ? parseInt(r.level, 10) : '' }); save(); render(); }
      break;
    }
    case 'editcourse': {
      const c = courseById(V.lib.id);
      const r = await form(t('editCourse'), [{ k: 'name', label: t('name'), def: cname(c), req: true }, { k: 'icon', label: 'Emoji', def: c.icon || '📘' }, { k: 'level', label: t('level'), type: 'select', options: levelOptions(), def: c.level || '' }]);
      if (r) { c.name = r.name; c.icon = r.icon || '📘'; c.level = r.level ? parseInt(r.level, 10) : ''; save(); render(); }
      break;
    }
    case 'setlevel': S.level = d.lv; V.study.course = 'all'; save(); render(); break;
    case 'delcourse':
      if (await confirmBox(t('confirmDel'))) {
        const id = V.lib.id;
        S.files.filter(f => f.course === id).forEach(f => native('deleteUser', f.file));
        S.courses = S.courses.filter(c => c.id !== id);
        S.notes = S.notes.filter(n => n.course !== id); S.cards = S.cards.filter(k => k.course !== id);
        S.quiz = S.quiz.filter(k => k.course !== id); S.files = S.files.filter(f => f.course !== id);
        S.deadlines.forEach(x => { if (x.course === id) x.course = ''; });
        save(); V.lib = null; render();
      }
      break;
    case 'addnote': {
      const r = await form(t('addNote'), [{ k: 'title', label: t('title'), req: true }, { k: 'body', label: t('content'), type: 'area', rows: 10 }]);
      if (r) { S.notes.push({ id: uid(), course: V.lib.id, title: r.title, body: r.body }); save(); render(); }
      break;
    }
    case 'opennote': { const n = S.notes.find(x => x.id === d.id); V.lib = { type: 'note', id: d.id, course: n.course }; render(); break; }
    case 'editnote': {
      const n = S.notes.find(x => x.id === V.lib.id);
      const r = await form(t('edit'), [{ k: 'title', label: t('title'), req: true }, { k: 'body', label: t('content'), type: 'area', rows: 12 }], n);
      if (r) { n.title = r.title; n.body = r.body; save(); render(); }
      break;
    }
    case 'delnote':
      if (await confirmBox(t('confirmDel'))) { const c = V.lib.course; S.notes = S.notes.filter(n => n.id !== V.lib.id); save(); V.lib = { type: 'course', id: c, seg: 'notes' }; render(); }
      break;
    case 'addfile': if (NATIVE) native('pickPdf', V.lib.id); else toast(t('noNative')); break;
    case 'openfile':
      if (NATIVE) native(d.src === 'asset' ? 'openAsset' : 'openUser', d.file); else toast(t('noNative'));
      break;
    case 'delfile':
      if (await confirmBox(t('confirmDel'))) {
        const f = S.files.find(x => x.id === d.id);
        if (f) native('deleteUser', f.file);
        S.files = S.files.filter(x => x.id !== d.id); save(); render();
      }
      break;
    case 'scourse': V.study.course = d.id; render(); break;
    case 'startcards': startCards(); break;
    case 'startquiz': startQuiz(); break;
    case 'manage': V.study.mode = 'manage'; render(); break;
    case 'exitstudy': V.cs = null; V.qs = null; V.study.mode = null; render(); break;
    case 'flip': V.cs.flip = !V.cs.flip; render(); break;
    case 'know': case 'again': {
      const k = S.cards.find(x => x.id === V.cs.q[V.cs.i]);
      if (a === 'know') { k.box = Math.min(3, (k.box || 1) + 1); V.cs.know++; } else { k.box = 1; V.cs.again++; }
      save(); V.cs.i++; V.cs.flip = false; render(); break;
    }
    case 'pick': {
      const s = V.qs; if (s.picked != null) break;
      s.picked = parseInt(d.i, 10);
      if (s.list[s.i].opts[s.picked].ok) s.score++;
      render(); break;
    }
    case 'qnext': {
      const s = V.qs; s.i++; s.picked = null;
      if (s.i >= s.list.length) {
        const pct = Math.round(s.score / s.list.length * 100), c = V.study.course;
        if (S.best[c] == null || pct > S.best[c]) S.best[c] = pct;
        save();
      }
      render(); break;
    }
    case 'addcard': {
      const r = await form(t('addCard'), [{ k: 'course', label: t('course'), type: 'select', options: courseOptions(false), def: V.study.course === 'all' ? (S.courses[0] || {}).id : V.study.course }, { k: 'q', label: t('front'), type: 'area', rows: 3, req: true }, { k: 'a', label: t('back'), type: 'area', rows: 4, req: true }]);
      if (r) { S.cards.push({ id: uid(), course: r.course, q: r.q, a: r.a, box: 1 }); save(); render(); }
      break;
    }
    case 'delcard': if (await confirmBox(t('confirmDel'))) { S.cards = S.cards.filter(k => k.id !== d.id); save(); render(); } break;
    case 'addq': {
      const r = await form(t('addQ'), [
        { k: 'course', label: t('course'), type: 'select', options: courseOptions(false), def: V.study.course === 'all' ? (S.courses[0] || {}).id : V.study.course },
        { k: 'q', label: t('question'), type: 'area', rows: 3, req: true },
        { k: 'o1', label: t('option') + ' 1', req: true }, { k: 'o2', label: t('option') + ' 2', req: true },
        { k: 'o3', label: t('option') + ' 3' }, { k: 'o4', label: t('option') + ' 4' },
        { k: 'ans', label: t('correctOpt'), type: 'select', options: [[1, '1'], [2, '2'], [3, '3'], [4, '4']], def: 1 },
        { k: 'exp', label: t('explanation') }]);
      if (r) {
        const opts = [r.o1, r.o2, r.o3, r.o4];
        const ai = parseInt(r.ans, 10) - 1;
        const clean = [], map = {};
        opts.forEach((o, i) => { if (o) { map[i] = clean.length; clean.push(o); } });
        if (map[ai] == null) { toast(t('required')); break; }
        S.quiz.push({ id: uid(), course: r.course, q: r.q, opts: clean, ans: map[ai], exp: r.exp });
        save(); render();
      }
      break;
    }
    case 'delq': if (await confirmBox(t('confirmDel'))) { S.quiz = S.quiz.filter(k => k.id !== d.id); save(); render(); } break;
    case 'plan': V.plan = d.seg; render(); break;
    case 'adddl': {
      const r = await form(t('addDeadline'), [{ k: 'title', label: t('title'), req: true }, { k: 'course', label: t('course'), type: 'select', options: courseOptions(true) }, { k: 'date', label: t('date'), type: 'date', def: todayISO(), req: true }]);
      if (r) { S.deadlines.push({ id: uid(), title: r.title, course: r.course, date: r.date, done: false }); save(); render(); }
      break;
    }
    case 'toggledl': { const x = S.deadlines.find(z => z.id === d.id); x.done = !x.done; save(); render(); break; }
    case 'deldl': if (await confirmBox(t('confirmDel'))) { S.deadlines = S.deadlines.filter(z => z.id !== d.id); save(); render(); } break;
    case 'addrow': S.gpa.rows.push({ id: uid(), name: '', cr: 3, g: 'A' }); save(); render(); break;
    case 'delrow': S.gpa.rows = S.gpa.rows.filter(r => r.id !== d.id); if (!S.gpa.rows.length) S.gpa.rows.push({ id: uid(), name: '', cr: 3, g: 'A' }); save(); render(); break;
    case 'tmmode': tmReset(d.m); render(); break;
    case 'tmstart': tmStart(); render(); break;
    case 'tmpause': tmPause(); render(); break;
    case 'tmreset': tmReset(); render(); break;
    case 'tmset': {
      const r = await form(t('settings') + ' (' + t('minutes') + ')', [
        { k: 'work', label: t('work'), type: 'number', min: 1, def: S.pomo.work }, { k: 'short', label: t('shortBreak'), type: 'number', min: 1, def: S.pomo.short }, { k: 'long', label: t('longBreak'), type: 'number', min: 1, def: S.pomo.long }]);
      if (r) { ['work', 'short', 'long'].forEach(m => { const v = parseInt(r[m], 10); if (v > 0) S.pomo[m] = v; }); save(); tmReset(); render(); }
      break;
    }
  }
}

document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (el) act(el.dataset.act, el);
});
document.addEventListener('input', e => {
  const el = e.target, k = el.dataset && el.dataset.input;
  if (!k) return;
  if (k === 'search') { V.q = el.value.trim(); $('#results').innerHTML = V.q ? searchHtml(V.q) : coursesHtml(); }
  else if (k === 'gpa') { const r = S.gpa.rows.find(x => x.id === el.dataset.id); if (r) { r[el.dataset.f] = el.value; save(); paintGpa(); } }
  else if (k === 'prevGpa' || k === 'prevCr') { S.gpa[k] = el.value; save(); paintGpa(); }
  else if (k === 'lang') { S.lang = el.value; save(); render(); }
  else if (k === 'theme') { S.theme = el.value; save(); render(); }
});

// يُستدعى من الأندرويد بعد اختيار ملفات PDF
window.onPdfPicked = function (json) {
  try {
    const r = JSON.parse(json);
    r.items.forEach(i => S.files.push({ id: uid(), course: r.course, name: i.name, file: i.file, size: i.size }));
    save(); render();
    toast('✓ ' + r.items.length + ' PDF');
  } catch (e) { }
};
// زر الرجوع في الأندرويد
window.handleBack = function () {
  if (!$('#modal').hidden) { closeModal(); return true; }
  if (V.cs || V.qs || V.study.mode) { V.cs = null; V.qs = null; V.study.mode = null; render(); return true; }
  if (V.tab === 'library' && V.lib) {
    V.lib = V.lib.type === 'note' ? { type: 'course', id: V.lib.course, seg: 'notes' } : null;
    render(); return true;
  }
  if (V.tab !== 'home') { V.tab = 'home'; render(); return true; }
  return false;
};

render();
})();
