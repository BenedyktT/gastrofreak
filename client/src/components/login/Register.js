import React, { useState, Fragment } from "react";
import { Redirect } from "react-router-dom";

const Register = ({ isRegistered, setAlert, registerUser }) => {
	const [value, setValue] = useState({
		email: "",
		password: "",
		repeatPassword: "",
		name: ""
	});
	const { email, password, repeatPassword, name } = value;
	const onChange = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};
	const onSubmit = async e => {
		e.preventDefault();
		if (!name || !password) {
			setAlert("All fields are required", "danger");
			return;
		}
		if (password !== repeatPassword) {
			setAlert("Password fields has to be the same", "danger");
			return;
		}

		registerUser(value);
	};
	if (isRegistered) {
		return <Redirect to="/" />;
	}
	return (
		<Fragment>
			<form onSubmit={onSubmit} className="form register">
				<div className="form__element">
					<label htmlFor="name">Name: </label>
					<input name="name" type="text" value={name} onChange={onChange} />
				</div>
				<div className="form__element">
					<label htmlFor="email">Email: </label>
					<input name="email" type="email" value={email} onChange={onChange} />
				</div>
				<div className="form__element">
					{" "}
					<label htmlFor="password">Pasword: </label>
					<input
						autoComplete="new-password"
						name="password"
						type="password"
						value={password}
						onChange={onChange}
					/>
				</div>
				<div className="form__element">
					{" "}
					<label htmlFor="repeatPassword">Repeat Pasword: </label>
					<input
						name="repeatPassword"
						type="password"
						value={repeatPassword}
						onChange={onChange}
					/>
				</div>
				<div className="submit">
					<input type="submit" value="Register" />
				</div>
			</form>
		</Fragment>
	);
};

export default Register;
