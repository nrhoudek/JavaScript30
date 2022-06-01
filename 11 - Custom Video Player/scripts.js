// Get Elements of video player
const player = document.querySelector('.player__video');
const progressBar = document.querySelector('.progress');
const progressBarFilled = document.querySelector('.progress__filled');
const playButton = document.querySelector('.player__button.toggle');
const skipButtons = document.querySelectorAll('.player__button[data-skip]');
const volumeSlider = document.querySelector('input[name="volume"]');
const playbackRateSlider = document.querySelector('input[name="playbackRate"]');
let isPaused = true;

// Set Event Listeners
player.addEventListener('click', toggleVideo);
console.dir(player); //Left in for future reference
player.addEventListener('timeupdate', updateProgressBar);
playButton.addEventListener('click', toggleVideo);
volumeSlider.addEventListener('change', adjustVolume);
playbackRateSlider.addEventListener('change', adjustPlayBackRate);
skipButtons.forEach(button => button.addEventListener('click', skip));

//Progress Bar Scrubbing
let mousedown = false;
progressBar.addEventListener('click', scrub);
progressBar.addEventListener('mousemove', (e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', () => mousedown = true);
progressBar.addEventListener('mouseup', () => mousedown = false);
progressBar.addEventListener('mouseout', () => mousedown = false);

// Functions
function toggleVideo() {
	if(isPaused) {
		player.play()
		playButton.textContent = '⏸'
	} else{
		player.pause();
		playButton.textContent = '⏵︎'
	}
	isPaused = !isPaused;
}

function updateProgressBar() {
	const percent = (player.currentTime / player.duration) * 100;
	progressBarFilled.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
	player.currentTime = scrubTime;
}

function adjustVolume(e) {
	player.volume = e.target.value;
}

function adjustPlayBackRate(e) {
	player.playbackRate = e.target.value;
}

function skip() {
	let videoStart = 0;
	let videoEnd = player.duration;
	let newTime = player.currentTime + parseInt((this.dataset.skip));

	if (newTime <= videoStart) {
		player.currentTime = `${videoStart}`;
	} else if (newTime >= videoEnd) {
		player.currentTime = `${videoEnd}`;
	} else {
		player.currentTime = `${newTime}`;
	}
}