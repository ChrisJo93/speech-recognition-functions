window.SpeechRecognition =
  //set variable to SpeechReg or webkitSpeech depending on browser
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
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

  if (transcript.includes('date')) {
    getDate(e);
  }
  if (transcript.includes('weather')) {
    getWeather(e);
  }

  if (e.results[0].isFinal) {
    p = document.createElement('p');
  }

  words.appendChild(p);
  console.log('call 1');
});

function getDate(e) {
  // //requires "cyrus" name. Providing different options to call date
  // const conditions = ['date', 'cyrus what day is it', 'cyrus get date'];
  // //running function if any of these phrases are called
  // if (conditions.some((condition) => transcript.includes(condition))) {
  // }
  console.log(new Date().toString(), 'string');
  p.textContent = new Date().toString();

  console.log('call 2');
}

function getWeather(e) {
  console.log('call 3');

  axios
    .get('/')
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(err);
    });
}

recognition.addEventListener('end', recognition.start);

recognition.start();
