import React, { useState } from "react";
import logo from "../../assets/gastrofreaklogo.png";
import Register from "./Register";
import { connect } from "react-redux";
import { setAlert } from "../../redux/actions/alerts";
import {
	loginUser,
	loadUser,
	registerUser
} from "../../redux/actions/authActions";
import { Redirect } from "react-router-dom";

const Login = ({
	setAlert,
	registerUser,
	isRegistered,
	loginUser,
	loadUser,
	isAuthenticated,
	loading
}) => {
	const [value, setValue] = useState({ email: "", password: "" });
	const { email, password } = value;
	const onChange = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};
	const onSubmit = async e => {
		e.preventDefault();
		if (!email || !password) {
			setAlert("Invalid Credentials", "danger");
			return;
		}
		await loginUser(email, password);
	};
	if (isAuthenticated) {
		loadUser();
		return <Redirect to="/" />;
	}
	return (
		<div className="container">
			<img src={logo} alt="GastroFreak Logo" />
			<div className="login-container">
				<div>
					<h2>Login</h2>
					<form onSubmit={onSubmit} className="form login">
						<div className="form__element">
							<label htmlFor="email">Email: </label>
							<input
								name="email"
								type="email"
								value={email}
								onChange={onChange}
								placeholder="Email"
							/>
						</div>
						<div className="form__element">
							<label htmlFor="password">Pasword: </label>
							<input
								name="password"
								type="password"
								value={password}
								onChange={onChange}
								placeholder="Password"
							/>
						</div>
						<div className="submit">
							<input className="btn" type="submit" value="Login" />
						</div>
					</form>
				</div>
				<div>
					<h2>or signup:</h2>
					<Register
						registerUser={registerUser}
						isRegistered={isRegistered}
						setAlert={setAlert}
						loading={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default connect(
	state => ({
		isRegistered: state.authReducer.isRegistered,
		isAuthenticated: state.authReducer.isAuthenticated,
		loading: state.authReducer.loading
	}),
	{ setAlert, registerUser, loginUser, loadUser }
)(Login);
