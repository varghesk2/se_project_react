import { useContext, useEffect } from "react";
import ModalWithForm from "./ModalWithForm";
import useForm from "../hooks/useForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfileModal({
  isOpen,
  onClose,
  onUpdateProfile,
  isLoading = false,
}) {
  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
  });

  useEffect(() => {
    if (currentUser && isOpen) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen, resetForm]);

  const isFormValid =
    values.name.trim() && values.avatar.trim();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLoading || !isFormValid) {
      return;
    }

    onUpdateProfile(values.name, values.avatar, resetForm);
  };

  return (
    <ModalWithForm
      name="edit-profile"
      title="Edit profile"
      buttonText={isLoading ? "Saving..." : "Save changes"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={!isFormValid}
      isLoading={isLoading}
    >
      <label className="modal__label">
        Name
        <input
          className="modal__input"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name"
          minLength="2"
          maxLength="30"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          className="modal__input"
          type="url"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;