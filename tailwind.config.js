/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "rojo-inmobiliario": "var(--rojo-inmobiliario)",
        "azul-primario": "var(--azul-primario)",
        "azul-primario-light": "var(--azul-primario-light)",
        "azul-primario-dark": "var(--azul-primario-dark)",
        "negro-profundo": "var(--negro-profundo)",
        "gris-neutro": "var(--gris-neutro)",
        "gris-medio": "var(--gris-medio)",
        "gris-claro": "var(--gris-claro)",
        "beige-suave": "var(--beige-suave)",
      },

      boxShadow: {
        navbar: "0 4px 6px -1px rgba(59, 130, 246, 0.1), 0 2px 4px -1px rgba(59, 130, 246, 0.06)",
        "btn-primary": "0 4px 6px rgba(59, 130, 246, 0.3)",
        "logo-hover": "0 8px 15px rgba(59, 130, 246, 0.4)",
      },

      transitionProperty: {
        width: "width",
        height: "height",
        spacing: "margin, padding",
        colors: "color, background-color, border-color, text-decoration-color, fill, stroke",
        shadow: "box-shadow",
        transform: "transform",
      },

      animation: {
        "slide-down": "slideDown 0.3s ease-out forwards",
        "gradient-move": "gradientBG 4s ease infinite",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "fade-out": "fadeOut 0.4s ease-in forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        "scale-out": "scaleOut 0.4s ease-in forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in-fog": "fadeInFog 0.6s ease-out forwards",
        "fog-float-in": "fogFloatIn 0.8s ease-out forwards",
      },

      keyframes: {
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        gradientBG: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(20px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        scaleOut: {
          "0%": { opacity: "1", transform: "scale(1) translateY(0)" },
          "100%": { opacity: "0", transform: "scale(0.95) translateY(20px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInFog: {
          "0%": { opacity: "0", transform: "translateY(20px) scale(0.95)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)", filter: "blur(0)" },
        },
        fogFloatIn: {
          "0%": { opacity: "0", transform: "translateY(30px) rotateX(15deg) scale(0.95)", filter: "blur(10px)" },
          "50%": { opacity: "0.6", transform: "translateY(15px) rotateX(10deg) scale(0.98)", filter: "blur(5px)" },
          "100%": { opacity: "1", transform: "translateY(0) rotateX(0) scale(1)", filter: "blur(0)" },
        },
      },

      backgroundSize: {
        "300%": "300% 300%",
      },
      borderRadius: {
        lg: "0.75rem",
      },
      fontWeight: {
        medium: "500",
        semibold: "600",
      },
      letterSpacing: {
        widest: ".12em",
      },
    },
  },
  plugins: [],
};
