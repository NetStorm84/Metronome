let pBar = document.getElementById("progress-bar");
let metronome = document.getElementById('metronome');

let bpm = 60;           // beats per minute
let tick = 60 / bpm;    // time of one beats 

let timer;          // timer for background color change 
let pBarTimer;      // timer for progress bar

function getRandomColor() {     // generate random color code
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function bpmChange(val) {
    bpm = val;
    tick = 60 / bpm;
}

function move() {           // move progress bar

    let width = 1;
    id = setInterval(() => {
        if (width > 100) {
            width = 1;
        }
        else {
            pBar.style.width = width + "vw";
            width++;
        }
    }, tick * 10);        // this loop perform for every tick*10 seconds
}

function startMetronome() {              // change background color
    move();
    timer = setInterval(() => {
        metronome.style.background = getRandomColor();
        new Audio('assets/click.wav').play();
    }, tick * 1000);          // this loop perform after every tick*1000 seconds
}

function stopMetronome() {
    clearInterval(timer)
    clearInterval(id)
}