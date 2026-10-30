import React from 'react';

export default function Hud({ clock, date, place, night }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between px-3 py-2.5 sm:px-5 sm:py-4">
      <div className="border-l border-amber-200/25 pl-2 sm:pl-3">
        <p className={`font-mono text-[13px] leading-none tracking-[0.12em] sm:text-lg ${night ? 'text-amber-200/90' : 'text-stone-100'}`}>
          {clock}
        </p>
        <p className="mt-1.5 font-mono text-[6px] tracking-[0.3em] text-stone-400 sm:text-[8px]">{date}</p>
      </div>
      <div className="text-right">
        <p className="font-mono text-[7px] tracking-[0.28em] text-amber-100/70 sm:text-[9px]">{place}</p>
        <p className="mt-1 font-mono text-[6px] tracking-[0.22em] text-stone-500 sm:text-[7px]">
          LAS LIEBRES · BS. AS.
        </p>
      </div>
    </div>
  );
}
