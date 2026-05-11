import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import ItemCard from "./ItemCard";
import WeatherCard from "./WeatherCard";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems = [], onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <section className="weather">
        <WeatherCard weatherData={weatherData} />
      </section>

      <p className="main__description">
        Today is {weatherData.temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </p>

      <section className="cards">
        {Array.isArray(clothingItems) &&
          weatherData.type &&
          clothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
            ))}
      </section>
    </main>
  );
}

export default Main;
