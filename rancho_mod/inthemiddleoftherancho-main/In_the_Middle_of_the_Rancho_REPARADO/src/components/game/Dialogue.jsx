import React from 'react';

export default function Dialogue({ who, text }) {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20">
      <div className="border-t border-amber-100/10 bg-gradient-to-t from-black/85 to-black/35 px-3 pb-2.5 pt-2 sm:px-5 sm:pb-4 sm:pt-3">
        <p className="font-mono text-[7px] tracking-[0.38em] text-amber-200/70 sm:text-[8px]">{who || 'VOS'}</p>
        <p className="mt-1 max-w-3xl font-display text-[12px] leading-snug text-stone-100/95 sm:text-[15px]">
          {text}
        </p>
      </div>
    </div>
  );
}
