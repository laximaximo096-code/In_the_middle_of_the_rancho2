import React, { useEffect, useRef, useState } from 'react';
import PixelStage from './PixelStage';
import { ROOMS } from '@/game/rooms';
import { camAt } from '@/game/cinematics';

export default function Cinematic({ shots, onFinish }) {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const shot = shots[Math.min(index, shots.length - 1)];
  const advanceRef = useRef(onFinish);
  advanceRef.current = onFinish;

  useEffect(() => {
    setProgress(0);
    setFadeIn(true);
    let raf = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / shot.dur);
      setProgress(p);
      if (p >= 1) {
        if (index >= shots.length - 1) {
          advanceRef.current?.();
        } else {
          setIndex((i) => i + 1);
        }
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const fadeTimer = window.setTimeout(() => setFadeIn(false), shot.fadeIn ? 600 : 120);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fadeTimer);
    };
  }, [index, shot.dur, shot.fadeIn, shots.length]);

  const elapsed = progress * shot.dur;
  const line = [...shot.lines].reverse().find((l) => l.at <= elapsed) || shot.lines[0];
  const chars = Math.max(0, Math.floor((elapsed - line.at) / 16));
  const visible = line.text.slice(0, chars);
  const typing = chars < line.text.length;

  const goNext = () => {
    if (index >= shots.length - 1) advanceRef.current?.();
    else setIndex((i) => i + 1);
  };

  return (
    <div className="absolute inset-0">
      <PixelStage
        room={ROOMS[shot.room]}
        mode={shot.mode}
        camera={camAt(shot, progress)}
        interactive={false}
        flags={shot.flags}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[9%] bg-black" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[30%] bg-gradient-to-t from-black via-black/75 to-transparent" />

      <div className="absolute inset-x-0 top-[11%] z-20 flex justify-center gap-1.5">
        {shots.map((s, i) => (
          <span
            key={i}
            className={`h-[2px] w-6 transition-colors ${i <= index ? 'bg-amber-200/70' : 'bg-amber-200/15'}`}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-[9%] z-20 px-5 text-center sm:px-10">
        {line.who ? (
          <p className="font-mono text-[8px] tracking-[0.4em] text-amber-200/70 sm:text-[10px]">{line.who}</p>
        ) : null}
        <p className="mx-auto mt-2 max-w-xl font-display text-base leading-snug text-stone-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] sm:text-xl">
          {visible}
          {typing && <span className="ml-0.5 text-amber-200/70">▌</span>}
        </p>
      </div>

      <button
        onClick={goNext}
        className="absolute bottom-[3%] right-4 z-20 font-mono text-[8px] tracking-[0.3em] text-stone-400 transition-colors hover:text-amber-100 sm:text-[9px]"
      >
        CONTINUAR ›
      </button>
      <button
        onClick={() => advanceRef.current?.()}
        className="absolute right-4 top-[3.6%] z-20 font-mono text-[8px] tracking-[0.3em] text-stone-500 transition-colors hover:text-amber-100 sm:text-[9px]"
      >
        SALTAR
      </button>

      {fadeIn && <div className="pointer-events-none absolute inset-0 z-30 bg-black slow-fade-in" style={{ animationDirection: 'reverse' }} />}
    </div>
  );
}
