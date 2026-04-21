import "../blocks/ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  buttonText,
  isOpen,
  onClose,
  onSubmit, 
  children,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? "modal_is-opened" : ""}`}
      onClick={onClose}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="Close" />

        <h2>{title}</h2>

        <form
          name={name}
          onSubmit={onSubmit} 
        >
          {children}
          <button type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;