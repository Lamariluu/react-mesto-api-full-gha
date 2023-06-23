import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ onClose, onUpdateUser, onLoading, isOpen }) {
	const currentUser = useContext(CurrentUserContext);
	const [about, setAbout] = useState('');
	const [name, setName] = useState('');

	useEffect(() => {
		setName(currentUser.name);
		setAbout(currentUser.about);
	}, [currentUser, isOpen]);

	const handleSubmit = (e) => {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		onUpdateUser({
			name: name,
			about: about,
		});
	};

	const handleChangeName = (e) => {
		setName(e.target.value);
	};

	const handleChangeAbout = (e) => {
		setAbout(e.target.value);
	};

	return (
		<PopupWithForm
			name="edit-profile"
			title="Редактировать профиль"
			buttonSubmit={onLoading ? `Сохранение` : `Сохранить`}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				className="popup__input popup__input_type_name"
				id="username"
				type="text"
				name="username"
				placeholder="Имя пользователя"
				minLength="2"
				maxLength="40"
				required
				value={name || ""}
				onChange={handleChangeName}
			/>
			<span className="popup__input-error username-error" />
			<input
				className="popup__input popup__input_type_bio"
				id="userbio"
				type="text"
				name="userbio"
				placeholder="Описание"
				minLength="2"
				maxLength="200"
				required
				value={about || ""}
				onChange={handleChangeAbout}
			/>
			<span className="popup__input-error userbio-error" />
		</PopupWithForm>
	);
}

export default EditProfilePopup;