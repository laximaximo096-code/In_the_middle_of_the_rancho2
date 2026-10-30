import { box, ellipse, pixel, withAlpha } from './pixel';

const SKIN = '#c8925f';
const SKIN_D = '#9c6b43';
const SKIN_L = '#e0b083';
const SHIRT = '#4d6461';
const SHIRT_D = '#354846';
const SHIRT_L = '#647e79';
const PANTS = '#3d3d47';
const PANTS_D = '#2b2b34';
const BOOT = '#2d2219';
const HAT = '#6f5c3e';
const HAT_D = '#4b3e29';
const HAT_L = '#8a7450';
const INK = '#20190f';

function leg(c, x, y, lift) {
  box(c, x, y - 12 + lift, 4, 9 - lift, PANTS);
  box(c, x, y - 12 + lift, 1, 9 - lift, PANTS_D);
  box(c, x - 1, y - 3 + lift, 6, 3, BOOT);
  box(c, x - 1, y - 3 + lift, 6, 1, '#3f3125');
  pixel(c, x + 4, y - 3 + lift, INK);
}

function arm(c, x, y, swing) {
  box(c, x, y + swing, 2, 8, SHIRT_D);
  box(c, x, y + swing, 1, 8, SHIRT);
  box(c, x, y + 8 + swing, 2, 2, SKIN);
  box(c, x, y + 9 + swing, 2, 1, SKIN_D);
}

export function drawHero(c, x, y, t, opts = {}) {
  const { moving = false } = opts;
  const walk = moving ? Math.sin(t * 10) : 0;
  const bob = moving ? Math.round(Math.abs(Math.sin(t * 10))) : 0;
  const X = Math.round(x);
  const Y = Math.round(y - bob);

  ellipse(c, X, y + 1, 9, 2, 'rgba(20,16,10,0.26)');

  const lift = moving ? Math.round(Math.abs(walk) * 2) : 0;
  leg(c, X - 6, Y, moving ? lift : 0);
  leg(c, X + 2, Y, moving ? 2 - lift : 0);

  // torso
  box(c, X - 5, Y - 23, 10, 12, SHIRT);
  box(c, X - 5, Y - 23, 2, 12, SHIRT_D);
  box(c, X + 3, Y - 23, 2, 12, SHIRT_L);
  box(c, X - 5, Y - 23, 10, 1, SHIRT_L);
  box(c, X - 5, Y - 12, 10, 1, SHIRT_D);
  box(c, X - 1, Y - 23, 1, 11, SHIRT_D);
  pixel(c, X - 4, Y - 18, '#2b3b39');
  pixel(c, X - 4, Y - 15, '#2b3b39');
  pixel(c, X + 4, Y - 24, SHIRT_L);

  const sw = Math.round(walk * 2);
  arm(c, X - 7, Y - 22 + sw, 0);
  arm(c, X + 5, Y - 22 - sw, 0);

  // cuello y cabeza
  box(c, X - 2, Y - 25, 4, 2, SKIN_D);
  box(c, X - 4, Y - 32, 8, 8, SKIN);
  box(c, X - 4, Y - 32, 2, 8, SKIN_D);
  box(c, X + 3, Y - 32, 1, 8, SKIN_L);
  box(c, X - 4, Y - 32, 8, 1, SKIN_L);
  box(c, X - 2, Y - 25, 4, 1, SKIN_D);
  pixel(c, X - 2, Y - 29, INK);
  pixel(c, X + 2, Y - 29, INK);
  pixel(c, X - 3, Y - 30, SKIN_D);
  pixel(c, X + 3, Y - 30, SKIN_L);
  box(c, X - 1, Y - 26, 3, 1, SKIN_D);

  // sombrero
  box(c, X - 8, Y - 34, 17, 2, HAT);
  box(c, X - 8, Y - 34, 17, 1, HAT_L);
  box(c, X - 8, Y - 33, 17, 1, HAT_D);
  box(c, X - 5, Y - 39, 10, 5, HAT);
  box(c, X - 5, Y - 39, 2, 5, HAT_D);
  box(c, X + 3, Y - 39, 2, 5, HAT_L);
  box(c, X - 5, Y - 39, 10, 1, HAT_L);
  box(c, X - 5, Y - 35, 10, 1, HAT_D);
  pixel(c, X + 4, Y - 38, withAlpha('#000000', 0.25));
}
