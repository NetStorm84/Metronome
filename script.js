let pBar = document.getElementById("progress-bar");
let metronome = document.getElementById("metronome");
let clickSound = null;
let loaded = false;
let bpm = 60; // beats per minute
let tick = 60 / bpm; // time of one beats

let timer, id; // timer for background color change
let pBarTimer; // timer for progress bar

let mute = false;
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
  bpmSpan = document.getElementById("bpm-value");
  bpmSpan.innerHTML = val;
}

// move progress bar
function move(width = 1) {
  // every time move() is called, it
  // uses the most recent tick value, which
  // lets us adjust the speed of the metronome while it is
  // running
  let timeout;
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(() => {
    let nextWidth = width;
    if (width > 100) {
      endProgress();
      nextWidth = 1;
    } else {
      pBar.style.width = width + "vw";
      nextWidth += 1 / tick;
    }
    if (shouldMove) {
      move(nextWidth);
    }
  }, tick);
}

// cahnge color and play sound when progress bar is 100% width
function endProgress() {
  metronome.style.background = getRandomColor();
  if (!mute) {
    //load sound so that it resets on every beat
    clickSound.currentTime = 0;
    clickSound.play();
  }
}

//when clicking button
function handleClick(event) {
  //get the button
  const button = event.target;
  console.log(button);

  //check the action status
  const stopAction = button.dataset.action != "Start";

  //switch the action
  const actionToggle = !stopAction ? "Stop" : "Start";
  console.log(actionToggle);

  button.innerHTML = `${actionToggle} Metronome`;
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
  clearTimeout(id);
}

function toggleSound() {
  if (!mute) document.getElementById("sound-icon").className = "las la-volume-off";
  else document.getElementById("sound-icon").className = "las la-volume-up";

  mute = !mute;
}

window.onload = function () {
  clickSound = new Audio("assets/audio/click.wav");
  clickSound.addEventListener("canplaythrough", function () {
    loaded = true;
    if (document.querySelector('[data-action="Start"]')) {
      document.querySelector('[data-action="Start"]').disabled = false;
    }
  });
};
