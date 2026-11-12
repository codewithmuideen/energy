// Apex Core brand asset generator: SVG masters -> transparent PNGs + ICO
const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const OUT = 'c:/Users/HP/Downloads/energy/brand';
const FONTS = path.join(__dirname, 'fonts');
const fontOpts = {
  fontFiles: ['Montserrat-Bold.ttf', 'Montserrat-SemiBold.ttf', 'Montserrat-Medium.ttf'].map(f => path.join(FONTS, f)),
  loadSystemFonts: false,
  defaultFontFamily: 'Montserrat',
};

const C = {
  navy: '#071725', navy2: '#102B40', gold: '#C6A15B', teal: '#16B6A4',
  light: '#F3F1EB', white: '#FFFFFF', body: '#66717B',
};

// ---------- MARK (viewBox 0 0 200 200, visually centred) ----------
// Two faceted legs form the apex "A"; the droplet is the "core".
const LEFT = 'M100 20 L100 86 L60 174 L26 174 Z';
const RIGHT = 'M100 20 L174 174 L140 174 L100 86 Z';
const DROP = 'M100 99 C100 99 119 123 119 140 A19 19 0 1 1 81 140 C81 123 100 99 100 99 Z';

let uid = 0;
function mark(mode = 'full', { tx = 0, ty = 3, scale = 1 } = {}) {
  const id = `m${uid++}`;
  let defs = '', l, r, d, extra = '';
  if (mode === 'full') {
    defs = `<defs>
      <linearGradient id="${id}L" x1="0.2" y1="0" x2="0.6" y2="1">
        <stop offset="0" stop-color="#F6E3B0"/><stop offset="0.45" stop-color="#D9B672"/><stop offset="1" stop-color="#B08A45"/></linearGradient>
      <linearGradient id="${id}R" x1="0.8" y1="0" x2="0.4" y2="1">
        <stop offset="0" stop-color="#C6A15B"/><stop offset="0.55" stop-color="#9C7838"/><stop offset="1" stop-color="#6F5224"/></linearGradient>
      <linearGradient id="${id}D" x1="0.3" y1="0" x2="0.7" y2="1">
        <stop offset="0" stop-color="#5BEBD8"/><stop offset="0.5" stop-color="#16B6A4"/><stop offset="1" stop-color="#0A7469"/></linearGradient>
    </defs>`;
    l = `url(#${id}L)`; r = `url(#${id}R)`; d = `url(#${id}D)`;
    extra = `<path d="M100 20 L100 86 L97 92 L97 27 Z" fill="#FFF6DC" opacity="0.55"/>
      <ellipse cx="92" cy="133" rx="4.2" ry="8" transform="rotate(28 92 133)" fill="#FFFFFF" opacity="0.45"/>`;
  } else if (mode === 'flat') { l = '#D4B06A'; r = '#A9853F'; d = C.teal; }
  else if (mode === 'gold') { l = r = C.gold; d = C.gold; }
  else if (mode === 'white') { l = '#FFFFFF'; r = '#E6E9EC'; d = '#FFFFFF'; }
  else if (mode === 'navy') { l = C.navy2; r = C.navy; d = C.navy; }
  else if (mode === 'goldteal') { l = r = C.gold; d = C.teal; }
  return `${defs}<g transform="translate(${tx} ${ty}) scale(${scale})">
    <path d="${LEFT}" fill="${l}"/><path d="${RIGHT}" fill="${r}"/>
    <path d="${DROP}" fill="${d}"/>${extra}</g>`;
}

// ---------- RENDER HELPERS ----------
function render(svg, file, width) {
  const png = new Resvg(svg, { font: fontOpts, fitTo: { mode: 'width', value: width }, background: 'rgba(0,0,0,0)' }).render().asPng();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, png);
  return png;
}
// Trim a lockup to its painted bbox + padding so PNGs have no dead space.
function trimmed(inner, pad = 24) {
  const probe = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3000 1400">${inner}</svg>`;
  const b = new Resvg(probe, { font: fontOpts }).getBBox();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${b.x - pad} ${b.y - pad} ${b.width + 2 * pad} ${b.height + 2 * pad}">${inner}</svg>`;
}
const save = (name, svg) => { fs.mkdirSync(path.dirname(name), { recursive: true }); fs.writeFileSync(name, svg); };

// ---------- WORDMARK ----------
function wordmark(x, y, { apex, core, tag, rule, anchor = 'start', width = 660 }) {
  return `<text x="${x}" y="${y}" font-family="Montserrat" font-weight="700" font-size="104" text-anchor="${anchor}"
      textLength="${width}" lengthAdjust="spacing"><tspan fill="${apex}">APEX</tspan><tspan fill="${core}"> CORE</tspan></text>
    <text x="${x}" y="${y + 58}" font-family="Montserrat" font-weight="600" font-size="25.5" text-anchor="${anchor}"
      textLength="${width}" lengthAdjust="spacing" fill="${tag}">OIL AND ENERGY RESOURCES LTD</text>
    ${rule ? `<rect x="${anchor === 'middle' ? x - width / 2 : x}" y="${y + 18}" width="${width}" height="3" fill="${rule}"/>` : ''}`;
}

