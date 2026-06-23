import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  const { currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData.type
  );

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <p className="main__description">
        Today is{" "}
        {weatherData.temperature?.[currentTemperatureUnit]}°
        {currentTemperatureUnit} / You may want to wear:
      </p>

      <section className="cards">
        {filteredItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;