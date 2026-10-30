import { box, ellipse, poly, pixel, rng, withAlpha, mix } from './pixel';

export function chicken(c, x, y, t, seed = 1, body = '#f0e9d7', dark = '#c8bda4') {
  const peck = Math.sin(t * 1.7 + seed * 2.1) > 0.7 ? 3 : 0;
  const bob = Math.round(Math.sin(t * 2.3 + seed) * 0.6);
  const X = Math.round(x);
  const Y = Math.round(y + bob);
  ellipse(c, X, y + 1, 7, 2, 'rgba(18,14,8,0.2)');
  ellipse(c, X - 1, Y - 6, 6, 5, body);
  ellipse(c, X - 3, Y - 7, 4, 4, body);
  poly(c, [[X + 4, Y - 9], [X + 10, Y - 13], [X + 9, Y - 5]], dark);
  box(c, X + 3, Y - 13, 3, 6, body);
  ellipse(c, X + 5, Y - 15 - peck, 3, 3, body);
  box(c, X + 7, Y - 15 - peck, 2, 1, '#d8a03e');
  box(c, X + 4, Y - 19 - peck, 2, 2, '#bf5a44');
  pixel(c, X + 4, Y - 20 - peck, '#bf5a44');
  pixel(c, X + 6, Y - 16 - peck, '#241d14');
  box(c, X - 1, Y - 2, 1, 2, '#c9a05a');
  box(c, X + 2, Y - 2, 1, 2, '#c9a05a');
  box(c, X - 4, Y - 4, 5, 1, dark);
}

export function plankWall(c, x, y, w, h, base, dark, light, opts = {}) {
  const step = opts.step || 10;
  const r = rng(opts.seed || 7);
  box(c, x, y, w, h, base);
  if (opts.vertical) {
    for (let i = 0; i < w; i += step) {
      box(c, x + i, y, 1, h, dark);
      if (i + 1 < w) box(c, x + i + 1, y, 1, h, light);
      for (let k = 0; k < 5; k++) {
        const yy = y + r() * (h - 3);
        box(c, x + i + 2, yy, 2 + Math.floor(r() * 3), 1, withAlpha(dark, 0.5));
      }
      if (r() > 0.6) {
        box(c, x + i + 3, y + r() * (h - 6), 1, 3, withAlpha(dark, 0.7));
      }
    }
  } else {
    for (let j = 0; j < h; j += step) {
      box(c, x, y + j, w, 1, dark);
      if (j + 1 < h) box(c, x, y + j + 1, w, 1, light);
      for (let k = 0; k < 7; k++) {
        const xx = x + r() * (w - 3);
        box(c, xx, y + j + 2, 2 + Math.floor(r() * 4), 1, withAlpha(dark, 0.45));
      }
    }
  }
}

export function chapaRoof(c, pts, base, opts = {}) {
  const dark = mix(base, '#000000', 0.22);
  const light = mix(base, '#ffffff', 0.16);
  poly(c, pts, base);
  const minX = Math.min(...pts.map((p) => p[0]));
  const maxX = Math.max(...pts.map((p) => p[0]));
  const ridgeX = pts.length === 3 ? pts[1][0] : minX;
  const ridgeY = pts.length === 3 ? pts[1][1] : pts[0][1];
  const eaveY = pts[0][1];
  const leftX = pts[0][0];
  const rightX = pts[pts.length === 3 ? 2 : 1][0];
  for (let x = minX + 2; x < maxX; x += 4) {
    const t = x <= ridgeX ? (x - leftX) / (ridgeX - leftX || 1) : (rightX - x) / (rightX - ridgeX || 1);
    const top = Math.round(ridgeY + (eaveY - ridgeY) * (1 - t));
    box(c, x, top, 1, eaveY - top + 1, withAlpha(dark, 0.55));
    box(c, x + 1, top, 1, eaveY - top + 1, withAlpha(light, 0.4));
  }
  if (opts.rust) {
    const r = rng(opts.seed || 9);
    for (let i = 0; i < 9; i++) {
      const px0 = polyPointInside(pts, r, minX, maxX, ridgeY, eaveY);
      ellipse(c, px0[0], px0[1], 2 + r() * 3, 1 + r() * 2, withAlpha('#8a5533', 0.45));
    }
  }
  // alero
  box(c, minX, eaveY, maxX - minX, 2, mix(base, '#000000', 0.42));
}

function polyPointInside(pts, r, x0, x1, y0, y1) {
  return [x0 + r() * (x1 - x0), y0 + 4 + r() * (y1 - y0 - 4)];
}

export function hayPile(c, x, y, w, h, seed = 4) {
  const r = rng(seed);
  poly(c, [
    [x, y],
    [x + w * 0.15, y - h],
    [x + w * 0.6, y - h * 0.8],
    [x + w, y - h * 0.3],
    [x + w, y],
  ], '#b99a4e');
  for (let i = 0; i < w * h * 0.12; i++) {
    const px0 = x + r() * w;
    const py0 = y - r() * h * 0.8;
    box(c, px0, py0, 2 + r() * 3, 1, r() > 0.5 ? '#d4b45f' : '#96793c');
  }
}

export function bottle(c, x, y, col = '#4b6b4a') {
  box(c, x + 1, y - 5, 2, 1, withAlpha('#000000', 0.2));
  box(c, x, y - 9, 5, 9, col);
  box(c, x, y - 9, 1, 9, withAlpha('#ffffff', 0.18));
  box(c, x + 1, y - 12, 3, 3, col);
  box(c, x + 1, y - 13, 3, 1, '#9b8f6c');
}

export function plateDirty(c, x, y, seed = 2) {
  const r = rng(seed);
  ellipse(c, x, y, 6, 3, '#cfc7b2');
  ellipse(c, x, y - 1, 5, 2, '#b9b09a');
  for (let i = 0; i < 5; i++) {
    box(c, x - 3 + r() * 6, y - 2 + r() * 2, 1 + r() * 2, 1, '#8a7d5c');
  }
}

export function wireFence(c, x, y, w, h, col = '#8a8478') {
  const step = 5;
  for (let i = 0; i < w; i += step) {
    box(c, x + i, y, 1, h, withAlpha(col, 0.5));
    for (let j = 0; j < h; j += step) {
      box(c, x + i, y + j, step, 1, withAlpha(col, 0.45));
    }
  }
}
