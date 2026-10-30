import React, { useCallback, useEffect, useRef, useState } from 'react';
import PixelStage from './components/game/PixelStage';
import TitleScreen from './components/game/TitleScreen';
import Hud from './components/game/Hud';
import TaskPanel from './components/game/TaskPanel';
import Dialogue from './components/game/Dialogue';
import Ending from './components/game/Ending';
import Choice from './components/game/Choice';
import { ROOMS } from './game/rooms';
import { getEnding } from './game/endings';

const ROOM_NAMES = {
  patio: 'EL PATIO',
  cocina: 'LA COCINA',
  gallinero: 'EL GALLINERO',
  pieza: 'LA PIEZA',
  sotano: 'EL SÓTANO',
};

const VISITORS = [
  { name: 'DON ERNESTO, EL VECINO', detail: 'Un hombre mayor, empapado. Dice que se quedó sin combustible.', open: '«Buenas... ¿me dejaría pasar un minuto? En mi casa se escucha gente caminando, pero estoy solo.»', shut: 'Del otro lado, el hombre se queda quieto. «Está bien. Pero no se quede mirando las ventanas esta noche.»' },
  { name: 'UNA MUJER DESCONOCIDA', detail: 'Una mujer con ropa de dormir. No parece tener frío, aunque tiembla.', open: '«¿Usted también escucha la radio? Dice que el apagón va a durar tres días. Pero ya van cinco.»', shut: '«No soy yo la que está golpeando», susurra. Después escuchás pasos alejándose... y otros que se quedan.' },
  { name: 'EL CHICO DEL CAMINO', detail: 'Un nene descalzo sostiene una linterna apagada.', open: '«Mi mamá dice que no abra si alguien viene con mi cara. ¿Usted vio a mi mamá?»', shut: 'El chico no se mueve. Cuando apagás la luz del pasillo, ya no está.' },
  { name: 'ALGUIEN QUE CONOCÉS', detail: 'La silueta tiene la campera de tu tío. No le ves la cara.', open: '«Abrime, pibe. Soy yo. Me olvidé las llaves.» La voz suena igual, pero tu tío está durmiendo en la pieza.', shut: 'La voz repite tu nombre tres veces. La última vez viene desde adentro de la casa.' },
];

const NEWS = [
  'FM 92.7: «Las autoridades estiman que el corte podría extenderse entre 48 y 72 horas. Se recomienda permanecer en los hogares».',
  'FM 92.7: «Se reportan episodios de confusión, agresividad y conductas erráticas en localidades rurales. No se acerque a personas desorientadas».',
  'FM 92.7: «La duración del apagón es indeterminada. Hay denuncias de personas que golpean puertas durante horas y niegan ser quienes son».',
  'FM 92.7: «Último comunicado: no abra la puerta por ningún motivo. Si escucha su propia voz desde afuera, no responda».',
  'FM 92.7: «La transmisión se interrumpe. Si todavía puede oírnos, no mire directamente a las personas que esperan en la oscuridad».',
];

const NIGHT_TASKS = [
  { id: 'radio', label: 'Escuchar las noticias', place: 'LA COCINA' },
  { id: 'door', label: 'Decidir qué hacer con quien golpea', place: 'LA PUERTA' },
  { id: 'supplies', label: 'Revisar la casa y sus provisiones', place: 'EL RANCHO' },
];

