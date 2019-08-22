const axios = require("axios");

const outerWear = [
  { name: "Cashmere coat", maxTemp: 15, minTemp: 0, waterRating: 0},
  { name: "Rain mac", maxTemp: 25, minTemp: 10, waterRating: 1},
  { name: "Duffel coat", maxTemp: 12, minTemp: -5, waterRating: 0.5}
];

const bottoms = [
  { name: "black jeans", maxTemp: 15, minTemp: -100, waterRating: 1},
  { name: "blue jeans", maxTemp: 15, minTemp: -100, waterRating: 1},
  { name: "white jeans", maxTemp: 15, minTemp: -100, waterRating: 0},
  { name: "floaty skirt", maxTemp: 100, minTemp: 15, waterRating: 0.5},
  { name: "summer dress", maxTemp: 100, minTemp: 15, waterRating: 0.5},
  { name: "sleeved dress", maxTemp: 15, minTemp: 5, waterRating: 1},
];

const tops = [
  { name: "merino jumper", maxTemp: 15, minTemp: 3},
  { name: "silky strap top", maxTemp: 25, minTemp: 5},
  { name: "plain t shirt", maxTemp: 100, minTemp: 10},
  { name: "cardigan", maxTemp: 28, minTemp: 0},
  { name: "wooly jumper", maxTemp: 8, minTemp: -100},
  { name: "shirt", maxTemp: 20, minTemp: -100}
];

const shoes = [
  { name: "plimsols", maxTemp: 100, minTemp: 10, waterRating: 0},
  { name: "trainers", maxTemp: 15, minTemp: -100, waterRating: 1},
  { name: "high heels", maxTemp: 100, minTemp: 7, waterRating: 0.5},
  { name: "wedges", maxTemp: 100, minTemp: 12, waterRating: 0},
  { name: "flats", maxTemp: 100, minTemp: 8, waterRating: 0.5}
];



async function getWeather() {
  try {
    const result = await axios.get(
      "https://api.darksky.net/forecast/63c7e1fe04debd05e2a196e39bc9e9c4/51.509865,-0.118092?units=si"
    );

    const currentWeather = result.data.currently;
    const { temperature, precipProbability } = currentWeather;

    const coat = getOuterWear(temperature, precipProbability);
    const todaysBottom = getBottoms(temperature);
    const todaysTop = getTops(temperature);
    const todaysShoes = getShoes(temperature, precipProbability);

    // console.log(precipProbability);

    console.log(`Current temperature: ${temperature}`);
    console.log(`Today's a great day for a ${coat}.`);
    console.log(`Today you should wear ${todaysTop} with ${todaysBottom} and ${todaysShoes}.`);

  } catch (e) {
    console.error(e);
  }
}

getWeather();

function getOuterWear(temperature, chanceOfRain) { // chanceOfRain is precipProbability (the second argument)

  const options = outerWear.filter(outfit =>
    temperature >= outfit.minTemp &&
    temperature <= outfit.maxTemp &&
    chanceOfRain <= outfit.waterRating
  );

  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex].name;

};

function getBottoms(temperature) {
  const options = bottoms.filter(outfit =>
    temperature >= outfit.minTemp &&
    temperature <= outfit.maxTemp
  );

  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex].name;
};


function getTops(temperature) {
  const options = tops.filter(outfit =>
    temperature >= outfit.minTemp &&
    temperature <= outfit.maxTemp
  );

  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex].name;
};

function getShoes(temperature, chanceOfRain) {

  const options = shoes.filter(outfit =>
    temperature >= outfit.minTemp &&
    temperature <= outfit.maxTemp &&
    chanceOfRain <= outfit.waterRating
  );

  const randomIndex = Math.floor(Math.random() * options.length);

  return options[randomIndex].name;

};
