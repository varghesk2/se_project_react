import "../blocks/Main.css";

const Main = ({ weatherData, clothingItems, onCardClick }) => {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherData?.type,
  );

  return (
    <main className="main">
      <section className="main__weather">
        <p>Temperature: {weatherData?.temp}°F</p>
      </section>

      <ul className="main__items">
        {filteredItems.map((item) => (
          <li key={item._id}>
            <div onClick={() => onCardClick(item)}>
              <img src={item.link} alt={item.name} width="100" />
              <p>{item.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
