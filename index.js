const axios = require("axios");

async function getWeather() {
  try {
    const result = await axios.get(
      "https://api.darksky.net/forecast/63c7e1fe04debd05e2a196e39bc9e9c4/51.509865,-0.118092?units=si"
    );

    const currentWeather = result.data.currently;
    const { temperature } = currentWeather;

    console.log(`Current temperature: ${temperature}`);
  } catch (e) {
    console.error(e);
  }
}

getWeather();
