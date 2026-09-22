import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "../blocks/App.css";

import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import Footer from "./Footer";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

import { API_KEY, coordinates } from "../utils/constants";
import { getWeather, processWeatherData } from "../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../utils/api";
import { signup, signin, checkToken } from "../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: {
      F: null,
      C: null,
    },
    city: "",
    type: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Failed to load items:", err);
      });
  }, []);

  useEffect(() => {
    getWeather(coordinates, API_KEY)
      .then((data) => {
        setWeatherData(processWeatherData(data));
      })
      .catch((err) => {
        console.error("Failed to load weather:", err);
      });
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  };

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeModal]);

  const handleRegister = (
    name,
    avatar,
    email,
    password,
    resetForm
  ) => {
    signup(name, avatar, email, password)
      .then(() => {
        return signin(email, password);
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogin = (email, password, resetForm) => {
    signin(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        return checkToken(data.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    closeActiveModal();
  };

  const handleAddItem = (item, resetForm) => {
    addItem(item)
      .then((newItem) => {
        setClothingItems((prev) => [newItem, ...prev]);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to add item:", err);
      });
  };

  const handleDeleteClick = (card) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = () => {
    if (!cardToDelete) {
      return;
    }

    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );

        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to delete item:", err);
      });
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            currentUser={currentUser}
            isLoggedIn={isLoggedIn}
            onLoginClick={() => setActiveModal("login")}
            onRegisterClick={() => setActiveModal("register")}
            onLogout={handleLogout}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  onAddClick={handleAddClick}
                  currentUser={currentUser}
                  onLogout={handleLogout}
                />
              }
            />
          </Routes>

          <Footer />
        </div>

        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          onRegister={handleRegister}
        />

        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          onLogin={handleLogin}
        />

        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onCloseModal={closeActiveModal}
          onAddItem={handleAddItem}
        />

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={closeActiveModal}
          onDelete={handleDeleteClick}
        />

        <DeleteConfirmationModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeActiveModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;