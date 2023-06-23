import React, { useContext } from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Main({ cards, onAddPlace, onEditProfile, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt=""
          />
          <button className="profile__edit-avatar"
            type="button"
            onClick={onEditAvatar}
          ></button>
          <div className="profile__info">
            <div className="profile__edit">
              <h1 className="profile__username">{currentUser.name}</h1>
              <button
                className="profile__edit-button link"
                type="button"
                aria-label="Редактировать"
                onClick={onEditProfile}
              ></button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button link"
            type="button"
            aria-label="Добавить"
            onClick={onAddPlace}
          ></button>
        </div>
      </section>
      <section className="elements">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;