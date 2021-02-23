window.speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  p.textContent = transcript;

  console.log(transcript);

  if (e.results[0].isFinal) {
    p = document.createElement('p');

    words.appendChild(p);
  }
  console.log(transcript);
  if (transcript.includes('cool')) {
    console.log('this is the coolest shit omg.');
  }
});

function highlightWords() {
  console.log(this);
}

// p.forEach((p) => p.addEventListener('mouseenter', highlightWords));

recognition.addEventListener('end', recognition.start);

recognition.start();
