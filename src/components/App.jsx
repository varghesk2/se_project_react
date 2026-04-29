import { useEffect, useState } from "react";
import "../blocks/App.css";

import Header from "./Header";
import Main from "./Main";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import Footer from "./Footer";

import {
  API_KEY,
  coordinates,
  defaultClothingItems,
} from "../utils/constants";
import { getWeather, processWeatherData } from "../utils/weatherApi";

import CurrentTemperatureUnitContext from "../contexts/CurrentTemperatureUnitContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
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
    const normalizedItems = defaultClothingItems.map((item) => ({
      ...item,
      imageUrl: item.imageUrl || item.link,
    }));

    setClothingItems(normalizedItems);
  }, []);

  useEffect(() => {
    getWeather(coordinates, API_KEY)
      .then((data) => {
        setWeatherData(processWeatherData(data));
      })
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

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const newItem = {
      name: form.name.value,
      imageUrl: form.imageUrl.value,
      weather: form["weather-type-select"].value,
      _id: Date.now(),
    };

    setClothingItems((prev) => [newItem, ...prev]);
    closeActiveModal();
  };

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
          />

          <Main
            weatherData={weatherData}
            clothingItems={clothingItems}
            onCardClick={handleCardClick}
          />

          <Footer />
        </div>

        <ModalWithForm
          name="add-garment"
          title="New garment"
          buttonText="Add garment"
          isOpen={activeModal === "add-garment"}
          onClose={closeActiveModal}
          onSubmit={handleAddGarmentSubmit}
        >
          <label className="modal__label">
            Name
            <input
              type="text"
              name="name"
              className="modal__input"
              placeholder="Name"
              required
            />
          </label>

          <label className="modal__label">
            Image
            <input
              type="url"
              name="imageUrl"
              className="modal__input"
              placeholder="Image URL"
              required
            />
          </label>

          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">
              Select the weather type:
            </legend>

            <label className="modal__label_type_radio">
              <input type="radio" name="weather-type-select" value="hot" />
              Hot
            </label>

            <label className="modal__label_type_radio">
              <input
                type="radio"
                name="weather-type-select"
                value="warm"
                defaultChecked
              />
              Warm
            </label>

            <label className="modal__label_type_radio">
              <input type="radio" name="weather-type-select" value="cold" />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>

        <ItemModal
          card={selectedCard}
          isOpen={activeModal === "preview"}
          onClose={closeActiveModal}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
