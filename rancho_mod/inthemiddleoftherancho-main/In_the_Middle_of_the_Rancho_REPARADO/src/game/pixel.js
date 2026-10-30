export const VW = 384;
export const VH = 216;

export const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
export const lerp = (a, b, t) => a + (b - a) * t;
export const smooth = (t) => t * t * (3 - 2 * t);

export function rng(seed = 1) {
  let a = (seed || 1) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const hexCache = new Map();
export function rgb(hex) {
  let v = hexCache.get(hex);
  if (v) return v;
  const n = parseInt(hex.slice(1), 16);
  v = [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  hexCache.set(hex, v);
  return v;
}

const strCache = new Map();
function cssStr(r, g, b) {
  const k = (r << 16) | (g << 8) | b;
  let s = strCache.get(k);
  if (!s) {
    s = `rgb(${r},${g},${b})`;
    strCache.set(k, s);
  }
  return s;
}

export function mix(a, b, t) {
  const A = rgb(a);
  const B = rgb(b);
  const k = clamp(t, 0, 1);
  return cssStr(
    Math.round(A[0] + (B[0] - A[0]) * k),
    Math.round(A[1] + (B[1] - A[1]) * k),
    Math.round(A[2] + (B[2] - A[2]) * k)
  );
}

export function shade(hex, k) {
  return k < 0 ? mix(hex, '#000000', -k) : mix(hex, '#ffffff', k);
}

export function withAlpha(hex, a) {
  const [r, g, b] = rgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

export function box(c, x, y, w, h, col) {
  if (w <= 0 || h <= 0) return;
  c.fillStyle = col;
  c.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

export function pixel(c, x, y, col) {
  c.fillStyle = col;
  c.fillRect(Math.round(x), Math.round(y), 1, 1);
}

export function rectOutline(c, x, y, w, h, col) {
  box(c, x, y, w, 1, col);
  box(c, x, y + h - 1, w, 1, col);
  box(c, x, y, 1, h, col);
  box(c, x + w - 1, y, 1, h, col);
}

export function circle(c, cx, cy, r, col) {
  c.fillStyle = col;
  for (let dy = -r; dy <= r; dy++) {
    const dx = Math.floor(Math.sqrt(Math.max(0, r * r - dy * dy)));
    c.fillRect(Math.round(cx - dx), Math.round(cy + dy), dx * 2 + 1, 1);
  }
}

export function ellipse(c, cx, cy, rx, ry, col) {
  if (rx <= 0 || ry <= 0) return;
  c.fillStyle = col;
  for (let dy = -ry; dy <= ry; dy++) {
    const k = 1 - (dy * dy) / (ry * ry);
    const dx = Math.floor(rx * Math.sqrt(Math.max(0, k)));
    c.fillRect(Math.round(cx - dx), Math.round(cy + dy), dx * 2 + 1, 1);
  }
}

export function poly(c, pts, col) {
  c.fillStyle = col;
  let minY = Infinity;
  let maxY = -Infinity;
  for (const p of pts) {
    if (p[1] < minY) minY = p[1];
    if (p[1] > maxY) maxY = p[1];
  }
  for (let y = Math.floor(minY); y <= Math.ceil(maxY); y++) {
    const xs = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      if ((a[1] <= y && b[1] > y) || (b[1] <= y && a[1] > y)) {
        xs.push(a[0] + ((y - a[1]) / (b[1] - a[1])) * (b[0] - a[0]));
      }
    }
    xs.sort((p, q) => p - q);
    for (let i = 0; i + 1 < xs.length; i += 2) {
      const x0 = Math.round(xs[i]);
      const x1 = Math.round(xs[i + 1]);
      if (x1 > x0) c.fillRect(x0, y, x1 - x0, 1);
    }
  }
}

function gradAt(stops, t) {
  let i = 0;
  while (i < stops.length - 2 && t > stops[i + 1][0]) i++;
  const a = stops[i];
  const b = stops[i + 1];
  const span = b[0] - a[0] || 1;
  return mix(a[1], b[1], clamp((t - a[0]) / span, 0, 1));
}

export function vGrad(c, x, y, w, h, stops) {
  x = Math.round(x);
  y = Math.round(y);
  w = Math.round(w);
  h = Math.round(h);
  for (let j = 0; j < h; j++) {
    c.fillStyle = gradAt(stops, h <= 1 ? 0 : j / (h - 1));
    c.fillRect(x, y + j, w, 1);
  }
}

export function hGrad(c, x, y, w, h, stops) {
  x = Math.round(x);
  y = Math.round(y);
  w = Math.round(w);
  h = Math.round(h);
  for (let i = 0; i < w; i++) {
    c.fillStyle = gradAt(stops, w <= 1 ? 0 : i / (w - 1));
    c.fillRect(x + i, y, 1, h);
  }
}

const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];

export function dither(c, x, y, w, h, c1, c2, level = 0.5) {
  x = Math.round(x);
  y = Math.round(y);
  for (let j = 0; j < h; j++) {
    for (let i = 0; i < w; i++) {
      const th = (BAYER[(y + j) & 3][(x + i) & 3] + 0.5) / 16;
      c.fillStyle = level > th ? c2 : c1;
      c.fillRect(x + i, y + j, 1, 1);
    }
  }
}

export function speckle(c, x, y, w, h, colors, count, seed = 3) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    c.fillStyle = colors[Math.floor(r() * colors.length)];
    c.fillRect(x + Math.floor(r() * w), y + Math.floor(r() * h), 1, 1);
  }
}

export function blotch(c, cx, cy, rx, ry, col, seed = 1, count = 7) {
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const ex = rx * (0.35 + r() * 0.65);
    const ey = ry * (0.35 + r() * 0.65);
    ellipse(c, cx + (r() - 0.5) * rx * 1.2, cy + (r() - 0.5) * ry * 1.2, ex, ey, col);
  }
}

export function crack(c, x, y, len, col, seed = 5, dir = 1) {
  const r = rng(seed);
  let cx = x;
  let cy = y;
  for (let i = 0; i < len; i++) {
    pixel(c, cx, cy, col);
    cy += 1;
    if (r() > 0.55) cx += dir;
    if (r() > 0.85) cx -= dir;
    if (r() > 0.9) {
      pixel(c, cx + dir, cy, col);
    }
  }
}

// Punto de luz cálida con caída suave dibujada en bandas.
export function glow(c, cx, cy, radius, col, strength = 0.55, steps = 7) {
  for (let i = steps; i > 0; i--) {
    const k = i / steps;
    c.fillStyle = withAlpha(col, strength * (1 - k) + 0.02);
    circle(c, cx, cy, Math.max(1, Math.round(radius * k)), c.fillStyle);
  }
}
