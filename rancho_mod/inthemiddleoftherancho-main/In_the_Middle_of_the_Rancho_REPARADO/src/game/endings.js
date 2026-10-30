export const ENDINGS = {
  amanecer: {
    id: 'amanecer',
    kicker: 'FINAL 1 · EL AMANECER',
    title: 'Cruzás el túnel y salís a la ruta.',
    body: [
      'El túnel no baja: sale. Dos kilómetros de tierra apisonada y de golpe el asfalto, la banquina, el pasto seco. Cuando mirás atrás, el campo está vacío: ni casa, ni silo, ni gallinero. Solo el alambrado.',
      'A las 6:40 pasa el colectivo. Subís, pagás, te sentás adelante. Por primera vez en tres días no escuchás nada abajo.',
    ],
    quote: '—¿Vos también venís del rancho? —pregunta el chofer, mirándote por el espejo retrovisor.',
    footer: 'RUTA 41 · 06:40',
    contrato:
      'El contrato queda en la lata, con tu firma tachada. Si el rancho era la jaula, ahora el que mira desde el alambre sos vos.',
  },
  abuelo: {
    id: 'abuelo',
    kicker: 'FINAL 2 · EL NUEVO ABUELO',
    title: 'Cerrás la puerta desde adentro.',
    body: [
      'Volvés sobre tus pasos y bajás el pasador. El rancho no se enoja: se acomoda. Las paredes se corren un poco, como si aceptara el trato.',
      'Con los años aprendés a servir dos platos. Uno para vos. Uno para el que va a venir.',
    ],
    quote: '«No bajes», te escuchás decir desde abajo, mientras un pibe abre la trampilla del gallinero.',
    footer: 'VEINTE AÑOS DESPUÉS',
    contrato: 'El contrato venció hace mucho. La empresa nunca volvió a preguntar por el rancho.',
  },
  premium: {
    id: 'premium',
    kicker: 'FINAL 3 · EL RANCHO PREMIUM',
    title: 'Firmás el contrato con una birome prestada.',
    body: [
      'Nadie discute: el rancho acepta. Al otro día llegan los albañiles, la luz trifásica, el cartel con letras de plástico y una cuenta de Instagram.',
      'El plato del abuelo sigue apareciendo todas las noches. Lo cobrás como atracción aparte, con foto incluida.',
    ],
    quote: 'RANCHO PARANORMAL · ENTRADA $15.000 · MENORES ACOMPAÑADOS',
    footer: 'TEMPORADA ALTA · LAS LIEBRES',
    contrato:
      'La letra chica dice que la empresa sigue siendo dueña de lo que hay abajo. Vos quedaste de guardia, con guion propio.',
  },
};

export function getEnding(id, flags = {}) {
  const base = ENDINGS[id] || ENDINGS.amanecer;
  const body = flags.contrato && base.contrato ? [...base.body, base.contrato] : base.body;
  return { ...base, body };
}
