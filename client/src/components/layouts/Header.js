import React from "react";
import logo from "../../assets/gastrofreaklogo.svg";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
const Header = ({ isAuthenticated, user, logout }) => {
	return (
		<div className="header">
			<img src={logo} />
			<div className="header__greet">
				{isAuthenticated ? (
					<div>
						<div>{user && user.name}</div>
						<Link to="/" onClick={() => logout()}>
							Log out
						</Link>
					</div>
				) : (
					<Link to="/login">Login/SignUp</Link>
				)}
			</div>
		</div>
	);
};

export default connect(
	state => ({
		isAuthenticated: state.authReducer.isAuthenticated,
		user: state.authReducer.user
	}),
	{ logout }
)(Header);
