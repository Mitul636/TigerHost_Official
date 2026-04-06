/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                teal: '#0D2028',
                dark: '#1A1A2E',
                orange: {
                    DEFAULT: '#E8420A',
                    light: '#FF6B35'
                },
                steel: '#8FA8B8',
            },
            fontFamily: {
                heading: ['Orbitron', 'sans-serif'],
                body: ['Rajdhani', 'sans-serif'],
                inter: ['Inter', 'sans-serif'],
            },
            boxShadow: {
                'orange-glow': '0 0 20px rgba(232, 66, 10, 0.5)',
                'orange-glow-lg': '0 0 40px rgba(232, 66, 10, 0.6)',
                'card-hover': '0 0 20px rgba(232, 66, 10, 0.5)',
            },
        },
    },
    plugins: [],
}