export default function Home() {
  const [phase, setPhase] = useState('title');
  const [roomId, setRoomId] = useState('patio');
  const [nightCount, setNightCount] = useState(1);
  const [done, setDone] = useState([]);
  const [line, setLine] = useState({ who: 'RADIO', text: 'FM 92.7 · La transmisión se corta antes de dar el pronóstico.' });
  const [visitorOpen, setVisitorOpen] = useState(false);
  const [visitorHandled, setVisitorHandled] = useState(false);
  const [endingId, setEndingId] = useState(null);
  const [fade, setFade] = useState(false);
  const [radioText, setRadioText] = useState('');
  const heroRef = useRef({ x: 235, y: 174, target: 235, targetY: 174, moving: false, pending: null });

  const visitor = VISITORS[(nightCount - 1) % VISITORS.length];
  const news = NEWS[Math.min(nightCount - 1, NEWS.length - 1)];

  useEffect(() => {
    if (phase !== 'play' || visitorHandled || visitorOpen) return undefined;
    const timer = window.setTimeout(() => setVisitorOpen(true), 9000);
    return () => window.clearTimeout(timer);
  }, [phase, nightCount, visitorHandled, visitorOpen]);

  const placeHero = (id) => {
    const room = ROOMS[id];
    heroRef.current = {
      x: room.entryX, y: room.floorY, target: room.entryX, targetY: room.floorY,
      moving: false, pending: null,
    };
  };

  const goTo = useCallback((id) => {
    setFade(true);
    window.setTimeout(() => {
      placeHero(id);
      setRoomId(id);
      setFade(false);
    }, 180);
  }, []);

  const say = useCallback((who, text) => setLine({ who, text }), []);

  const handleAction = useCallback((id) => {
    if (['patio', 'cocina', 'gallinero', 'pieza', 'sotano'].includes(id)) {
      goTo(id);
      return;
    }
    if (id === 'radio') {
      const message = NEWS[Math.min(nightCount - 1, NEWS.length - 1)];
      setRadioText(message);
      setDone((old) => old.includes('radio') ? old : [...old, 'radio']);
      say('FM 92.7', message);
      return;
    }
    if (id === 'puerta') {
      setVisitorOpen(true);
      say('VOS', 'Los golpes vienen de la puerta. No podés distinguir quién está del otro lado.');
      return;
    }
    if (id === 'buzon') {
      say('VOS', 'Hay un papel húmedo dentro: «No confíes en quien diga que el apagón ya terminó».');
      return;
    }
    if (id === 'gallinas') {
      say('VOS', 'Las gallinas están apretadas en una esquina. Todas miran hacia la casa.');
      return;
    }
    if (id === 'trampilla') {
      say('VOS', 'Desde abajo llegan tres golpes. Después, alguien golpea desde el otro lado de la puerta principal.');
      return;
    }
    if (id === 'mate' || id === 'pileta' || id === 'plato') {
      say('VOS', 'La cocina está fría. La pava no calienta y el plato servido parece recién preparado.');
      return;
    }
    if (id === 'alambrado') {
      say('VOS', 'Hay una figura al otro lado del alambrado. Cuando parpadeás, está un poco más cerca.');
      return;
    }
    if (id === 'cama') {
      say('VOS', 'La cama está tibia. Alguien estuvo acostado ahí hace apenas unos segundos.');
      return;
    }
    if (id === 'ventana') {
      say('VOS', 'Afuera no se ve el campo. Solo una oscuridad quieta, como si hubieran tapado el vidrio.');
      return;
    }
    if (id === 'espejo') {
      say('VOS', 'Tu reflejo tarda un segundo en imitarte.');
      return;
    }
    say('VOS', 'No encontrás nada más que oscuridad y silencio.');
  }, [goTo, nightCount, say]);

  const startNight = () => {
    setNightCount(1);
    setDone([]);
    setEndingId(null);
    setVisitorHandled(false);
    setVisitorOpen(false);
    setRadioText('');
    setRoomId('patio');
    placeHero('patio');
    setLine({ who: 'VOS', text: '03:17. Se cortó la luz en todo el campo. La radio sigue encendida, aunque nadie recuerda haberla prendido.' });
    setPhase('play');
  };

  const answerVisitor = (open) => {
    setVisitorOpen(false);
    setVisitorHandled(true);
    setDone((old) => old.includes('door') ? old : [...old, 'door']);
    say(open ? visitor.name : 'VOS', open ? visitor.open : visitor.shut);
  };

  const nextNight = () => {
    setNightCount((n) => n + 1);
    setVisitorHandled(false);
    setVisitorOpen(false);
    setDone([]);
    setRadioText('');
    setLine({ who: 'VOS', text: `La noche ${nightCount + 1}. No dormiste. Afuera, alguien empieza a golpear antes de que termine de oscurecer.` });
    setRoomId('pieza');
    placeHero('pieza');
  };

  const chooseEnding = (id) => {
    setEndingId(id);
    setPhase('ending');
  };

  const restart = () => {
    setPhase('title');
    setNightCount(1);
    setDone([]);
    setVisitorOpen(false);
    setVisitorHandled(false);
  };

  const decisions = [
    { id: 'amanecer', label: 'Salir al campo y buscar ayuda', note: 'La radio dice que hay un refugio en el pueblo.' },
    { id: 'abuelo', label: 'Atrancar la puerta y esperar', note: 'No vas a dejar entrar a nadie.' },
    { id: 'premium', label: 'Seguir la voz que viene del sótano', note: 'Bajar aunque escuches que alguien te llama.', locked: false },
  ];

  return (
    <div className="rancho-shell flex min-h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-[1160px] flex-col items-center gap-2 px-2 py-3 sm:gap-3 sm:px-6 sm:py-7">
        <div className="stage-frame grain">
          {phase === 'title' && <TitleScreen onStart={startNight} />}
          {phase === 'play' && (
            <>
              <PixelStage
                room={ROOMS[roomId]}
                mode="night"
                heroRef={heroRef}
                onAction={handleAction}
                interactive={!visitorOpen}
                flags={{ alambre: nightCount >= 2 }}
              />
              <Hud
                clock="03:17"
                date={`NOCHE ${String(nightCount).padStart(2, '0')} · OCT 2007`}
                place={ROOM_NAMES[roomId]}
                night
              />
              <TaskPanel tasks={NIGHT_TASKS} done={done} title="SOBREVIVIR HASTA EL AMANECER" />
              <Dialogue who={line.who} text={line.text} />
              <div className="absolute bottom-3 right-3 z-20 flex gap-2">
                {visitorHandled && (
                  <button onClick={nextNight} className="border border-amber-200/50 bg-black/85 px-3 py-2 font-mono text-[7px] tracking-[0.18em] text-amber-100 hover:bg-amber-100/10 sm:text-[9px]">
                    PASAR A LA NOCHE {nightCount + 1}
                  </button>
                )}
                {nightCount >= 5 && visitorHandled && (
                  <button onClick={() => setPhase('decision')} className="border border-red-200/50 bg-black/85 px-3 py-2 font-mono text-[7px] tracking-[0.18em] text-red-100 hover:bg-red-100/10 sm:text-[9px]">
                    TOMAR UNA DECISIÓN
                  </button>
                )}
              </div>
              {visitorOpen && (
                <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/75 p-4">
                  <div className="w-full max-w-[430px] border border-amber-100/35 bg-[#171419] p-4 shadow-2xl sm:p-6">
                    <p className="font-mono text-[7px] tracking-[0.35em] text-red-200/70">TOC · TOC · TOC</p>
                    <h2 className="mt-2 font-display text-xl text-amber-100 sm:text-2xl">{visitor.name}</h2>
                    <p className="mt-2 font-display text-sm italic text-stone-300">{visitor.detail}</p>
                    <p className="mt-4 border-l border-amber-100/30 pl-3 font-display text-sm leading-relaxed text-stone-200">
                      Alguien está esperando del otro lado. La radio continúa hablando en la cocina.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <button onClick={() => answerVisitor(true)} className="border border-amber-100/50 px-4 py-2 font-mono text-[8px] tracking-[0.15em] text-amber-100 hover:bg-amber-100/10">ABRIR LA PUERTA</button>
                      <button onClick={() => answerVisitor(false)} className="border border-stone-500/50 px-4 py-2 font-mono text-[8px] tracking-[0.15em] text-stone-300 hover:bg-white/5">NO ABRIR</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {phase === 'decision' && (
            <Choice
              title="El amanecer no llegó. ¿Qué vas a hacer?"
              subtitle="La radio ya no transmite noticias. Desde afuera, alguien espera con tu voz."
              options={decisions}
              onChoose={chooseEnding}
            />
          )}
          {phase === 'ending' && <Ending ending={getEnding(endingId, { contrato: false })} onRestart={restart} />}
          <div className={`pointer-events-none absolute inset-0 z-30 bg-black transition-opacity duration-200 ${fade ? 'opacity-100' : 'opacity-0'}`} />
          <div className="scanlines-layer" />
        </div>
        <div className="flex w-full items-center justify-between px-1">
          <p className="font-mono text-[6px] tracking-[0.3em] text-stone-600 sm:text-[7px]">MOVETE CON W A S D · INTERACTUÁ HACIENDO CLIC</p>
          <p className="hidden font-display text-[11px] italic text-stone-600 sm:block">Las Liebres no figura en los mapas nuevos.</p>
        </div>
      </div>
    </div>
  );
}
