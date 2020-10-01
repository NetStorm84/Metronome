let pBar = document.getElementById("progress-bar");
let metronome = document.getElementById("metronome");

let bpm = 60; // beats per minute
let tick = 60 / bpm; // time of one beats

let timer; // timer for background color change
let pBarTimer; // timer for progress bar

let shouldMove = false;

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

// move progress bar
function move(width = 1) {
	// every time move() is called, it
	// uses the most recent tick value, which
	// lets us adjust the speed of the metronome while it is
	// running
	setTimeout(() => {
		let nextWidth = width;
		if (width > 100) {
			endProgress();
			nextWidth = 1;
		} else {
			pBar.style.width = width + "vw";
			nextWidth++;
		}

		if (shouldMove) {
			move(nextWidth);
		}
	}, tick * 10)
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
	shouldMove = true;
	move();
}

function stopMetronome() {
	shouldMove = false;
	clearInterval(timer);
}
