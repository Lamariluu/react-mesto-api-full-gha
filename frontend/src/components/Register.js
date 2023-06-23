import { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Register(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const navigate = useNavigate();

	function handleChangeEmail(evt) {
		setEmail(evt.target.value);
	}

	function handleChangePassword(evt) {
		setPassword(evt.target.value);
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();
		props.onRegister(email, password);
	}

	return (
		<div className="register">
			<div className="register__container">
				<form
					className="register__form"
					name="register"
					id="register-form"
					onSubmit={handleSubmit}
				>
					<h2 className="register__title">Регистрация</h2>
					<input
						className="register__input"
						name="register-email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleChangeEmail}
						autoComplete="on"
						required
					/>
					<input
						className="register__input"
						name="register-password"
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={handleChangePassword}
						autoComplete="on"
						required
					/>
					<button className="register__save link" type="submit">Зарегистрироваться</button>
					<p onClick={() => navigate("/sign-in")} className="register__question link">Уже зарегистрированы? Войти</p>
				</form>
			</div>
		</div>
	);
}

export default Register;