const themes = {
  'on-light': { m: 'full', apex: C.navy, core: C.gold, tag: C.navy2, rule: C.gold },
  'on-dark': { m: 'full', apex: C.white, core: C.gold, tag: '#C9D2DA', rule: C.gold },
  'mono-white': { m: 'white', apex: C.white, core: C.white, tag: C.white, rule: C.white },
  'mono-navy': { m: 'navy', apex: C.navy, core: C.navy, tag: C.navy, rule: C.navy },
  'mono-gold': { m: 'gold', apex: C.gold, core: C.gold, tag: C.gold, rule: C.gold },
};

const outputs = [];
for (const [t, o] of Object.entries(themes)) {
  // Horizontal lockup
  const h = trimmed(`${mark(o.m, { scale: 1.32 })}${wordmark(300, 165, { ...o })}`, 30);
  save(`${OUT}/svg/apexcore-logo-horizontal-${t}.svg`, h);
  render(h, `${OUT}/logo/apexcore-logo-horizontal-${t}.png`, 2400);
  outputs.push(`logo/apexcore-logo-horizontal-${t}.png`);
  // Stacked lockup
  const s = trimmed(`${mark(o.m, { tx: 230, ty: 0, scale: 1.6 })}${wordmark(390, 440, { ...o, anchor: 'middle' })}`, 30);
  save(`${OUT}/svg/apexcore-logo-stacked-${t}.svg`, s);
  render(s, `${OUT}/logo/apexcore-logo-stacked-${t}.png`, 1800);
  outputs.push(`logo/apexcore-logo-stacked-${t}.png`);
}
// Standalone marks
for (const m of ['full', 'flat', 'gold', 'white', 'navy', 'goldteal']) {
  const svg = trimmed(mark(m), 8);
  save(`${OUT}/svg/apexcore-mark-${m}.svg`, svg);
  render(svg, `${OUT}/logo/apexcore-mark-${m}.png`, 1200);
}

