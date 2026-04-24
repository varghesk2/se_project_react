import "../blocks/Header.css";
import profilePic from "../images/profile.png";

function Header({ handleAddClick, weatherData, tempUnit, onToggleUnit }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <h1 className="header__logo">wtwr°</h1>
        <p className="header__date-location">
          {currentDate}, {weatherData?.city || "Loading..."}
        </p>
      </div>

      <div className="header__right">
        <button
          type="button"
          className="toggle"
          onClick={onToggleUnit}
          aria-label={`Switch temperature to ${
            tempUnit === "F" ? "Celsius" : "Fahrenheit"
          }`}
        >
          <span className={`toggle__label ${tempUnit === "F" ? "active" : ""}`}>
            F
          </span>
          <span className={`toggle__label ${tempUnit === "C" ? "active" : ""}`}>
            C
          </span>
          <span
            className={`toggle__circle ${
              tempUnit === "C" ? "toggle__circle_right" : ""
            }`}
          />
        </button>

        <button
          className="header__add-button"
          onClick={handleAddClick}
          type="button"
        >
          + Add clothes
        </button>

        <div className="header__user">
          <p className="header__username">Kevin Varghese</p>
          <img src={profilePic} alt="User avatar" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
