import PopupWithForm from "./PopupWithForm";

function ConfirmDeletePopup({ onCardDelete, card, isOpen, onClose, onCloseClick }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      btnText="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onCloseClick={onCloseClick}
    ></PopupWithForm>
  );
}

export default ConfirmDeletePopup;