// ---------- FAVICONS (square 512 canvas) ----------
const sq = inner => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${inner}</svg>`;
const hex = (r, cx = 100, cy = 100) => Array.from({ length: 6 }, (_, i) => {
  const a = Math.PI / 180 * (60 * i - 90);
  return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
}).join(' ');

const fav = {
  // transparent mark only
  'mark-gold': (small) => sq(mark(small ? 'flat' : 'full', { tx: 4, ty: 6, scale: 0.96 })),
  // navy rounded square app tile
  'tile-navy': (small) => sq(`<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#123550"/><stop offset="1" stop-color="#071725"/></linearGradient></defs>
    <rect x="0" y="0" width="200" height="200" rx="44" fill="url(#bg)"/>
    ${small ? '' : '<rect x="3" y="3" width="194" height="194" rx="41" fill="none" stroke="#C6A15B" stroke-opacity="0.45" stroke-width="2"/>'}
    ${mark(small ? 'flat' : 'full', { tx: 27, ty: 26, scale: 0.73 })}`),
  // navy circle with gold ring
  'circle-navy': (small) => sq(`<circle cx="100" cy="100" r="98" fill="${C.navy}"/>
    <circle cx="100" cy="100" r="${small ? 92 : 90}" fill="none" stroke="${C.gold}" stroke-width="${small ? 8 : 3}"/>
    ${mark(small ? 'flat' : 'full', { tx: 38, ty: 37, scale: 0.62 })}`),
  // hexagon (hydrocarbon molecule) emblem
  'hex-navy': (small) => sq(`<polygon points="${hex(99)}" fill="${C.navy}"/>
    <polygon points="${hex(small ? 90 : 91)}" fill="none" stroke="${C.gold}" stroke-width="${small ? 9 : 3.5}" stroke-linejoin="round"/>
    ${mark(small ? 'flat' : 'full', { tx: 39, ty: 39, scale: 0.61 })}`),
  // light ivory tile for dark browser tabs / light UIs
  'tile-light': (small) => sq(`<rect width="200" height="200" rx="44" fill="${C.light}"/>
    ${mark(small ? 'flat' : 'full', { tx: 27, ty: 26, scale: 0.73 })}`),
  // gold tile, navy mark (bold high-contrast)
  'tile-gold': () => sq(`<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E2C487"/><stop offset="1" stop-color="#A8843F"/></linearGradient></defs>
    <rect width="200" height="200" rx="44" fill="url(#g)"/>${mark('navy', { tx: 27, ty: 26, scale: 0.73 })}`),
  // teal tile, white mark (secondary accent)
  'tile-teal': () => sq(`<defs><linearGradient id="t" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1FCBB7"/><stop offset="1" stop-color="#0B7F73"/></linearGradient></defs>
    <rect width="200" height="200" rx="44" fill="url(#t)"/>${mark('white', { tx: 27, ty: 26, scale: 0.73 })}`),
  // single-colour white mark (for dark overlays / safari pinned)
  'mark-white': () => sq(mark('white', { tx: 4, ty: 6, scale: 0.96 })),
};
const SIZES = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];
for (const [name, fn] of Object.entries(fav)) {
  save(`${OUT}/svg/favicon-${name}.svg`, fn(false));
  for (const s of SIZES) render(fn(s <= 48), `${OUT}/favicon/${name}/favicon-${name}-${s}.png`, s);
}

// Web-ready set (drop into /public)
const web = `${OUT}/favicon/web-ready`;
const ico = [16, 32, 48].map(s => render(fav['mark-gold'](true), `${web}/favicon-${s}x${s}.png`, s));
render(fav['tile-navy'](false), `${web}/apple-touch-icon.png`, 180);
render(fav['tile-navy'](false), `${web}/android-chrome-192x192.png`, 192);
render(fav['tile-navy'](false), `${web}/android-chrome-512x512.png`, 512);
save(`${web}/favicon.svg`, fav['mark-gold'](false));
// ICO with embedded PNGs
(function writeIco(pngs, sizes, file) {
  const head = Buffer.alloc(6 + 16 * pngs.length);
  head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(pngs.length, 4);
  let off = head.length;
  pngs.forEach((p, i) => {
    const e = 6 + 16 * i, s = sizes[i];
    head.writeUInt8(s >= 256 ? 0 : s, e); head.writeUInt8(s >= 256 ? 0 : s, e + 1);
    head.writeUInt16LE(1, e + 4); head.writeUInt16LE(32, e + 6);
    head.writeUInt32LE(p.length, e + 8); head.writeUInt32LE(off, e + 12); off += p.length;
  });
  fs.writeFileSync(file, Buffer.concat([head, ...pngs]));
})(ico, [16, 32, 48], `${web}/favicon.ico`);
fs.writeFileSync(`${web}/site.webmanifest`, JSON.stringify({
  name: 'Apex Core Oil and Energy Resources Ltd', short_name: 'Apex Core',
  icons: [{ src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }],
  theme_color: C.navy, background_color: C.navy, display: 'standalone',
}, null, 2));

// ---------- PREVIEW SHEET (for review only) ----------
const b64 = f => 'data:image/png;base64,' + fs.readFileSync(`${OUT}/${f}`).toString('base64');
const favNames = Object.keys(fav);
const sheet = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 1500">
  <rect width="800" height="1500" fill="${C.light}"/><rect x="800" width="800" height="1500" fill="${C.navy}"/>
  <image x="60" y="60" width="680" height="190" preserveAspectRatio="xMidYMid meet" href="${b64('logo/apexcore-logo-horizontal-on-light.png')}"/>
  <image x="860" y="60" width="680" height="190" preserveAspectRatio="xMidYMid meet" href="${b64('logo/apexcore-logo-horizontal-on-dark.png')}"/>
  <image x="200" y="300" width="400" height="400" preserveAspectRatio="xMidYMid meet" href="${b64('logo/apexcore-logo-stacked-on-light.png')}"/>
  <image x="1000" y="300" width="400" height="400" preserveAspectRatio="xMidYMid meet" href="${b64('logo/apexcore-logo-stacked-on-dark.png')}"/>
  <image x="60" y="740" width="320" height="100" preserveAspectRatio="xMidYMid meet" href="${b64('logo/apexcore-logo-horizontal-mono-navy.png')}"/>
  <image x="420" y="740" width="320" height="100" preserveAspectRatio="xMidYMid meet" href="${b64('logo/apexcore-logo-horizontal-mono-gold.png')}"/>
  <image x="860" y="740" width="320" height="100" preserveAspectRatio="xMidYMid meet" href="${b64('logo/apexcore-logo-horizontal-mono-white.png')}"/>
  <image x="1220" y="740" width="320" height="100" preserveAspectRatio="xMidYMid meet" href="${b64('logo/apexcore-logo-horizontal-mono-gold.png')}"/>
  ${favNames.map((n, i) => `<image x="${60 + i * 190}" y="900" width="150" height="150" href="${b64(`favicon/${n}/favicon-${n}-512.png`)}"/>`).join('')}
  ${favNames.map((n, i) => [64, 32, 16].map((s, j) => `<image x="${60 + i * 190 + j * 70}" y="${1110}" width="${s}" height="${s}" href="${b64(`favicon/${n}/favicon-${n}-${s}.png`)}"/>`).join('')).join('')}
  ${favNames.map((n, i) => [32, 16].map((s, j) => `<image x="${60 + i * 190 + j * 106}" y="${1220}" width="${s * 3}" height="${s * 3}" style="image-rendering:pixelated" href="${b64(`favicon/${n}/favicon-${n}-${s}.png`)}"/>`).join('')).join('')}
</svg>`;
render(sheet, `${OUT}/apexcore-brand-preview.png`, 1600);
console.log('done');
