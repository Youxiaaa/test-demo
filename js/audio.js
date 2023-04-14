const audio = document.getElementById('myAudio');

function playAudio() {
  audio.play();
}

function pauseAudio() {
  audio.pause();
}

function changeSpeed(speed) {
  audio.playbackRate = speed;
}

function changeVolume(volume) {
  audio.volume = volume;
}

function setupVolume() {
  audio.volume = 0.5
}

setupVolume()
