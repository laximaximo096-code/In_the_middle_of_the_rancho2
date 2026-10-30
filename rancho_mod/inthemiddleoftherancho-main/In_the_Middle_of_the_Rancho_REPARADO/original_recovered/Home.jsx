import React, { useCallback, useEffect, useRef, useState } from 'react';
import PixelStage from '@/components/game/PixelStage';
import TitleScreen from '@/components/game/TitleScreen';
import Cinematic from '@/components/game/Cinematic';
import Hud from '@/components/game/Hud';
import TaskPanel from '@/components/game/TaskPanel';
import Dialogue from '@/components/game/Dialogue';
import Ending from '@/components/game/Ending';
import Choice from '@/components/game/Choice';
import { ROOMS } from '@/game/rooms';
import { INTRO, NOCHE, DESCENSO, REVELACION } from '@/game/cinematics';
import { getEnding } from '@/game/endings';

const TASKS = [
  { id: 'mate', label: 'Cebar unos mates', place: 'LA COCINA' },
  { id: 'gallinas', label: 'Alimentar a las gallinas', place: 'EL GALLINERO' },
  { id: 'factura', label: 'Revisar la factura de luz', place: 'EL BUZÓN' },
];

const CLUES = [
  { id: 'plato', label: 'El plato servido', place: 'LA COCINA' },
  { id: 'marta', label: 'Hablar con doña Marta', place: 'EL ALAMBRADO' },
  { id: 'pared', label: 'Los nombres de la pared', place: 'EL SÓTANO' },
  { id: 'contrato', label: 'El contrato del abuelo', place: 'EL SÓTANO' },
];

const ROOM_NAMES = {
  patio: 'EL PATIO',
  cocina: 'LA COCINA',
  gallinero: 'EL GALLINERO',
  pieza: 'LA PIEZA',
  sotano: 'EL SÓTANO',
};

