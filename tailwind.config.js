/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{html,js}"],
	theme: {},
	plugins: [require("daisyui")],
	daisyui: {
		styled: true,
		themes: [
			{
				mytheme: {
					primary: "#FFD60A",
					secondary: "#FFC300",
					accent: "#003566",
					neutral: "#ffffff",
					"base-100": "#10161E",
					warning: "#D16014",
				},
			},
		],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: "",
		darkTheme: "night",
	},
};
