function PopupWithForm({ name, title, buttonSubmit, children, onClose, onSubmit, isOpen }) {
	return (
		<div className={`popup ${isOpen ? "popup_opened" : ""}`} id={`popup-${name}`}>
			<div className="popup__container">
				<button
					className="popup__close popup__close_edit link"
					type="button"
					aria-label="Закрыть"
					onClick={onClose}
				/>
				<form
					className="popup__form popup__form_edit"
					name={`${name}-form`}
					noValidate=""
					onSubmit={onSubmit}
				>
					<h3 className="popup__title">{title}</h3>
					{children}
					<button className="popup__save" type="submit">
						{buttonSubmit || 'Сохранить'}
					</button>
				</form>
			</div>
		</div>
	);
}

export default PopupWithForm;