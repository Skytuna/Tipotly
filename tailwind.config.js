/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
        ...defaultTheme,
        fontFamily: {
            montserrat: ['Montserrat', ...defaultTheme.fontFamily.sans],
        },
        colors: {
            ...colors,
            primary: '#f69e5a',
            primaryHover: '#f09047',
            textPrimary: colors.neutral[800],
        },
        extend: {
            transitionProperty: {
                width: 'width',
            },
            gridTemplateColumns: {
                'fill-20': 'repeat(auto-fill, minmax(24rem, 1fr))',
            },
        },
    },
    plugins: [require('flowbite/plugin')],
};
