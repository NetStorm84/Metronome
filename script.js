window.addEventListener('DOMContentLoaded', (event) => {

	// sliders
	const radiusSlider = document.getElementById("radius");
	const beatSlider = document.getElementById('beat-speed');

	// slider values
	const radiusValue = document.getElementById('radius-value');
	const beatsValue = document.getElementById('beats-value');

	radiusValue.innerHTML = radiusSlider.value;
	beatsValue.innerHTML = beatSlider.value;

	// front and back pulses
	const front = document.getElementById('front');
	const back = document.getElementById('back');

	front.style.height = "100px";
	front.style.width = "100px";

	// audio file
	const audio = new Audio('assets/audio/click.wav');
	const ratio = 1.8;
	const muteAudioBtn = document.getElementById('mute-audio-btn');

	muteAudioBtn.addEventListener('click', () => {
		audio.muted = !audio.muted;
		muteAudioBtn.childNodes[0].src = audio.muted ? "./assets/images/mute-icon.png" : "./assets/images/unmute-icon.png";
		muteAudioBtn.childNodes[2].innerHTML = audio.muted ? "unmute audio" : "mute audio";
	})

	var isExpanded = false;

	radiusSlider.addEventListener("change", () => {
		radiusValue.innerHTML = radiusSlider.value;
		front.style.height = radiusSlider.value + "px";
		front.style.width = radiusSlider.value + "px";
		back.style.height = radiusSlider.value + "px";
		back.style.width = radiusSlider.value + "px";
	})

	let interval = (30 / beatSlider.value);

	beatSlider.addEventListener("change", () => {
		beatsValue.innerHTML = beatSlider.value;
		interval = (30 / beatSlider.value);
	})


	startMetronome();

	function modifyInterval() {
		return interval;
	}

	function startMetronome() {
		back.style.height = isExpanded ? front.style.height : (parseInt(front.style.height) * ratio) + "px";
		back.style.width = isExpanded ? front.style.width : (parseInt(front.style.width) * ratio) + "px";

		isExpanded = !isExpanded;

		back.style.transition = `width ${interval} ease-in, height ${interval} ease-in`;
		let tempInterval = modifyInterval();

		audio.play();

		setTimeout(startMetronome, tempInterval * 1000);
	}

});