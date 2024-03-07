/** @type {import('tailwindcss').Config} */
export default {
	purge: ['./src/**/*.{js,jsx,ts,tsx}'],
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#556793',
			},
			fontFamily: {
				sans: ['Nunito'],
			},
		},
	},
	variants: {},
	plugins: [],
};
