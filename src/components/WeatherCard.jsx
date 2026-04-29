import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData?.temperature?.[currentTemperatureUnit];

  return (
    <p>
      {temp}°{currentTemperatureUnit}
    </p>
  );
}

export default WeatherCard;
