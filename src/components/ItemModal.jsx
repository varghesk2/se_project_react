import "../blocks/ItemModal.css";

function ItemModal({ card, isOpen, onClose }) {
  if (!card) return null;

  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content modal__content_type_item"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        />

        <img
          src={card?.imageUrl}
          alt={card?.name || "Clothing item"}
          className="modal__image"
        />

        <div className="modal__footer">
          <p className="modal__name">{card?.name}</p>
          <p className="modal__weather">Weather: {card?.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
