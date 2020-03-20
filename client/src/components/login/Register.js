import React, { useState, Fragment, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Loader from "../layouts/Loader";
import setAuthToken from "../../setAuthToken";
import { loadUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";

const Register = ({
  isRegistered,
  setAlert,
  registerUser,
  loading,
  loadUser
}) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      loadUser();
    }
  }, [isRegistered, loading, loadUser]);
  const [value, setValue] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    name: ""
  });
  const { email, password, repeatPassword, name } = value;
  const [isSubmitted, setSubmitted] = useState(false);
  const onChange = e => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    setSubmitted(true);
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
  if (isRegistered && !loading) {
    setAuthToken();
    return <Redirect to="/" />;
  }

  return (
    <Fragment>
      {loading && isSubmitted ? (
        <Loader className="inline" />
      ) : (
        <form onSubmit={onSubmit} className="form register">
          <div className="form__element">
            <label htmlFor="name">Name: </label>
            <input
              placeholder="Name"
              name="name"
              type="text"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form__element">
            <label htmlFor="email">Email: </label>
            <input
              placeholder="email"
              name="email"
              type="email"
              value={email}
              onChange={onChange}
            />
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
              placeholder="password"
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
              placeholder="Repeat password"
            />
          </div>
          <div className="submit">
            <input type="submit" value="Register" />
          </div>
        </form>
      )}
    </Fragment>
  );
};

export default connect(null, { loadUser })(Register);
