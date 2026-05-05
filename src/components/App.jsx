import { useEffect, useState } from "react";
import "../blocks/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Profile from "./Profile";
import AddItemModal from "./AddItemModal";
import ItemModal from "./ItemModal";
import Footer from "./Footer";

import { API_KEY, coordinates } from "../utils/constants";
import { getWeather, processWeatherData } from "../utils/weatherApi";
import { getItems, addItem, deleteItem } from "../utils/api";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    temperature: { F: null, C: null },
    city: "",
  });

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));
  };

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  useEffect(() => {
    getWeather(coordinates, API_KEY)
      .then((data) => setWeatherData(processWeatherData(data)))
      .catch(console.error);
  }, []);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEsc = (e) => e.key === "Escape" && closeActiveModal();
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeModal]);

  const handleAddItem = (item, resetForm) => {
    addItem(item).then((newItem) => {
      setClothingItems((prev) => [newItem, ...prev]);
      resetForm();
      closeActiveModal();
    });
  };

  const handleDeleteItem = (card) => {
    deleteItem(card.id).then(() => {
      setClothingItems((prev) => prev.filter((item) => item.id !== card.id));
      closeActiveModal();
    });
  };

  return (
    <BrowserRouter basename="/se_project_react">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleAddClick} weatherData={weatherData} />

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
                  />
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onCloseModal={closeActiveModal}
            onAddItem={handleAddItem}
          />

          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "preview"}
            onClose={closeActiveModal}
            onDelete={handleDeleteItem}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </BrowserRouter>
  );
}

export default App;
