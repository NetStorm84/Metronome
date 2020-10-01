let minuteCount = 0;
let time = 0
let beatCount = 0;

let bpm = 60;
let tick = ((60 / bpm) * 10);

let progress = 0;
let timer;

// move();
// startMetronome();

function startMetronome(){

    move();

    timer = setInterval(() => {
        time++
        //interval is 1 10th of a second
        if (time >= tick){
            time = 0;
            var metronome = document.getElementById('metronome');
            metronome.style.background = getRandomColor();
            new Audio('assets/click.wav').play();
            move();
        }
        if (time % 10 == 0){
            // We can keep track of the seconds here
            minuteCount++;
        }
    }, 100);
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function move() {

    console.log(tick);
    if (progress == 0) {
        progress = 1;
        var elem = document.getElementById("progress-bar");
        var width = 1;
        var id = setInterval(() => {
        if (width >= 100) {
            clearInterval(id);
            progress = 0;
            } else {
            width++;
            elem.style.width = width + "%";
        }
    }, tick);}
}

function bpmChange(val){
    bpm = val;
    tick = ((60 / bpm) * 10);
    time = 0;

    clearInterval(timer);
    startMetronome();
}
