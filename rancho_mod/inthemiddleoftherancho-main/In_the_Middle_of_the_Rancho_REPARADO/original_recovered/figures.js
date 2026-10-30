// Figuras humanas del juego: siluetas dibujadas píxel por píxel.
import { box, pixel, ellipse, poly, withAlpha, glow } from './pixel';

// El Hombre del Alambre: inmóvil, apenas más alto que un poste, envuelto en hilos.
export function alambreMan(c, x, y, t, opts = {}) {
  const h = opts.h || 34;
  const k = h / 34;
  const X = Math.round(x);
  const Y = Math.round(y);
  const dark = opts.color || '#0a0a0d';
  const rim = opts.rim || '#7f8798';

  ellipse(c, X, Y, Math.max(3, Math.round(7 * k)), 1, withAlpha('#000000', 0.32));
  // piernas
  box(c, X - 2 * k, Y - 12 * k, Math.max(1, Math.round(1.6 * k)), 12 * k, dark);
  box(c, X + 1.2 * k, Y - 12 * k, Math.max(1, Math.round(1.6 * k)), 12 * k, dark);
  // saco largo
  poly(c, [
    [X - 6 * k, Y - 10 * k],
    [X + 6 * k, Y - 10 * k],
    [X + 5 * k, Y - 25 * k],
    [X - 5 * k, Y - 25 * k],
  ], dark);
  // brazos pegados al cuerpo
  box(c, X - 7.2 * k, Y - 24 * k, Math.max(1, Math.round(1.8 * k)), 13 * k, dark);
  box(c, X + 5.4 * k, Y - 24 * k, Math.max(1, Math.round(1.8 * k)), 13 * k, dark);
  // cuello y cabeza, apenas inclinada
  box(c, X - 1 * k, Y - 27 * k, Math.max(1, Math.round(2 * k)), 3 * k, dark);
  ellipse(c, X + 0.6 * k, Y - 29 * k, 3.2 * k, 3.4 * k, dark);
  // hilos de alambre
  c.fillStyle = withAlpha(rim, 0.2);
  for (let i = 0; i < 5; i++) {
    const a = i / 5;
    const len = Math.round(13 * k);
    for (let s = 0; s < len; s++) {
      const off = Math.sin(s * 0.45 + a * 6 + t * 0.3) * (1 + s * 0.25);
      c.fillRect(Math.round(X - 6 * k + a * 12 * k + off), Math.round(Y - 24 * k + s), 1, 1);
    }
  }
  box(c, X - 6 * k, Y - 25 * k, Math.round(12 * k), 1, withAlpha(rim, 0.14));
  // dos reflejos donde irían los ojos
  const blink = Math.max(0, Math.sin(t * 0.6 + 1.2));
  if (blink > 0.55) {
    const a = (blink - 0.55) / 0.45;
    pixel(c, Math.round(X), Math.round(Y - 29 * k), withAlpha('#e9eef8', 0.5 * a));
    pixel(c, Math.round(X + 1.8 * k), Math.round(Y - 29 * k), withAlpha('#e9eef8', 0.5 * a));
  }
  glow(c, X, Y - 29 * k, Math.max(2, 5 * k), '#aab6cc', 0.05, 3);
}

// Doña Marta: la almacenera, plantada del lado de acá del alambrado con su farol.
export function marta(c, x, y, t, opts = {}) {
  const X = Math.round(x);
  const Y = Math.round(y);
  const dress = opts.day ? '#3f3f4c' : '#26262e';
  const apron = opts.day ? '#c3bca8' : '#8e897a';
  const skin = opts.day ? '#c99f7a' : '#a98a6c';
  const scarf = opts.day ? '#9c4f4a' : '#6b3a3a';

  ellipse(c, X, Y, 8, 2, withAlpha('#000000', 0.3));
  poly(c, [[X - 8, Y], [X + 8, Y], [X + 5, Y - 18], [X - 5, Y - 18]], dress);
  poly(c, [[X - 4, Y - 1], [X + 4, Y - 1], [X + 3, Y - 17], [X - 3, Y - 17]], apron);
  box(c, X - 4, Y - 26, 9, 9, dress);
  box(c, X - 6, Y - 23, 3, 8, dress);
  box(c, X + 4, Y - 23, 3, 8, dress);
  box(c, X - 4, Y - 19, 9, 2, apron);
  ellipse(c, X, Y - 29, 4, 4, scarf);
  ellipse(c, X, Y - 27, 3, 3, skin);
  pixel(c, X - 1, Y - 28, '#2a2020');
  pixel(c, X + 1, Y - 28, '#2a2020');
  // farol
  box(c, X + 6, Y - 15, 5, 7, '#3b3830');
  box(c, X + 7, Y - 14, 3, 5, '#f5cf7e');
  box(c, X + 7, Y - 16, 3, 1, withAlpha('#ffe6b0', 0.8));
  const f = 0.85 + 0.15 * Math.sin(t * 3 + 1);
  glow(c, X + 8, Y - 11, 18, '#ffca76', 0.24 * f, 5);
}

// El plato que alguien deja servido todas las noches.
export function plateServed(c, x, y) {
  const X = Math.round(x);
  const Y = Math.round(y);
  ellipse(c, X, Y, 10, 3, withAlpha('#000000', 0.3));
  ellipse(c, X, Y - 1, 10, 4, '#e0d9c6');
  ellipse(c, X, Y - 2, 8, 3, '#cfc7b2');
  ellipse(c, X - 1, Y - 3, 5, 2, '#8a5f3a');
  ellipse(c, X - 2, Y - 4, 3, 1, '#a2713f');
  box(c, X + 3, Y - 4, 3, 1, '#6d7a4a');
  // tenedor
  box(c, X + 10, Y - 5, 1, 6, '#a8a294');
  for (let i = 0; i < 3; i++) box(c, X + 9 + i, Y - 7, 1, 2, '#a8a294');
  glow(c, X, Y - 4, 16, '#ffca76', 0.08, 4);
}
