import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ onClose, onAddPlace, onLoading, isOpen }) {
	const [placeName, setPlaceName] = useState('');
	const [placeLink, setPlaceLink] = useState('');

	useEffect(() => {
		setPlaceName('');
		setPlaceLink('');
	}, [isOpen]);

	const handleSubmit = (e) => {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		onAddPlace({
			name: placeName,
			link: placeLink,
		});
	};

	const handleChangePlaceName = (e) => {
		setPlaceName(e.target.value);
	};

	const handleChangePlaceLink = (e) => {
		setPlaceLink(e.target.value);
	};

	return (
		<PopupWithForm
			name="add-element"
			title="Новое место"
			buttonSubmit={onLoading ? `Сохранение` : `Создать`}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				className="popup__input popup__input_type_place-name"
				id="placename"
				type="text"
				name="name"
				placeholder="Название"
				minLength="2"
				maxLength="40"
				required
				value={placeName}
				onChange={handleChangePlaceName}
			/>
			<span className="popup__input-error placename-error" />
			<input
				className="popup__input popup__input_type_place-img"
				id="placeimg"
				type="url"
				name="link"
				placeholder="Ссылка на картинку"
				required
				value={placeLink}
				onChange={handleChangePlaceLink}
			/>
			<span className="popup__input-error placeimg-error" />
		</PopupWithForm>
	)
}

export default AddPlacePopup;