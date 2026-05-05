import "../blocks/Header.css";
import profilePic from "../images/profile.png";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">
          wtwr°
        </Link>

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

        <Link to="/profile" className="header__user">
          <p className="header__username">Kevin Varghese</p>
          <img src={profilePic} alt="User avatar" className="header__avatar" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
