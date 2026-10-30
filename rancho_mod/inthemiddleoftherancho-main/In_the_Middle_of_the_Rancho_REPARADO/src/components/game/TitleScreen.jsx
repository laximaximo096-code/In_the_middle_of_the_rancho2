import React from 'react';
import PixelStage from './PixelStage';
import { ROOMS } from '../../game/rooms';

export default function TitleScreen({ onStart }) {
  return (
    <div className="absolute inset-0">
      <PixelStage room={ROOMS.patio} mode="night" camera={{ x: 0, y: 0, zoom: 1 }} interactive={false} />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/70" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="font-mono text-[8px] tracking-[0.5em] text-amber-200/70 sm:text-[10px]">
          UNA HISTORIA RURAL DE TERROR
        </p>
        <h1 className="mt-4 font-display text-[2.1rem] leading-[0.9] text-stone-100 drop-shadow-[0_4px_18px_rgba(0,0,0,0.9)] sm:mt-6 sm:text-6xl">
          <span className="block">IN THE MIDDLE</span>
          <span className="mt-1 block italic text-amber-200/90">OF THE RANCHO</span>
        </h1>
        <div className="mt-5 h-px w-16 bg-amber-200/25 sm:mt-7" />
        <p className="mt-4 font-mono text-[7px] tracking-[0.4em] text-stone-400 sm:text-[9px]">
          PROVINCIA DE BUENOS AIRES · 2007
        </p>
        <button
          onClick={onStart}
          className="group mt-7 border border-amber-200/40 px-7 py-2.5 font-mono text-[9px] tracking-[0.35em] text-amber-100/90 transition-colors hover:border-amber-200/80 hover:bg-amber-100/10 sm:mt-9 sm:px-9 sm:text-[10px]"
        >
          EMPEZAR PARTIDA
        </button>
        <p className="mt-6 font-display text-[11px] italic text-stone-500 sm:text-sm">
          Un prólogo jugable · sonido recomendado
        </p>
      </div>
    </div>
  );
}
