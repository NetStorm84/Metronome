let pBar = document.getElementById("progress-bar");
let metronome = document.getElementById("metronome");

let bpm = 60; // beats per minute
let tick = 60 / bpm; // time of one beats

let timer; // timer for background color change
let pBarTimer; // timer for progress bar

function getRandomColor() {
	// generate random color code
	let letters = "0123456789ABCDEF";
	let color = "#";
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)];
	}
	return color;
}

function bpmChange(val) {
	bpm = val;
	tick = 60 / bpm;
}

function move() {
	// move progress bar

	let width = 1;
	id = setInterval(() => {
		if (width > 100) {
			endProgress();
			width = 1;
		} else {
			pBar.style.width = width + "vw";
			width++;
		}
	}, tick * 10); // this loop perform for every tick*10 seconds
}

// cahnge color and play sound when progress bar is 100% width
function endProgress() {
	metronome.style.background = getRandomColor();
	new Audio("assets/click.wav").play();
}

//when clicking button
function handleClick(event) {
	//get the button
	const button = event.target;
	//check the action status
	const stopAction = button.dataset.action != "Start";
	//switch the action
	const actionToggle = !stopAction ? "Stop" : "Start";

	button.value = `${actionToggle} Metronome`;
	button.dataset.action = actionToggle;

	if (stopAction) {
		stopMetronome();
	} else {
		startMetronome();
	}
}

function startMetronome() {
	// change background color
	move();
}

function stopMetronome() {
	clearInterval(id);
	clearInterval(timer);
}
