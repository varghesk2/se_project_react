import "../blocks/DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) {
  return (
    <div
      className={`modal ${isOpen ? "modal_is-opened" : ""}`}
      onClick={isLoading ? undefined : onClose}
    >
      <div
        className="modal__content delete-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          disabled={isLoading}
          aria-label="Close modal"
        />

        <h2 className="delete-modal__title">
          Are you sure you want to delete this item? This action is irreversible.
        </h2>

        <div className="delete-modal__buttons">
          <button
            type="button"
            className="delete-modal__confirm"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes, delete item"}
          </button>

          <button
            type="button"
            className="delete-modal__cancel"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;