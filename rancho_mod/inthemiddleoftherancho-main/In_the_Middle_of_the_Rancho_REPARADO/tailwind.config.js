export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        display: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['Silkscreen', 'monospace'],
        body: ['Instrument Serif', 'Georgia', 'serif'],
      },
      opacity: Object.fromEntries(Array.from({ length: 101 }, (_, i) => [i, `${i / 100}`])),
    },
  },
  plugins: [],
};
