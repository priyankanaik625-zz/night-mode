//Switch Between Day and night Theme
const themeSwitch = document.getElementById("themeSwitch");

themeSwitch.addEventListener("change", event => {
	event.target.checked
		? document.body.setAttribute("data-theme", "dark")
		: document.body.removeAttribute("data-theme");
});

// Switch to dark theme depending upon day and night
const isNight = () => {
	var date = new Date();
	return date.getHours() > 22 || date.getHours() < 6;
};

if (isNight()) {
	document.body.setAttribute("data-theme", "dark");
	themeSwitch.checked = true;
} else {
	document.body.removeAttribute("data-theme");
	themeSwitch.checked = false;
}
