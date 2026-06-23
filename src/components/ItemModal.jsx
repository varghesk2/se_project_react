import "../blocks/ItemModal.css";

function ItemModal({ card, isOpen, onClose, onDelete }) {
  if (!isOpen || !card) {
    return null;
  }

  const fallbackImage =
    "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-shirt.png";

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
          src={card.imageUrl || fallbackImage}
          alt={card.name || "Clothing item"}
          className="modal__image"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />

        <div className="modal__footer">
          <p className="modal__name">{card.name || "Unnamed item"}</p>
          <p className="modal__weather">Weather: {card.weather || "Unknown"}</p>

          <button
            type="button"
            className="modal__delete"
            onClick={() => onDelete?.(card)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
