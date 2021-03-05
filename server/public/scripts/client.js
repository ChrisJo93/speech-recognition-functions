// Enable speech Recognition api
window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

//New instance of Speech Recognition
const recognition = new SpeechRecognition();
//Providing transcript text during speech detection
recognition.interimResults = true;

let p = document.createElement('p');
let city = 'Shreveport';
const words = document.querySelector('.words');
const weatherBox = document.querySelector('.weatherBox');
const topOfWeatherBox = weatherBox.offsetTop;

recognition.addEventListener('result', (e) => {
  //looping through all words in transcript
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  p.textContent = transcript;

  //checking isFinal. Prevents function running multiple times
  if (transcript.includes('date') && e.results[0].isFinal) {
    getDate();
  }
  if (transcript.includes('weather') && e.results[0].isFinal) {
    getWeather();
  }
  if (transcript.includes('location') && e.results[0].isFinal) {
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

// -------- **START WEATHER FUNCTIONS** --------- //

function weatherBoxPosition() {
  console.log(window.scrollY, topOfWeatherBox);
  if (window.scrollY >= topOfWeatherBox) {
    document.body.style.paddingTop = weatherBox.offSetHeight + 'px';
    document.body.classList.add('fixed-box');
  } else {
    document.body.style.paddingTop = 0;
    document.body.classList.remove('fixed-box');
  }
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

// -------- **END WEATHER FUNCTIONS** --------- //

function getLocation() {
  //need to implement geolocation. Data will be sent to weather api also
  console.log(`I'm here`);
}

recognition.addEventListener('end', recognition.start);
window.addEventListener('scroll', weatherBoxPosition);

recognition.start();
