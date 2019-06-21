var nightModeButton = document.querySelector(".night-mode__button");
var nightMode = document.querySelector(".night-mode");

nightModeButton.addEventListener("click", () => {
	nightMode.classList.toggle("night-mode--active");
});

// Dark mode
const activateDarkMode = () => {
	const rootElement = document.querySelector(":root");
	const darkTheme = {
		"--background-color": "#000000",
		"--color": "#ffffff",
		"--green": "#FFC0CB"
	};
	for (k in darkTheme) {
		rootElement.style.setProperty(k, darkTheme[k]);
	}
};

// Light Mode
const activateLightMode = () => {
	const rootElement = document.querySelector(":root");
	const lightTheme = {
		"--background-color": "#ffffff",
		"--color": "#000000",
		"--green": "#008000"
	};
	for (k in darkTheme) {
		rootElement.style.setProperty(k, lightTheme[k]);
	}
};

const setColorScheme = () => {
	const isDarkMode = window.matchMedia("(prefer-color-scheme: dark)").matches;
	const isLightMode = window.matchMedia("(prefer-color-scheme: light)").matches;
	const isNotSpecified = window.matchMedia(
		"(prefer-color-scheme: no-preference)"
	).matches;
	const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

	window
		.matchMedia("(prefre-color-scheme:dark)")
		.addEventListener(e => e.matches && activateDarkMode());
	window
		.matchMedia("(prefre-color-scheme:light)")
		.addEventListener(e => e.matches && activateLightMode());

	if (isDarkMode) activateDarkMode();
	if (isLightMode) activateLightMode();

	if (isNotSpecified || hasNoSupport) {
		console.log("you have not specified a color scheme");
		const now = new Date();
		const hour = now.getHours();
		if (hour < 4 || hour >= 16) {
			activateDarkMode();
		}
	}
};
