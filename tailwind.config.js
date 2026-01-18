/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "whatsapp-bg": "#111b21",
        "whatsapp-dark": "#0b141a",
        "whatsapp-header": "#202c33",
        "whatsapp-panel": "#111b21", // sidebar background
        "whatsapp-incoming": "#202c33",
        "whatsapp-outgoing": "#005c4b",
        "whatsapp-teal": "#00a884",
        "whatsapp-secondary": "#8696a0",
        "whatsapp-primary": "#e9edef",
        "whatsapp-input": "#2a3942",
        "whatsapp-border": "#313d45",
      },
    },
  },
  plugins: [],
};
