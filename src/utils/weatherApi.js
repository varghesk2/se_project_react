export function getWeather(coordinates, API_KEY) {
  const { lat, lon } = coordinates;

  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`,
  ).then((res) => {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  });
}

export function processWeatherData(data) {
  const tempF = Math.round(data.main.temp);

  return {
    temperature: {
      F: tempF,
      C: Math.round((tempF - 32) * (5 / 9)),
    },
    city: data.name,
  };
}

export function getWeatherCondition(temp) {
  if (temp >= 86) return "hot";
  if (temp >= 66) return "warm";
  return "cold";
}
