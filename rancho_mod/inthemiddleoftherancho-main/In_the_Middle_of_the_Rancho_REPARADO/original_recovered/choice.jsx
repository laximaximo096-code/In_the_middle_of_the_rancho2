import React from 'react';

export default function Choice({ title, subtitle, options, onChoose }) {
  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/80 px-4 backdrop-blur-[2px] slow-fade-in">
      <div className="w-full max-w-xl border border-amber-100/15 bg-[#0d0c11]/92 px-5 py-6 sm:px-8 sm:py-8">
        <p className="font-mono text-[7px] tracking-[0.45em] text-amber-200/70 sm:text-[9px]">DECISIÓN FINAL</p>
        <h2 className="mt-3 font-display text-xl leading-tight text-stone-100 sm:text-3xl">{title}</h2>
        <p className="mt-2 font-display text-[12px] italic leading-snug text-stone-400 sm:text-sm">{subtitle}</p>
        <div className="mt-5 space-y-2">
          {options.map((opt) => (
            <button
              key={opt.id}
              disabled={opt.locked}
              onClick={() => onChoose(opt.id)}
              className={`group flex w-full items-start justify-between gap-3 border px-3 py-2.5 text-left transition-colors sm:px-4 sm:py-3 ${
                opt.locked
                  ? 'cursor-not-allowed border-stone-700/40 text-stone-600'
                  : 'border-amber-200/25 text-stone-100 hover:border-amber-200/70 hover:bg-amber-100/10'
              }`}
            >
              <span className="min-w-0">
                <span className="block font-display text-[13px] leading-tight sm:text-base">{opt.label}</span>
                <span className="mt-0.5 block font-mono text-[6px] tracking-[0.2em] text-stone-500 sm:text-[7px]">
                  {opt.locked ? opt.lockedNote : opt.note}
                </span>
              </span>
              <span className="mt-1 font-mono text-[9px] text-amber-200/60 group-hover:text-amber-200">›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
