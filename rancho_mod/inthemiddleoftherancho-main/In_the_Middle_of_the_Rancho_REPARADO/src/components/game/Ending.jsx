import React from 'react';

export default function Ending({ ending, onRestart }) {
  if (!ending) return null;
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black/88 px-4 py-4 backdrop-blur-sm slow-fade-in">
      <div className="my-auto w-full max-w-lg border border-amber-100/15 bg-[#0d0c11]/92 px-5 py-6 text-center shadow-[0_0_60px_-20px_rgba(180,140,60,0.4)] sm:px-9 sm:py-9">
        <p className="font-mono text-[7px] tracking-[0.4em] text-amber-200/70 sm:text-[9px]">{ending.kicker}</p>
        <h2 className="mt-3 font-display text-xl leading-tight text-stone-100 sm:text-3xl">{ending.title}</h2>
        <div className="mx-auto mt-4 h-px w-20 bg-amber-200/20" />
        <div className="mt-4 space-y-3">
          {ending.body.map((par) => (
            <p key={par.slice(0, 24)} className="mx-auto max-w-md font-display text-[12px] leading-relaxed text-stone-400 sm:text-sm">
              {par}
            </p>
          ))}
        </div>
        {ending.quote && (
          <p className="mx-auto mt-5 max-w-md font-display text-[13px] italic leading-snug text-amber-100/90 sm:text-base">
            {ending.quote}
          </p>
        )}
        <p className="mt-6 font-mono text-[7px] tracking-[0.3em] text-stone-500 sm:text-[8px]">{ending.footer}</p>
        <button
          onClick={onRestart}
          className="mt-6 border border-amber-200/35 px-6 py-2 font-mono text-[9px] tracking-[0.3em] text-amber-100/90 transition-colors hover:border-amber-200/70 hover:bg-amber-100/10"
        >
          VOLVER A EMPEZAR
        </button>
      </div>
    </div>
  );
}
