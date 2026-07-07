/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",
        secondary: "#0EA5E9",
        accent: "#1E40AF",
        dark: "#1F2937",
        light: "#F8FAFC",
        "gray-light": "#F3F4F6",
        "gray-medium": "#9CA3AF",
        "gray-dark": "#4B5563",
        "blue-dark": "#1E3A8A",
        "blue-light": "#DBEAFE",
      },
      fontFamily: {
        inter: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
        "card-hover": "0 10px 15px -3px rgba(37, 99, 235, 0.1), 0 4px 6px -2px rgba(37, 99, 235, 0.05)",
        soft: "0 2px 8px rgba(0, 0, 0, 0.08)",
        medium: "0 4px 12px rgba(0, 0, 0, 0.1)",
        glow: "0 0 20px rgba(37, 99, 235, 0.15)",
      },
      screens: {
        xs: "450px",
      },
      borderRadius: {
        card: "16px",
        button: "8px",
      },
      spacing: {
        section: "100px",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
