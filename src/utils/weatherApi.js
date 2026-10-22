import { handleResponse } from "./api";

export function getWeather(coordinates, API_KEY) {
  const { lat, lon } = coordinates;

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
  ).then(handleResponse);
}

export function processWeatherData(data) {
  const tempF = Math.round(data.main.temp);

  return {
    temperature: {
      F: tempF,
      C: Math.round((tempF - 32) * (5 / 9)),
    },
    city: data.name,
    type: getWeatherCondition(tempF),
  };
}

export function getWeatherCondition(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";

  return "cold";
}