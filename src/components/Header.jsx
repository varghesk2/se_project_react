import "../blocks/Header.css";
import ToggleSwitch from "./ToggleSwitch";
import { Link } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  isLoggedIn,
  onLoginClick,
  onRegisterClick,
  onLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser?.name?.charAt(0).toUpperCase();

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

        {isLoggedIn ? (
          <>
            <button
              className="header__add-button"
              onClick={handleAddClick}
              type="button"
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__user">
              <p className="header__username">
                {currentUser?.name || "User"}
              </p>

              {currentUser?.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="User avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar header__avatar_placeholder">
                  {userInitial}
                </div>
              )}
            </Link>

            <button
              className="header__logout"
              onClick={onLogout}
              type="button"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <button
              className="header__auth-button"
              onClick={onLoginClick}
              type="button"
            >
              Log in
            </button>

            <button
              className="header__auth-button"
              onClick={onRegisterClick}
              type="button"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;