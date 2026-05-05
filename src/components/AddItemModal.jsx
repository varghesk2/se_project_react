import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";

function AddItemModal({ isOpen, onCloseModal, onAddItem }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    imageUrl: "",
    weather: "warm",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onAddItem(values, resetForm);
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />

      <input
        name="imageUrl"
        value={values.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
      />

      <label>
        <input
          type="radio"
          name="weather"
          value="hot"
          onChange={handleChange}
        />
        Hot
      </label>

      <label>
        <input
          type="radio"
          name="weather"
          value="warm"
          onChange={handleChange}
          checked={values.weather === "warm"}
        />
        Warm
      </label>

      <label>
        <input
          type="radio"
          name="weather"
          value="cold"
          onChange={handleChange}
        />
        Cold
      </label>
    </ModalWithForm>
  );
}

export default AddItemModal;
