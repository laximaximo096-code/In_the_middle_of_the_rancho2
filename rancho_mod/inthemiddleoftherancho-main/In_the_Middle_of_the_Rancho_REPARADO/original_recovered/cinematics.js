// Guiones de las cinemáticas. La cámara se mueve dentro de los escenarios reales.
export const INTRO = [
  {
    room: 'patio',
    mode: 'day',
    dur: 8200,
    from: { x: 0, y: 0, zoom: 2 },
    to: { x: 192, y: 0, zoom: 2 },
    lines: [
      { at: 200, who: '', text: 'PROVINCIA DE BUENOS AIRES · 2007' },
      { at: 2200, who: '', text: 'Martes, 07:31. El campo amanece tarde y sin apuro.' },
      { at: 5200, who: 'VOS', text: 'Otro día igual a todos los otros.' },
    ],
  },
  {
    room: 'cocina',
    mode: 'day',
    dur: 9000,
    from: { x: 10, y: 24, zoom: 2 },
    to: { x: 62, y: 30, zoom: 2 },
    lines: [
      { at: 300, who: '', text: 'La pava silba desde hace rato.' },
      { at: 2400, who: 'TÍO BETO', text: 'Si el cinco no me pegaba de atrás, hoy estaba jugando en Primera.' },
      { at: 6200, who: 'VOS', text: 'Ajá... ¿querés otro mate?' },
    ],
  },
  {
    room: 'cocina',
    mode: 'day',
    dur: 6200,
    from: { x: 118, y: 92, zoom: 2 },
    to: { x: 104, y: 84, zoom: 2 },
    lines: [
      { at: 0, who: 'TÍO BETO', text: 'Cebá vos. Yo tengo las manos llenas de grasa.' },
      { at: 3600, who: '', text: 'Afuera el viento empuja la tierra contra las chapas.' },
    ],
  },
  {
    room: 'patio',
    mode: 'day',
    dur: 7000,
    from: { x: 172, y: 54, zoom: 2 },
    to: { x: 188, y: 44, zoom: 2 },
    lines: [
      { at: 0, who: '', text: 'EL GALLINERO' },
      { at: 1600, who: '', text: 'Las gallinas te miran. Después de un rato, todas miran el suelo.' },
      { at: 4600, who: 'VOS', text: 'Mejor empiezo por lo de todos los días.' },
    ],
  },
];

export const NOCHE = [
  {
    room: 'cocina',
    mode: 'day',
    dur: 5200,
    from: { x: 208, y: 0, zoom: 2 },
    to: { x: 196, y: 4, zoom: 2 },
    lines: [{ at: 0, who: '', text: 'El foco parpadea una vez. Después dos.' }],
  },
  {
    room: 'cocina',
    mode: 'night',
    dur: 5600,
    from: { x: 0, y: 0, zoom: 1 },
    to: { x: 0, y: 0, zoom: 1 },
    fadeIn: true,
    lines: [
      { at: 0, who: '', text: '03:17 · SE CORTÓ LA LUZ' },
      { at: 2200, who: 'VOS', text: 'Tío... ¿escuchaste eso?' },
    ],
  },
  {
    room: 'patio',
    mode: 'night',
    dur: 7600,
    from: { x: 132, y: 0, zoom: 1 },
    to: { x: 168, y: 0, zoom: 1 },
    lines: [
      { at: 0, who: '', text: 'El viento se quedó quieto de golpe.' },
      { at: 2800, who: '', text: 'Tres golpes. Abajo del gallinero. Como si alguien contestara.' },
    ],
  },
  {
    room: 'gallinero',
    mode: 'night',
    dur: 8600,
    from: { x: 92, y: 50, zoom: 2 },
    to: { x: 106, y: 62, zoom: 2 },
    lines: [
      { at: 0, who: '', text: 'La trampilla está abierta. Vos no la abriste.' },
      { at: 3600, who: '', text: 'Alguien escribió abajo, con uña: «NO BAJES».' },
    ],
  },
];

export const DESCENSO = [
  {
    room: 'gallinero',
    mode: 'night',
    dur: 6200,
    from: { x: 96, y: 40, zoom: 2 },
    to: { x: 100, y: 58, zoom: 2 },
    lines: [
      { at: 0, who: '', text: 'La trampilla se abre hacia adentro.' },
      { at: 2400, who: '', text: 'Abajo no hay oscuridad. Hay un pasillo.' },
    ],
  },
  {
    room: 'sotano',
    mode: 'night',
    dur: 7000,
    from: { x: 0, y: 0, zoom: 1 },
    to: { x: 16, y: 6, zoom: 1 },
    fadeIn: true,
    lines: [
      { at: 0, who: '', text: 'La escalera baja más de lo que debería.' },
      { at: 2600, who: 'VOS', text: 'Huele a tierra. Y a comida recién hecha.' },
    ],
  },
  {
    room: 'sotano',
    mode: 'night',
    dur: 7600,
    from: { x: 108, y: 60, zoom: 2 },
    to: { x: 150, y: 92, zoom: 2 },
    lines: [
      { at: 0, who: '', text: 'Una silla mirando la puerta. Una campera. Un plato servido.' },
      { at: 3400, who: '', text: 'Y en la pared, más nombres de los que hay en la familia.' },
    ],
  },
];

export const REVELACION = [
  {
    room: 'sotano',
    mode: 'night',
    dur: 7200,
    from: { x: 104, y: 44, zoom: 2 },
    to: { x: 118, y: 52, zoom: 2 },
    lines: [
      { at: 0, who: '', text: 'Los nombres son de la familia. La letra es la misma. Y siempre hay uno tachado.' },
      { at: 3200, who: 'VOS', text: 'El tachado soy yo. Está escrito antes de que llegue.' },
    ],
  },
  {
    room: 'sotano',
    mode: 'night',
    dur: 6800,
    from: { x: 128, y: 58, zoom: 2 },
    to: { x: 176, y: 76, zoom: 2 },
    lines: [
      { at: 0, who: 'ABUELO', text: '«No es un sótano, pibe. Es la puerta. Yo la abrí primero y no volví.»' },
      { at: 3600, who: '', text: 'La voz viene de abajo del piso. O de adentro de tu cabeza.' },
    ],
  },
  {
    room: 'patio',
    mode: 'night',
    dur: 7400,
    flags: { alambre: true },
    from: { x: 0, y: 96, zoom: 2 },
    to: { x: 22, y: 108, zoom: 2 },
    lines: [
      { at: 0, who: '', text: 'En el alambrado hay un tipo parado. No se movió en toda la noche.' },
      { at: 3400, who: 'HOMBRE DEL ALAMBRE', text: '«Yo salí. Y volví sin saber quién era. Elegí vos.»' },
    ],
  },
  {
    room: 'sotano',
    mode: 'night',
    dur: 7800,
    from: { x: 176, y: 44, zoom: 2 },
    to: { x: 196, y: 58, zoom: 2 },
    lines: [
      { at: 0, who: '', text: 'El rancho no está embrujado: está en un ciclo. Cada tanto alguien baja y el lugar lo obliga a repetir todo.' },
      { at: 4200, who: 'VOS', text: 'La puerta está abierta. La decisión es mía.' },
    ],
  },
];

export function shotAt(shots, index) {
  return shots[Math.min(index, shots.length - 1)];
}

export function camAt(shot, p) {
  const e = p * p * (3 - 2 * p);
  return {
    x: shot.from.x + (shot.to.x - shot.from.x) * e,
    y: shot.from.y + (shot.to.y - shot.from.y) * e,
    zoom: shot.from.zoom + (shot.to.zoom - shot.from.zoom) * e,
  };
}
