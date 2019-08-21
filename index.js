const axios = require("axios");

const outerWear = [
  { name: "Cashmere coat", maxTemp: 15, minTemp: 0, waterRating: 0},
  { name: "Rain mac", maxTemp: 25, minTemp: 10, waterRating: 1},
  { name: "Duffel coat", maxTemp: 12, minTemp: -5, waterRating: 0.5}
];

async function getWeather() {
  try {
    const result = await axios.get(
      "https://api.darksky.net/forecast/63c7e1fe04debd05e2a196e39bc9e9c4/51.509865,-0.118092?units=si"
    );

    const currentWeather = result.data.currently;
    const { temperature, precipProbability } = currentWeather;

    const outfit = getOutfit(temperature, precipProbability);

    console.log(precipProbability);

    console.log(`Current temperature: ${temperature}`);
    console.log(`Today's a great day for a ${outfit}.`);


  } catch (e) {
    console.error(e);
  }
}

function getOutfit(temperature, chanceOfRain) { // chanceOfRain is precipProbability (the second argument)

  const options = outerWear.filter(outfit =>
    temperature >= outfit.minTemp &&
    temperature <= outfit.maxTemp &&
    chanceOfRain <= outfit.waterRating
  );

  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex].name;

}

getWeather();
