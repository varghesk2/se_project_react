import "../blocks/Header.css";
import profilePic from "../images/profile.png";
import ToggleSwitch from "./ToggleSwitch";

function Header({ handleAddClick, weatherData }) {
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
        <ToggleSwitch />

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
