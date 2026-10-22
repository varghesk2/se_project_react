import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "../blocks/App.css";

import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import EditProfileModal from "./EditProfileModal";
import Footer from "./Footer";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../contexts/CurrentUserContext";

import { API_KEY, coordinates } from "../utils/constants";
import { getWeather, processWeatherData } from "../utils/weatherApi";
import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../utils/api";
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

  const [currentTemperatureUnit, setCurrentTemperatureUnit] =
    useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) =>
      prev === "F" ? "C" : "F"
    );
  };

  const closeActiveModal = () => {
    if (isLoading) {
      return;
    }

    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
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

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    const handleEsc = (e) => {
      if (e.key === "Escape" && !isLoading) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [activeModal, isLoading]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCardLike = async (card) => {
    if (!currentUser) {
      setActiveModal("login");
      return;
    }

    const isLiked = card.likes?.some(
      (userId) => userId === currentUser._id
    );

    try {
      const updatedCard = isLiked
        ? await removeCardLike(card._id)
        : await addCardLike(card._id);

      setClothingItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedCard._id ? updatedCard : item
        )
      );
    } catch (err) {
      console.error("Failed to update like:", err);
    }
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    setActiveModal("add-garment");
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleRegister = async (
    name,
    avatar,
    email,
    password,
    resetForm
  ) => {
    setIsLoading(true);

    try {
      await signup(name, avatar, email, password);

      const data = await signin(email, password);
      localStorage.setItem("jwt", data.token);

      const user = await checkToken(data.token);

      setCurrentUser(user);
      setIsLoggedIn(true);
      resetForm();
      setActiveModal("");
    } catch (err) {
      console.error("Registration failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (email, password, resetForm) => {
    setIsLoading(true);

    try {
      const data = await signin(email, password);
      localStorage.setItem("jwt", data.token);

      const user = await checkToken(data.token);

      setCurrentUser(user);
      setIsLoggedIn(true);
      resetForm();
      setActiveModal("");
    } catch (err) {
      console.error("Login failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    setActiveModal("");
    setSelectedCard(null);
    setCardToDelete(null);
  };

  const handleAddItem = async (item, resetForm) => {
    setIsLoading(true);

    try {
      const newItem = await addItem(item);

      setClothingItems((prevItems) => [newItem, ...prevItems]);
      resetForm();
      setActiveModal("");
    } catch (err) {
      console.error("Failed to add item:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (name, avatar, resetForm) => {
    setIsLoading(true);

    try {
      const updatedUser = await updateUser(name, avatar);

      setCurrentUser(updatedUser);
      resetForm();
      setActiveModal("");
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (card) => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    setCardToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleConfirmDelete = async () => {
    if (!cardToDelete || isLoading) {
      return;
    }

    setIsLoading(true);

    try {
      await deleteItem(cardToDelete._id);

      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== cardToDelete._id)
      );

      setActiveModal("");
      setSelectedCard(null);
      setCardToDelete(null);
    } catch (err) {
      console.error("Failed to delete item:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onAddClick={handleAddClick}
                      onLogout={handleLogout}
                      onEditProfile={handleEditProfile}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            onSwitchModal={() => setActiveModal("login")}
            isLoading={isLoading}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            onSwitchModal={() => setActiveModal("register")}
            isLoading={isLoading}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateProfile={handleUpdateProfile}
            isLoading={isLoading}
          />

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onCloseModal={closeActiveModal}
            onAddItem={handleAddItem}
            isLoading={isLoading}
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
  isLoading={isLoading}
/>
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;