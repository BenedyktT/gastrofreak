import React, { useState } from "react";
import logo from "../../assets/gastrofreaklogo.svg";
import Register from "./Register";

const Login = () => {
	const [value, setValue] = useState({ email: "", password: "" });
	const { email, password } = value;
	const onChange = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};

	return (
		<div className="container">
			<img src={logo} alt="GastroFreak Logo" />
			<div className="login-container">
				<div>
					<h2>Login</h2>
					<form className="form login">
						<div className="form__element">
							<label htmlFor="email">Email: </label>
							<input
								name="email"
								type="email"
								value={email}
								onChange={onChange}
							/>
						</div>
						<div className="form__element">
							<label htmlFor="password">Pasword: </label>
							<input
								name="password"
								type="password"
								value={password}
								onChange={onChange}
							/>
						</div>
						<div className="submit">
							<input type="submit" value="Login" />
						</div>
					</form>
				</div>
				<div>
					<h2>or signup:</h2>
					<Register />
				</div>
			</div>
		</div>
	);
};

export default Login;
