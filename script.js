window.speechRecognition =
  window.speechRecognition || window.webkitSpeechRecognition;

const recognition = new webkitSpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
let date = document.createElement('div');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  p.textContent = transcript;

  getDate(transcript);
  getWeather(transcript);

  if (e.results[0].isFinal) {
    p = document.createElement('p');
  }

  words.appendChild(p);
});

function getDate(transcript) {
  const conditions = ['cyrus date', 'cyrus what day is it', 'cyrus get date'];
  //running function if any of these phrases are called
  if (conditions.some((condition) => transcript.includes(condition))) {
    console.log(new Date().toString(), 'string');
  }
  date.textContent = new Date().toString();
  words.appendChild(date);
}

function getWeather(transcript) {
  //need weather api to fetch from
  if (transcript.includes('weather')) {
    console.log('fetching weather api');
  }
}

recognition.addEventListener('end', recognition.start);

recognition.start();
