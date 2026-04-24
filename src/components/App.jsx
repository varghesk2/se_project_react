import { useEffect, useState } from "react";
import "../blocks/App.css";

import Header from "./Header";
import Main from "./Main";
import ModalWithForm from "./ModalWithForm";
import ItemModal from "./ItemModal";
import Footer from "./Footer";

import { API_KEY, coordinates, defaultClothingItems } from "../utils/constants";
import { getWeather, processWeatherData } from "../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: null,
    city: "",
  });

  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);


  const [tempUnit, setTempUnit] = useState("F");

  const handleToggleUnit = () => {
    setTempUnit((prev) => (prev === "F" ? "C" : "F"));
  };

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
      <div className="page__content">
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData}
          tempUnit={tempUnit}
          onToggleUnit={handleToggleUnit}
        />

        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
          tempUnit={tempUnit}
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
          <legend className="modal__legend">Select the weather type:</legend>

          <label className="modal__label_type_radio">
            <input
              type="radio"
              name="weather-type-select"
              value="hot"
              className="modal__radio-input"
            />
            Hot
          </label>

          <label className="modal__label_type_radio">
            <input
              type="radio"
              name="weather-type-select"
              value="warm"
              defaultChecked
              className="modal__radio-input"
            />
            Warm
          </label>

          <label className="modal__label_type_radio">
            <input
              type="radio"
              name="weather-type-select"
              value="cold"
              className="modal__radio-input"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>

      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
