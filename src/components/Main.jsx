
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import WeatherCard from "./WeatherCard";
import ItemCard from "./ItemCard";
import "../blocks/Main.css";

function Main({
  weatherData,
  clothingItems,
  onCardClick,
  onCardLike,
}) {
  const { currentTemperatureUnit } = useContext(
    CurrentTemperatureUnitContext
  );

  const currentWeather = weatherData?.type?.trim().toLowerCase();

  const filteredItems = currentWeather
    ? clothingItems.filter(
        (item) =>
          item.weather?.trim().toLowerCase() === currentWeather
      )
    : clothingItems;

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <p className="main__description">
        Today is{" "}
        {weatherData.temperature?.[currentTemperatureUnit] ?? "--"}°
        {currentTemperatureUnit} / You may want to wear:
      </p>

      <section className="cards">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
            />
          ))
        ) : (
          <p className="main__empty-message">
            No clothing items match today's weather yet.
          </p>
        )}
      </section>
    </main>
  );
}

export default Main;
