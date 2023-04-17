const play__btn = document.querySelector('#play-btn');
const pause__btn = document.querySelector('#pause-btn');
const resume__btn = document.querySelector('#resume-btn');
const volumeInput = document.getElementById('volume');
const speech__text = document.querySelector('.speech__container').textContent;
let pause__text = speech__text

let utterance;
let currentPosition = 0;

let rateRef = 1;

function playSpeech() {
  utterance = new SpeechSynthesisUtterance(speech__text);
  utterance.lang = 'zh-TW';
  utterance.volume = parseFloat(volumeInput.value);
  utterance.rate = parseFloat(rateRef);

  utterance.onboundary = (event) => {
    if (event.name === 'word') {
      currentPosition = event.charIndex;
    }
  };

  speechSynthesis.speak(utterance);

  play__btn.style.display = 'none'
  pause__btn.style.display = 'block'
}

function pauseSpeech() {
  speechSynthesis.pause();

  pause__btn.style.display = 'none'
  resume__btn.style.display = 'block'
}

function resumeSpeech() {
  speechSynthesis.resume();

  pause__btn.style.display = 'block'
  resume__btn.style.display = 'none'
}

function stopSpeech() {
  speechSynthesis.cancel();

  play__btn.style.display = 'block'
  pause__btn.style.display = 'none'
  resume__btn.style.display = 'none'
}

function updateSpeech() {  
  const volume = parseFloat(volumeInput.value);
  const rate = parseFloat(rateRef);
  
  if (speechSynthesis.speaking) {
    // Cancel the current speech
    speechSynthesis.cancel();

    // Get the remaining text
    pause__text = speech__text.slice(currentPosition);

    // Create a new utterance with the remaining text
    const newUtterance = new SpeechSynthesisUtterance(pause__text);
    newUtterance.lang = 'zh-TW';
    newUtterance.volume = volume;
    newUtterance.rate = rate;

    // Set the onboundary event handler for the newUtterance
    newUtterance.onboundary = (event) => {
      if (event.name === 'word') {
        currentPosition = event.charIndex;
      }
    };

    // Speak the new utterance
    speechSynthesis.speak(newUtterance);
  }
}

function updateRate(num) {
  rateRef = num;

  const volume = parseFloat(volumeInput.value);
  const rate = parseFloat(rateRef);
  
  if (speechSynthesis.speaking) {
    // Cancel the current speech
    speechSynthesis.cancel();

    // Get the remaining text
    pause__text = speech__text.slice(currentPosition);

    // Create a new utterance with the remaining text
    const newUtterance = new SpeechSynthesisUtterance(pause__text);
    newUtterance.lang = 'zh-TW';
    newUtterance.volume = volume;
    newUtterance.rate = rate;

    // Set the onboundary event handler for the newUtterance
    newUtterance.onboundary = (event) => {
      if (event.name === 'word') {
        currentPosition = event.charIndex;
      }
    };

    // Speak the new utterance
    speechSynthesis.speak(newUtterance);
  }
}

window.addEventListener('beforeunload', (event) => {
  speechSynthesis.cancel();
});