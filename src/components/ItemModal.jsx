import "../blocks/ItemModal.css";

function ItemModal({ card, isOpen, onClose }) {
  if (!card) return null;

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close" />

        <img src={card.link} alt={card.name} width="200" />
        <h2>{card.name}</h2>
        <p>Weather: {card.weather}</p>
      </div>
    </div>
  );
}

export default ItemModal;
