import "../blocks/DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal__close" onClick={onClose} />

        <h2 className="delete-modal__title">
          Are you sure you want to delete this item? This action is irreversable.
        </h2>

        <div className="delete-modal__buttons">
          <button className="delete-modal__confirm" onClick={onConfirm}>
            Yes, delete item
          </button>

          <button className="delete-modal__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
