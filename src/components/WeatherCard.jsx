import "../blocks/WeatherCard.css";

function WeatherCard({ temp }) {
  return (
    <div>
      <p>{temp}°F</p>
    </div>
  );
}

export default WeatherCard;
