import React from 'react';

export default function TaskPanel({ tasks, done, title = 'COSAS PARA HOY' }) {
  return (
    <div className="pointer-events-none absolute right-2 top-[42px] z-20 w-[46%] max-w-[230px] border border-amber-100/10 bg-black/45 px-2.5 py-2 backdrop-blur-[1px] sm:right-5 sm:top-[70px] sm:px-3 sm:py-2.5">
      <p className="font-mono text-[6px] tracking-[0.35em] text-amber-200/60 sm:text-[7px]">{title}</p>
      <ul className="mt-1.5 space-y-1.5 sm:mt-2">
        {tasks.map((task) => {
          const checked = done.includes(task.id);
          return (
            <li key={task.id} className="flex items-start gap-1.5">
              <span
                className={`mt-[2px] flex h-2.5 w-2.5 shrink-0 items-center justify-center border text-[7px] leading-none sm:h-3 sm:w-3 sm:text-[8px] ${
                  checked
                    ? 'border-amber-200/50 bg-amber-200/15 text-amber-100'
                    : 'border-stone-500/50 text-transparent'
                }`}
              >
                ×
              </span>
              <span className="min-w-0">
                <span
                  className={`block font-display text-[10px] leading-tight sm:text-[12px] ${
                    checked ? 'text-stone-500 line-through' : 'text-stone-100'
                  }`}
                >
                  {task.label}
                </span>
                <span className="block font-mono text-[5px] tracking-[0.2em] text-stone-500 sm:text-[6px]">
                  {task.place}
                </span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
