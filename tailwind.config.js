/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{html,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "#3369e7",
			},
		},
	},
	plugins: [],
};