export default function Home() {
  const [phase, setPhase] = useState('title');
  const [roomId, setRoomId] = useState('patio');
  const [mode, setMode] = useState('day');
  const [done, setDone] = useState([]);
  const [clues, setClues] = useState([]);
  const [line, setLine] = useState({ who: 'VOS', text: 'Otro martes tranquilo en Las Liebres.' });
  const [endingId, setEndingId] = useState(null);
  const [fade, setFade] = useState(false);
  const heroRef = useRef({ x: 150, target: 150, moving: false, pending: null });

  useEffect(() => {
    if (done.length < TASKS.length || phase !== 'play' || mode === 'night') return undefined;
    const timer = window.setTimeout(() => setPhase('noche'), 1600);
    return () => window.clearTimeout(timer);
  }, [done, phase, mode]);

  const placeHero = (id) => {
    heroRef.current = { x: ROOMS[id].entryX, target: ROOMS[id].entryX, moving: false, pending: null };
  };

  const goTo = useCallback((id) => {
    setFade(true);
    window.setTimeout(() => {
      placeHero(id);
      setRoomId(id);
      setFade(false);
    }, 230);
  }, []);

  const say = useCallback((who, text) => setLine({ who, text }), []);

  const complete = useCallback((taskId, who, text) => {
    setDone((current) => (current.includes(taskId) ? current : [...current, taskId]));
    setLine({ who, text });
  }, []);

  const findClue = useCallback((clueId, who, text) => {
    setClues((current) => (current.includes(clueId) ? current : [...current, clueId]));
    setLine({ who, text });
  }, []);

  const dayAction = useCallback(
    (id) => {
      switch (id) {
        case 'mate':
          complete('mate', 'VOS', 'Amargo y lavado, como corresponde. La pava sigue silbando de fondo.');
          return;
        case 'pileta':
          say('VOS', 'Los platos llevan tres días en la bacha. El agua tiene una película que no pienso tocar.');
          return;
        case 'radio':
          say('TÍO BETO', 'FM 92.7: «cielo parcialmente nublado, vientos del sudoeste». Mañana, más de lo mismo.');
          return;
        case 'plato':
          say('VOS', 'Un plato servido, intacto. El tío dice que es «para el abuelo». El abuelo murió en el 87.');
          return;
        case 'buzon':
          complete('factura', 'VOS', 'SEGUNDO AVISO. Vencimiento: ayer. Importe: mejor no mirar.');
          return;
        case 'gallinas':
          complete('gallinas', 'VOS', 'Las gallinas comen. Una no deja de mirar el piso del gallinero.');
          return;
        case 'trampilla':
          say('VOS', 'Tablones clavados desde adentro. Alguien escribió «NO BAJES» con la uña.');
          return;
        case 'alambrado':
          say('VOS', 'El alambrado tiene un tramo caído. Doña Marta no lo cruza ni muerta, y nunca explica por qué.');
          return;
        case 'cama':
          say('VOS', 'Nadie duerme en esta pieza desde marzo. Pero las sábanas están tibias.');
          return;
        case 'ventana':
          say('VOS', 'Clavada por dentro. Las tablas las puso el tío, dice. No me acuerdo de eso.');
          return;
        case 'espejo':
          say('VOS', 'Hay una sábana encima. Mejor dejarla así.');
          return;
        default:
          return;
      }
    },
    [complete, say]
  );

  const nightAction = useCallback(
    (id) => {
      switch (id) {
        case 'plato':
          findClue(
            'plato',
            'VOS',
            'Un plato servido y todavía tibio. Nadie se sentó a comer. Y del otro lado del alambrado hay un tipo parado, mirando la casa.'
          );
          return;
        case 'alambrado':
          findClue(
            'marta',
            'DOÑA MARTA',
            '«No cruce el alambrado, m\'hijo. De este lado no está el campo: está la copia. Yo hace veinte años que no paso.»'
          );
          return;
        case 'trampilla': {
          const missing = [];
          if (!clues.includes('plato')) missing.push('el plato servido de la cocina');
          if (!clues.includes('marta')) missing.push('doña Marta, del otro lado del alambrado');
          if (missing.length) {
            say('VOS', `La trampilla está abierta y baja. No bajo todavía: me falta ${missing.join(' y ')}.`);
            return;
          }
          setPhase('descenso');
          return;
        }
        case 'gallinas':
          say('VOS', 'Las gallinas están todas mirando la trampilla. Ninguna duerme.');
          return;
        case 'buzon':
          say('VOS', 'Adentro del buzón hay un sobre sin estampilla: «Si te llaman por tu nombre, no contestes».');
          return;
        case 'radio':
          say(
            'TÍO BETO',
            '«No toques la radio, pibe. A esta hora siempre dice lo mismo: cielo cerrado. Y no me preguntes cómo sé que la trampilla da a la ruta.»'
          );
          return;
        case 'mate':
          say('VOS', 'El agua no hierve. La pava está fría y el mate sigue cebado.');
          return;
        case 'pileta':
          say('VOS', 'En la bacha hay dos platos limpios y servidos, esperando. Como todas las noches.');
          return;
        case 'pared':
          findClue('pared', 'VOS', 'Nombres y fechas, todos de la familia. La letra es la misma en todos. Y es la mía.');
          return;
        case 'caja':
          findClue(
            'contrato',
            'VOS',
            'Una lata de galletitas con papeles adentro: el abuelo vendió el rancho a una empresa que estudiaba «universos paralelos». Firmado en el 87.'
          );
          return;
        case 'silla':
          say('VOS', 'La silla mira la puerta. Hay un plato servido en el asiento y una campera colgada. La campera es mía.');
          return;
        case 'puerta':
          if (!clues.includes('pared')) {
            say('VOS', 'La puerta del túnel está abierta. Antes de cruzarla quiero leer los nombres de la pared.');
            return;
          }
          setPhase('revelacion');
          return;
        case 'cama':
          say('VOS', 'La cama está tendida y tibia, con la forma de alguien acostado. Afuera no hay nadie.');
          return;
        case 'ventana':
          say('VOS', 'Corrí las tablas. La ventana da al patio. Pero el patio de la ventana tiene otro árbol.');
          return;
        case 'espejo':
          say('VOS', 'La sábana está corrida. En el espejo hay alguien parado detrás mío. Cuando me doy vuelta, no hay nadie.');
          return;
        default:
          return;
      }
    },
    [clues, findClue, say]
  );

  const handleAction = useCallback(
    (id) => {
      if (id === 'patio' || id === 'cocina' || id === 'gallinero' || id === 'pieza' || id === 'sotano') {
        goTo(id);
        return;
      }
      if (id === 'escalera') {
        goTo('gallinero');
        return;
      }
      if (mode === 'day') dayAction(id);
      else nightAction(id);
    },
    [dayAction, goTo, mode, nightAction]
  );

  const startPlay = () => {
    placeHero('patio');
    setRoomId('patio');
    setMode('day');
    setDone([]);
    setClues([]);
    setLine({ who: 'VOS', text: 'Otro martes tranquilo en Las Liebres. Mejor arranco con lo de todos los días.' });
    setPhase('play');
  };

  const startNight = () => {
    placeHero('gallinero');
    setRoomId('gallinero');
    setMode('night');
    setLine({
      who: 'VOS',
      text: 'Se cortó la luz. La trampilla está abierta y abajo algo arrastra. Antes de bajar quiero ver el plato de la cocina y a Marta.',
    });
    setPhase('play');
  };

  const startSotano = () => {
    placeHero('sotano');
    setRoomId('sotano');
    setMode('night');
    setLine({ who: 'VOS', text: 'Estoy abajo. La puerta del túnel está abierta y hay una silla mirándola.' });
    setPhase('play');
  };

  const chooseEnding = (id) => {
    setEndingId(id);
    setPhase('ending');
  };

  const restart = () => {
    setDone([]);
    setClues([]);
    setEndingId(null);
    setMode('day');
    setRoomId('patio');
    placeHero('patio');
    setLine({ who: 'VOS', text: 'Otro martes tranquilo en Las Liebres.' });
    setPhase('title');
  };

  const scene = phase === 'play' || phase === 'decision' || phase === 'ending';
  const night = mode === 'night';
  const alambre = clues.length > 0;

  const decisions = [
    {
      id: 'amanecer',
      label: 'Cruzar el túnel y salir a la ruta',
      note: 'No mirar atrás. No volver por el plato.',
    },
    {
      id: 'abuelo',
      label: 'Cerrar la puerta desde adentro',
      note: 'Que el rancho no elija a otro. Que no baje nadie más.',
    },
    {
      id: 'premium',
      label: 'Firmar el contrato y quedarte con el rancho',
      note: 'Abrirlo al turismo.',
      locked: !clues.includes('contrato'),
      lockedNote: 'Falta el contrato: revisá la lata del sótano',
    },
  ];

  return (
    <div className="rancho-shell flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-[1160px] flex-col items-center gap-2 px-2 py-3 sm:gap-3 sm:px-6 sm:py-7">
        <div className="stage-frame grain">
          {phase === 'title' && <TitleScreen onStart={() => setPhase('intro')} />}
          {phase === 'intro' && <Cinematic shots={INTRO} onFinish={startPlay} />}
          {phase === 'noche' && <Cinematic shots={NOCHE} onFinish={startNight} />}
          {phase === 'descenso' && <Cinematic shots={DESCENSO} onFinish={startSotano} />}
          {phase === 'revelacion' && <Cinematic shots={REVELACION} onFinish={() => setPhase('decision')} />}

          {scene && (
            <>
              <PixelStage
                room={ROOMS[roomId]}
                mode={mode}
                heroRef={heroRef}
                onAction={handleAction}
                interactive={phase === 'play'}
                flags={{ alambre }}
              />
              <Hud
                clock={night ? (roomId === 'sotano' ? '03:44' : '03:17') : '07:42'}
                date="MARTES · 16 OCT 2007"
                place={ROOM_NAMES[roomId]}
                night={night}
              />
              <TaskPanel tasks={night ? CLUES : TASKS} done={night ? clues : done} title={night ? 'PISTAS' : 'COSAS PARA HOY'} />
              <Dialogue who={line.who} text={line.text} />
            </>
          )}

          <div
            className={`pointer-events-none absolute inset-0 z-30 bg-black transition-opacity duration-200 ${
              fade ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <div className="scanlines-layer" />

          {phase === 'decision' && (
            <Choice
              title="La puerta espera. Elegí."
              subtitle="El rancho no está embrujado: está en un ciclo. Cada uno que bajó acá eligió algo distinto."
              options={decisions}
              onChoose={chooseEnding}
            />
          )}
          {phase === 'ending' && (
            <Ending ending={getEnding(endingId, { contrato: clues.includes('contrato') })} onRestart={restart} />
          )}
        </div>

        <div className="flex w-full items-center justify-between px-1">
          <p className="font-mono text-[6px] tracking-[0.3em] text-stone-600 sm:text-[7px]">
            HACÉ CLIC EN LO QUE QUIERAS MIRAR
          </p>
          <p className="hidden font-display text-[11px] italic text-stone-600 sm:block">
            Las Liebres no figura en los mapas nuevos.
          </p>
        </div>
      </div>
    </div>
  );
}
