import "../blocks/ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit,
  children,
  isDisabled,
  isLoading = false,
  secondaryButtonText,
  onSecondaryButtonClick,
}) {
  return (
    <div
      className={`modal modal_type_${name || ""} ${
        isOpen ? "modal_is-opened" : ""
      }`}
      onClick={onClose}
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Close modal"
        />

        <h2 className="modal__title">{title}</h2>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <div className="modal__buttons">
            <button
              type="submit"
              className="modal__submit"
              disabled={isDisabled || isLoading}
            >
              {buttonText}
            </button>

            {secondaryButtonText && onSecondaryButtonClick && (
              <button
                type="button"
                className="modal__secondary-button"
                onClick={onSecondaryButtonClick}
                disabled={isLoading}
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;