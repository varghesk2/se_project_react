import { useContext } from "react";
import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import ItemCard from "./ItemCard";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems = [], onCardClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temp = weatherData?.temperature?.[currentTemperatureUnit];

  return (
    <main className="main">
      <section className="weather">
        <h2 className="weather__temp">
          {temp !== undefined
            ? `${temp}°${currentTemperatureUnit}`
            : "Loading..."}
        </h2>
      </section>

      <p className="main__description">
        Today is{" "}
        {temp !== undefined ? `${temp}°${currentTemperatureUnit}` : "..."} / You
        may want to wear:
      </p>

      <section className="cards">
        {Array.isArray(clothingItems) &&
          clothingItems.map((item) => (
            <ItemCard key={item.id} item={item} onCardClick={onCardClick} />
          ))}
      </section>
    </main>
  );
}

export default Main;
