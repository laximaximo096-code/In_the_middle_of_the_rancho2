import { VW, VH, withAlpha, poly, rng, clamp } from './pixel';

export function dust(c, t, opts = {}) {
  const {
    x = 0, y = 0, w = VW, h = VH, count = 26, color = '#fff3d0', seed = 11, speed = 7, alpha = 0.65,
  } = opts;
  const r = rng(seed);
  for (let i = 0; i < count; i++) {
    const px0 = r();
    const py0 = r();
    const sp = 0.3 + r() * 0.8;
    const dx = (px0 * w + t * speed * sp * 0.4 + Math.sin(t * 0.4 + i) * 6 + w) % w;
    const dy = (py0 * h - t * speed * 0.28 * sp + Math.sin(t * 0.8 + i) * 2.4 + h * 3) % h;
    const pulse = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.6 + i * 1.7));
    c.fillStyle = withAlpha(color, clamp(pulse * alpha, 0, 1));
    c.fillRect(Math.round(x + dx), Math.round(y + dy), 1, 1);
  }
}

export function steam(c, x, y, t, opts = {}) {
  const { height = 34, spread = 4, color = '#efe9dd', density = 7, speed = 0.22 } = opts;
  for (let i = 0; i < density; i++) {
    const p = (t * speed + i / density) % 1;
    const xx = x + Math.sin(p * 6 + i * 2.3 + t * 0.8) * spread * p;
    const yy = y - p * height;
    const a = (1 - p) * 0.55 * (p < 0.12 ? p / 0.12 : 1);
    const w = 1 + Math.round(p * 2.4);
    c.fillStyle = withAlpha(color, a);
    c.fillRect(Math.round(xx), Math.round(yy), w, 1);
    if (p > 0.55) {
      c.fillStyle = withAlpha(color, a * 0.5);
      c.fillRect(Math.round(xx) + w, Math.round(yy), 1, 1);
    }
  }
}

export function smoke(c, x, y, t, opts = {}) {
  const { height = 46, spread = 7, color = '#b9b2a4', density = 9 } = opts;
  for (let i = 0; i < density; i++) {
    const p = (t * 0.13 + i / density) % 1;
    const xx = x + Math.sin(p * 4 + i + t * 0.3) * spread * p * 1.6;
    const yy = y - p * height;
    const w = 1 + Math.round(p * 4);
    c.fillStyle = withAlpha(color, (1 - p) * 0.4);
    c.fillRect(Math.round(xx), Math.round(yy), w, 1);
    c.fillRect(Math.round(xx) + 1, Math.round(yy) + 1, w, 1);
  }
}

export function fly(c, cx, cy, t, rad = 10, seed = 1, col = '#221d18') {
  const x = cx + Math.sin(t * 2.6 + seed) * rad + Math.sin(t * 5.1 + seed * 2) * rad * 0.25;
  const y = cy + Math.cos(t * 3.2 + seed * 1.7) * rad * 0.55;
  c.fillStyle = withAlpha(col, 0.28);
  c.fillRect(Math.round(x) - 1, Math.round(y) - 1, 2, 1);
  c.fillStyle = withAlpha(col, 0.92);
  c.fillRect(Math.round(x), Math.round(y), 1, 1);
}

export function flicker(t, seed = 3) {
  const n = Math.sin(t * 9.3 + seed) * 0.5 + Math.sin(t * 23.7 + seed * 2.1) * 0.35;
  const dip = Math.sin(t * 1.31 + seed * 0.7) > 0.93 ? 0.4 : 1;
  return (0.82 + 0.18 * n) * dip;
}

export function beam(c, x0, y0, x1, y1, w0, w1, col, a1 = 0.13, a2 = 0.09) {
  const dx = x1 - x0;
  const dy = y1 - y0;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  const quad = (k) => [
    [x0 + nx * w0 * k, y0 + ny * w0 * k],
    [x0 - nx * w0 * k, y0 - ny * w0 * k],
    [x1 - nx * w1 * k, y1 - ny * w1 * k],
    [x1 + nx * w1 * k, y1 + ny * w1 * k],
  ];
  c.fillStyle = withAlpha(col, a1);
  poly(c, quad(1), c.fillStyle);
  c.fillStyle = withAlpha(col, a2 + 0.04);
  poly(c, quad(0.5), c.fillStyle);
}

export function cobweb(c, x, y, size, col, seed = 2) {
  const r = rng(seed);
  c.fillStyle = withAlpha(col, 0.55);
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 2 / 5) * i;
    const ex = x + Math.cos(a) * size;
    const ey = y + Math.sin(a) * size;
    const steps = Math.max(3, Math.round(size));
    for (let s = 0; s <= steps; s++) {
      const k = s / steps;
      c.fillRect(Math.round(x + (ex - x) * k), Math.round(y + (ey - y) * k), 1, 1);
    }
  }
  for (let ring = 1; ring <= 3; ring++) {
    const rad = (size / 3.4) * ring;
    const a0 = 0.02 + r() * 0.05;
    for (let i = 0; i < 7; i++) {
      const a = a0 + ((Math.PI / 2) / 7) * i;
      c.fillRect(Math.round(x + Math.cos(a) * rad), Math.round(y + Math.sin(a) * rad), 1, 1);
    }
  }
}

export function curtain(c, x, y, w, h, t, col, phase = 0) {
  for (let j = 0; j < h; j++) {
    const off = Math.sin(t * 1.1 + j * 0.16 + phase) * (0.6 + j / h) * 1.6;
    for (let i = 0; i < w; i++) {
      const fold = Math.sin((i / w) * Math.PI * 3 + phase) > 0.1;
      c.fillStyle = fold ? col : withAlpha(col, 0.55);
      c.fillRect(Math.round(x + i + off), Math.round(y + j), 1, 1);
    }
  }
}
