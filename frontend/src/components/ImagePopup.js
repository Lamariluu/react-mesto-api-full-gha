function ImagePopup({ card, onClose }) {
	return (
		<div className={`popup popup_big-img ${card.link ? "popup_opened" : ""}`}>
			<div className="popup__container-img">
				<button
					className="popup__close popup__close_img link"
					type="button"
					aria-label="Закрыть"
					onClick={onClose}
				/>
				<figure className="popup__figure">
					<img
						className="popup__img"
						src={card.link}
						alt={card.name}
					/>
					<figcaption className="popup__img-caption">{card.name}</figcaption>
				</figure>
			</div>
		</div>
	)
}

export default ImagePopup;