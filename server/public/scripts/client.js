window.SpeechRecognition =
  //set variable to SpeechReg or webkitSpeech depending on browser
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement('p');
const words = document.querySelector('.words');
const weatherBox = document.querySelector('.weatherBox');

words.appendChild(p);

recognition.addEventListener('result', (e) => {
  //looping through all words in transcript
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  p.textContent = transcript;

  //checking isFinal. Prevents function running multiple times
  if (transcript.includes('date') && e.results[0].isFinal) {
    //call date
    getDate();
  }
  if (transcript.includes('weather') && e.results[0].isFinal) {
    //call weather
    getWeather();
  }

  if (transcript.includes('location') && e.results[0].isFinal) {
    //call location
    getLocation();
  }

  if (e.results[0].isFinal) {
    p = document.createElement('p');
    console.log(transcript);
  }

  words.appendChild(p);
});

function getDate() {
  console.log(new Date().toString(), 'string');
  p.textContent = new Date().toString();
}

function weatherRemover() {
  weatherBox.classList.remove('weatherBoxActive');
  weatherBox.classList.add('weatherBox');
}
function getWeather() {
  //asking server for weather key. Defensive code.
  axios
    .get('/weather')
    .then((response) => {
      //running actual api call with weather key.
      getWeatherData(response.data);
      console.log({ response });
    })
    .catch((error) => {
      console.log(error);
    });
  weatherBox.classList.remove('weatherBox');
  weatherBox.classList.add('weatherBoxActive');
  setTimeout(weatherRemover, 10000);
}

let city = 'Shreveport';
function getWeatherData(key) {
  //returning response from weather api call.
  return axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${key}`
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getLocation() {
  //need to implement geolocation. Data will be sent to weather api also
  console.log(`I'm here`);
}

recognition.addEventListener('end', recognition.start);

recognition.start();
