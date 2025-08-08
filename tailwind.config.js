// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rojo-inmobiliario': '#C80000',
        'azul-primario': '#3B82F6',       // azul para textos y hover
        'azul-primario-light': '#93C5FD', // azul claro para subrayados y fondos hover
        'azul-primario-dark': '#1E40AF',  // azul oscuro para sombras y estados activos
        'negro-profundo': '#000000',
        'gris-neutro': '#444444',
        'gris-medio': '#777777',
        'gris-claro': '#F5F5F5',
        'beige-suave': '#FBE8E8',
      },
      boxShadow: {
        'navbar': '0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)', // sombra azulada suave
        'btn-primary': '0 4px 6px rgba(59, 130, 246, 0.3)', // sombra para botones azul primario
        'logo-hover': '0 8px 15px rgba(59, 130, 246, 0.4)',  // sombra elegante para logo hover
      },
      transitionProperty: {
        'width': 'width',
        'height': 'height',
        'spacing': 'margin, padding',
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'shadow': 'box-shadow',
        'transform': 'transform',
      },
      animation: {
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'lg': '0.75rem', // más redondeado para contenedores principales
      },
      fontWeight: {
        'medium': '500',
        'semibold': '600',
      },
      letterSpacing: {
        widest: '.12em', // ligero espaciado para menús
      },
    },
  },
  plugins: [],
}
