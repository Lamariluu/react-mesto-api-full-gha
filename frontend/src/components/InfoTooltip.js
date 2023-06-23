//import React from 'react';

function InfoTooltip({ isOpen, onClose, title, image }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          aria-label="Закрыть"
          className="popup__close popup__close_register link"
          onClick={onClose}
        />
        <img className="popup__status-img" src={image} alt="изображение состояния" />
        <h2 className="popup__status-text">{title}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;