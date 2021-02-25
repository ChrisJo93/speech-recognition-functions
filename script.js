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
  const conditions = ['date', 'what day is it', 'get date'];
  //running function if any of these phrases are called
  if (conditions.some((condition) => transcript.includes(condition))) {
    console.log('that worked');
  }
  // if (transcript.includes('Cyrus get date')) {
  //   console.log(new Date().toString(), 'string');
  // }
}

// function contains(target, pattern){
//   var value = 0;
//   pattern.forEach(function(word){
//     value = value + target.includes(word);
//   });
//   return (value === 1)
// }

function getWeather(transcript) {
  //need weather api to fetch from
  if (transcript.includes('weather')) {
    console.log('fetching weather api');
  }
}

recognition.addEventListener('end', recognition.start);

recognition.start();
