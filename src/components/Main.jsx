import ItemCard from "./ItemCard";
import "../blocks/Main.css";

function Main({ weatherData, clothingItems, onCardClick, tempUnit }) {
  const getTemp = () => {
    if (!weatherData?.temp) return "Loading...";

    if (tempUnit === "F") {
      return `${weatherData.temp}°F`;
    }

    const celsius = Math.round((weatherData.temp - 32) * (5 / 9));
    return `${celsius}°C`;
  };

  return (
    <main className="main">
      <section className="weather">
        <h2 className="weather__temp">{getTemp()}</h2>
      </section>

      <p className="main__description">
        Today is {getTemp()} / You may want to wear:
      </p>

      <section className="cards">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
