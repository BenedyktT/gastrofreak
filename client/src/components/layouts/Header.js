import React from "react";
import logo from "../../assets/gastrofreaklogo.svg";
const Header = () => {
  return (
    <div className="header">
      <img src={logo} />
      <div className="header__greet">Hello Benedykt</div>
    </div>
  );
};

export default Header;
