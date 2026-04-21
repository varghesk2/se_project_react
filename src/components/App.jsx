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
  const [selectedCard, setSelectedCard] = useState({});

  useEffect(() => {
    setClothingItems(defaultClothingItems);
  }, []);

  useEffect(() => {
    getWeather(coordinates, API_KEY)
      .then((data) => {
        const processedWeatherData = processWeatherData(data);
        setWeatherData(processedWeatherData);
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

  const closeOnOverlayClick = (e) => {
    if (e.target.classList.contains("modal_is-opened")) {
      closeActiveModal();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      closeActiveModal();
    }
  };

  useEffect(() => {
    if (!activeModal) return;

    document.addEventListener("mousedown", closeOnOverlayClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", closeOnOverlayClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  const handleAddGarmentSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const imageUrl = form.imageUrl.value;
    const weather = form["weather-type-select"].value;

    const newItem = {
      name,
      imageUrl,
      weather,
      _id: Date.now(),
    };

    setClothingItems((prev) => [newItem, ...prev]);

    closeActiveModal();
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />

        <Main
          weatherData={weatherData}
          onCardClick={handleCardClick}
          clothingItems={clothingItems}
        />

        <Footer />
      </div>

      <ModalWithForm
        name="add-garment"
        title="New garment"
        buttonText="Add garment"
        onClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}
        onSubmit={handleAddGarmentSubmit}
      >

        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            id="name"
            name="name" 
            className="modal__input"
            placeholder="Name"
            required
          />
        </label>

        
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            id="imageUrl"
            name="imageUrl" 
            className="modal__input"
            placeholder="Image Url"
            required
          />
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          <label className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather-type-select"
              value="hot"
              className="modal__radio-input"
            />
            Hot
          </label>

          <label className="modal__label modal__label_type_radio">
            <input
              type="radio"
              name="weather-type-select"
              value="warm"
              className="modal__radio-input"
              defaultChecked 
            />
            Warm
          </label>

          <label className="modal__label modal__label_type_radio">
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
        onClose={closeActiveModal}
        isOpen={activeModal === "preview"}
      />
    </div>
  );
}

export default App;
