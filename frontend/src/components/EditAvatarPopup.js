import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ onLoading, onClose, onEditAvatar, isOpen }) {
	const avatarRef = useRef('');

	useEffect(() => {
		avatarRef.current.value = '';
	}, [isOpen])

	const handleSubmit = (e) => {
		// Запрещаем браузеру переходить по адресу формы
		e.preventDefault();
		// Передаём значения управляемых компонентов во внешний обработчик
		onEditAvatar({
			avatar: avatarRef.current.value
		});
	};

	return (
		<PopupWithForm
			name="change-avatar"
			title="Обновить аватар"
			buttonSubmit={onLoading ? `Сохранение` : `Сохранить`}
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
		>
			<input
				className="popup__input popup__input_type_avatar"
				id="avatar"
				type="url"
				name="avatar"
				placeholder="Ссылка на аватар"
				required
				ref={avatarRef}
			/>
			<span className="popup__input-error avatar-error" />
		</PopupWithForm>
	)
}

export default EditAvatarPopup;