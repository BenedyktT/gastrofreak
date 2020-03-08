import React, { useState, Fragment } from "react";

const Register = () => {
	const [value, setValue] = useState({
		email: "",
		password: "",
		repeatPassword: ""
	});
	const { email, password, repeatPassword } = value;
	const onChange = e => {
		setValue({ ...value, [e.target.name]: e.target.value });
	};
	return (
		<Fragment>
			<form className="form register">
				<div className="form__element">
					<label htmlFor="email">Email: </label>
					<input name="email" type="email" value={email} onChange={onChange} />
				</div>
				<div className="form__element">
					{" "}
					<label htmlFor="password">Pasword: </label>
					<input
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
