let pBar = document.getElementById("progress-bar");
let metronome = document.getElementById("metronome");
let spaceBarMessage = document.getElementById("space-bar-message");
let dots = document.getElementsByClassName("dot");
let bpmBar = document.getElementById("bpm-bar");
let clickSound = null;
let loaded = false;
let counter = 0;
let start = 0;
let end = 0;
let bpm = 120; // beats per minute
let tick = 60 / bpm; // time of one beats
let currentBpm = bpm; // currently playing BPM

let timer; // timer for background color change
let pBarTimer; // timer for progress bar

let mute = false;
let shouldMove = false;
let spaceBpm = false;

function getRandomColor() {
  // generate random color code
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

//Generates Random Diraction for background gradient.
function getRandomDir() {
	return	Math.floor(Math.random() * 360);
}


function bpmChange(val) {
  bpm = val;
  tick = 60 / bpm;
  bpmSpan = document.getElementById("bpm-value");
  bpmSpan.innerHTML = val;
}

// resets progress bar CSS animation to initial state
function resetAnimation() {
  pBar.style.animation = 'none';
  pBar.offsetHeight; /* trigger reflow */
  pBar.style.animation = null;
}

// move progress bar
function move(width = 1) {
  // every time move() is called, it
  // uses the most recent tick value, which
  // lets us adjust the speed of the metronome while it is
  // running
  resetAnimation();
  // change progress bar animation duration
  pBar.style.animationDuration = tick * 1000 + 'ms';
  // and start it
  pBar.style.animationPlayState = 'running';
  timer = setInterval(() => {
    endProgress();
    if (currentBpm != bpm) {
      currentBpm = bpm;
      clearInterval(timer);
      move();
    }
  }, tick * 1000);
}

let lastBeep = Date.now();
// change color and play sound when progress bar is 100% width
function endProgress() {
  /*metronome.style.background = getRandomColor();*/
  let now = Date.now();
  let elapsed = now - lastBeep;
  console.log('Time since last tick: ' + elapsed + 'ms, real BPM: ' + 60000/elapsed);
  lastBeep = now;

  if (!mute) {
    //load sound so that it resets on every beat
    clickSound.currentTime = 0;
    clickSound.play();
  }
  //this line generates Gradient, Add/Remove getRandomColor() to change the number of colors you want in the gradient. Currently it contains 3 colors.
  metronome.style.background =  'linear-gradient(' + getRandomDir() + 'deg' + ', ' + getRandomColor() + ', ' + getRandomColor() + ', ' + getRandomColor() + ')';
}

//when clicking button
function handleClick(event) {
  //get the button
  const button = event.target;

  //check the action status
  const stopAction = button.dataset.action != "Start";

  //switch the action
  const actionToggle = !stopAction ? "Stop" : "Start";

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
  resetAnimation();
}

function toggleSound() {
  if (!mute)
    document.getElementById("sound-icon").className = "las la-volume-off";
  else document.getElementById("sound-icon").className = "las la-volume-up";

  mute = !mute;
}

function setBpmWithSpaceBar() {
  spaceBarMessage.style.display = "flex";
  spaceBpm = true;
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

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  if (e.code === "Space" && spaceBpm) {
    if (counter === 0) {
      start = new Date().getTime();
      setTimeout(() => {
        counter = 0;
        spaceBarMessage.style.display = "none";
        for (let i = 0; i < 4; i++) dots[i].style.backgroundColor = "#000";
        spaceBpm = false;
      }, 8000);
    }
    if (counter === 3) {
      end = new Date().getTime();
      let diff = (end - start) / 1000;
      let newBpm = Math.floor((4 / diff) * 60);
      bpmChange(Math.min(newBpm, 300));
      bpmBar.value = newBpm;
      spaceBpm = false;
      spaceBarMessage.style.display = "none";
    }
    if (counter < 4) {
      dots[counter++].style.backgroundColor = "green";
    }
  }
});
