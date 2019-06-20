console.log("let's get started");

var nightModeButton = document.querySelector(".night-mode__button");
var nightMode = document.querySelector(".night-mode");

nightModeButton.addEventListener("click", () => {
	nightMode.classList.toggle("night-mode--active");
});
