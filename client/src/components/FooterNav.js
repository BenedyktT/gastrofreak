import React, { useState } from "react";
import classnames from "classnames";
import { ReactComponent as Account } from "../assets/account.svg";
import { ReactComponent as Dashboard } from "../assets/dashboard.svg";
import { ReactComponent as Add } from "../assets/add.svg";
import { ReactComponent as Favourite } from "../assets/favourite.svg";
import { ReactComponent as Search } from "../assets/search.svg";
const FooterNav = () => {
  const [elementActive, setElementActive] = useState({});
  const activate = e => {
    setElementActive({ [e.target.name]: true });
  };
  return (
    <nav className="footernav">
      <div className="footernav__elements">
        <button onClick={activate} name="dashboard">
          <Dashboard
            className={classnames("footernav__element", {
              active: elementActive.dashboard
            })}
          />
        </button>
        <span
          className={classnames("footernav__text", {
            active: elementActive.dashboard
          })}
        >
          Dashboard
        </span>
      </div>
      <div className="footernav__elements">
        <button onClick={activate} name="account">
          <Account
            className={classnames("footernav__element", {
              active: elementActive.account
            })}
          />
        </button>
        <span
          className={classnames("footernav__text", {
            active: elementActive.account
          })}
        >
          Account
        </span>
      </div>
      <div className="footernav__elements">
        <button onClick={activate} name="search">
          <Search
            className={classnames("footernav__element", {
              active: elementActive.search
            })}
          />
        </button>
        <span
          className={classnames("footernav__text", {
            active: elementActive.search
          })}
        >
          Search
        </span>
      </div>
      <div className="footernav__elements">
        <button onClick={activate} name="favourite">
          <Favourite
            className={classnames("footernav__element", {
              active: elementActive.favourite
            })}
          />
        </button>
        <span
          className={classnames("footernav__text", {
            active: elementActive.favourite
          })}
        >
          Favourite
        </span>
      </div>
      <div className="footernav__elements">
        <button onClick={activate} name="add">
          <Add
            className={classnames("footernav__element", {
              active: elementActive.add
            })}
          />
        </button>
        <span
          className={classnames("footernav__text", {
            active: elementActive.add
          })}
        >
          Add
        </span>
      </div>
    </nav>
  );
};

export default FooterNav;
