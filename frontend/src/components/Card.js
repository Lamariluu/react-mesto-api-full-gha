import React, { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
	const currentUser = useContext(CurrentUserContext);
	const isOwner = card.owner._id === currentUser._id; // Определяем, являемся ли мы владельцем текущей карточки
	//const isOwner = card.owner === currentUser._id;
	const isLiked = card.likes.some(i => i._id === currentUser._id); // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
	//const isLiked = card.likes.some(id => id === currentUser._id);
	const cardLikeButtonClassName = `element__like link ${isLiked ? 'element__like_active' : ''}`; 	// Создаём переменную, которую после зададим в `className` для кнопки лайка
	const cardTrashButtonClassName = `element__trash link ${isOwner ? 'element__trash_active' : ''}`;

	const handleClick = () => {
		onCardClick(card);
	}

	const handleClickLikeCard = () => {
		onCardLike(card);
	}

	const handleDeleteClick = () => {
		onCardDelete(card);
	}

	return (
		<li className="element">
			<img
				className="element__photo"
				src={card.link}
				alt={card.name}
				onClick={handleClick}
			/>
			<div className="element__group">
				<h2 className="element__title">{card.name}</h2>
				<div className="element__like-container">
					<button
						className={cardLikeButtonClassName}
						type="button"
						aria-label="Лайк"
						onClick={handleClickLikeCard}
					/>
					<p className="element__like-counter">{card.likes.length}</p>
				</div>
			</div>
			<button
				className={cardTrashButtonClassName}
				type="button"
				aria-label="Корзина"
				onClick={handleDeleteClick}
			/>
		</li>
	);
}

export default Card;