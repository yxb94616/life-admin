/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{html,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--primary-color)",
			},
			height: {
				header: "var(--header-height)",
				"omit-header": "calc(100vh - var(--header-height))",
			},
			backgroundImage: {
				login: "url(/src/assets/images/bg-login.jpg)",
			},
		},
	},
	plugins: [],
};
