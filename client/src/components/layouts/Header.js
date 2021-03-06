import React from "react";
import logo from "../../assets/gastrofreaklogo.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authActions";
const Header = ({ isAuthenticated, user, logout }) => {
  return (
    <div className="header">
      <Link to="/">
        <img alt="gastro freak logo" style={{ width: "50px" }} src={logo} />
      </Link>
      <div className="header__greet">
        {isAuthenticated ? (
          <div>
            <div style={{ color: "white" }}>{user && user.name}</div>
            <Link
              style={{ color: "white", border: "1px 1px 1px white" }}
              to="/"
              onClick={() => logout()}
            >
              Log out
            </Link>
          </div>
        ) : (
          <Link className="login__btn" to="/login">
            Login/SignUp
          </Link>
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
