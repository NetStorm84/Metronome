let pBar = undefined;
let metronome = undefined;
let $startBtn = undefined;
let $soundImage = undefined;
let $soundToggle = undefined
let $bmpInputEl = undefined;

let bpm = 60; // beats per minute
let tick = 60 / bpm; // time of one beats

let timer; // timer for background color change
let pBarTimer; // timer for progress bar

let mute = false;
let shouldMove = false;

const getRandomColor = () => {
  // generate random color code
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const bpmChange = (e) => {
  const bpm = e.target.value;
  tick = 60 / bpm;
}

// move progress bar
const move = (width = 1) => {
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
  }, tick * 10);
}

// cahnge color and play sound when progress bar is 100% width
const endProgress = () => {
  metronome.style.background = getRandomColor();
  if (!mute) new Audio("assets/audio/click.wav").play();
}

//when clicking button
const handleStartClick = (event) => {
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

const startMetronome = () => {
  // change background color
  shouldMove = true;
  move();
}

const stopMetronome = () => {
  shouldMove = false;
  clearInterval(timer);
}

const toggleSound = () => {
  $soundImage.src = !mute ? "./assets/images/mute-icon.png" : "./assets/images/unmute-icon.png";

  mute = !mute;
}

const stash = () => {
  pBar = document.getElementById("progress-bar");
  metronome = document.getElementById("metronome");
  $startBtn = document.querySelector("#start-btn");
  $soundToggle = document.querySelector("#sound-toggle");
  $soundImage = document.querySelector("#sound-icon");
  $bmpInputEl = document.querySelector('#bpm-input')
};

const listen = () => {
  $startBtn.addEventListener("click", handleStartClick);
  $soundToggle.addEventListener("click", toggleSound)
  $bmpInputEl.addEventListener("click", bpmChange)
};

const init = () => {
  stash();
  listen();
};

// Ensure all out DOM is loaded first
document.addEventListener("DOMContentLoaded", init);
