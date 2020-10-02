let pBar = document.getElementById("progress-bar");
let metronome = document.getElementById("metronome")
let accents = document.getElementById("accents");

//Path of the beats
const beat1 = "assets/click.wav";

let current_beat = beat1; //Declare initial beat

let bpm = 60; // beats per minute
let tick = 60 / bpm; // time of one beats
let accent = 4; //Accents


let timer; // timer for background color change
let pBarTimer; // timer for progress bar

let mute = false;
let shouldMove = false;

accents.addEventListener("click", change_beat); //Initialize 

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
		let parts = parseInt(100/accent);

		if (width > 100) {
			endProgress();
			nextWidth = 1;
		} else {
			pBar.style.width = width + "vw";
			nextWidth++;

			if(width%parts == 0)
				if (!mute) new Audio("assets/click.wav").play();	
		}

		if (shouldMove) {
			move(nextWidth);
		}
	}, tick * 10)
}

// cahnge color and play sound when progress bar is 100% width
function endProgress() {
	metronome.style.background = getRandomColor();
	if (!mute) new Audio("assets/click.wav").play();
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

function toggleSound() {
	if (!mute)
		document.getElementById("sound-icon").src = "./assets/mute-icon.png";
	else document.getElementById("sound-icon").src = "./assets/unmute-icon.png";

	mute = !mute;
}

// Function to change the beat when a beat button is pressed
function change_beat(e){
	let beat = e.target;

	if(beat.classList.contains("beat_1"))
		accent = 1;
	else if(beat.classList.contains("beat_2"))
		accent = 2;
	else if(beat.classList.contains("beat_3"))
		accent = 3;
	else if(beat.classList.contains("beat_4"))
		accent = 4;

	document.querySelector(".active").classList.remove("active");
	e.target.classList.add("active");
}