import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import union from "../images/Union.png";
import ellipse from "../images/Ellipse.png";

import "../blocks/WeatherCard.css";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData?.temperature?.[currentTemperatureUnit];

  return (
    <section className="weather-card">
      <div className="weather-card__content">
        <p className="weather-card__temp">
          {temp}°{currentTemperatureUnit}
        </p>

        <div className="weather-card__icon-container">
          <img
            src={union}
            alt="Weather background shape"
            className="weather-card__cloud"
          />

          <img
            src={ellipse}
            alt="Weather icon accent"
            className="weather-card__sun"
          />
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;
