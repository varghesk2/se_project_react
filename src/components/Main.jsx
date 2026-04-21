import ItemCard from "./ItemCard";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems, onCardClick }) {
  return (
    <main className="main">
      <section className="weather">
        <h2 className="weather__temp">{weatherData.temp}°F</h2>
        <p className="weather__info">
          Today is {weatherData.type} in {weatherData.city}
        </p>
      </section>

      <section className="cards">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
