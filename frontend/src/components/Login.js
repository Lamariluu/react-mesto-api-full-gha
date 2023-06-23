import { useState } from 'react';

function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleChangeEmail = (evt) => {
		setEmail(evt.target.value);
	};

	const handleChangePassword = (evt) => {
		setPassword(evt.target.value);
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		props.onLogin(email, password);
	};

	return (
		<div className="register">
			<div className="register__container">
				<form
					className="register__form"
					name="login"
					onSubmit={handleSubmit}
				>
					<h2 className="register__title">Вход</h2>
					<input
						className="register__input"
						name="login-email"
						type="email"
						placeholder="Email"
						value={email}
						onChange={handleChangeEmail}
						autoComplete="on"
						required
					/>
					<input
						className="register__input"
						name="login-password"
						type="password"
						placeholder="Пароль"
						value={password}
						onChange={handleChangePassword}
						autoComplete="on"
						required
					/>
					<button className="register__save link" type="submit">Войти</button>
				</form>
			</div>
		</div>
	);
};

export default Login;