
import "../blocks/Header.css";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <h1>WTWR</h1>
      <p>{currentDate}</p>
      <p>{weatherData?.city}</p>

      <button onClick={handleAddClick}>Add Clothes</button>

      <div className="header__user">
        <p>User Name</p>
        <img src="https://placehold.co/40" alt="User avatar" />
      </div>
    </header>
  );
}

export default Header;
