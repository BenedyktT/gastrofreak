import React, { useState, useEffect } from "react";
import classnames from "classnames";
import { ReactComponent as Account } from "../../assets/account.svg";
import { ReactComponent as Dashboard } from "../../assets/dashboard.svg";
import { ReactComponent as Add } from "../../assets/add.svg";
import { ReactComponent as Favourite } from "../../assets/favourite.svg";
import { ReactComponent as Search } from "../../assets/search.svg";
import { withRouter } from "react-router";

import { Link } from "react-router-dom";
const FooterNav = ({ history }) => {
	const { pathname } = history.location;
	const [elementActive, setElementActive] = useState({});
	const activate = e => {
		setElementActive({ [e.target.name]: true });
	};
	const trackPath = path => {
		if (path === "/") return setElementActive({ search: true });
		if (path.includes("myRecipes")) return setElementActive({ account: true });
		if (path.includes("favourite"))
			return setElementActive({ favourite: true });
		if (path.includes("add")) return setElementActive({ add: true });
		setElementActive({});
		return;
	};
	useEffect(() => {
		trackPath(pathname);
	}, [pathname]);
	return (
		<nav className="footernav">
			<div className="footernav__elements">
				<Link to="/" onClick={activate} name="search">
					<Search
						className={classnames("footernav__element", {
							active: elementActive.search
						})}
					/>
				</Link>
				<span
					className={classnames("footernav__text", {
						active: elementActive.search
					})}
				>
					Search
				</span>
			</div>
			<div className="footernav__elements">
				<Link to="/favourite" onClick={activate} name="favourite">
					<Favourite
						className={classnames("footernav__element", {
							active: elementActive.favourite
						})}
					/>
				</Link>
				<span
					className={classnames("footernav__text", {
						active: elementActive.favourite
					})}
				>
					Favourite
				</span>
			</div>
			<div className="footernav__elements">
				<Link to="/myRecipes" onClick={activate} name="account">
					<Account
						className={classnames("footernav__element", {
							active: elementActive.account
						})}
					/>
				</Link>
				<span
					className={classnames("footernav__text", {
						active: elementActive.account
					})}
				>
					My Recipes
				</span>
			</div>
			<div className="footernav__elements">
				<Link to="/add" onClick={activate} name="add">
					<Add
						className={classnames("footernav__element", {
							active: elementActive.add
						})}
					/>
				</Link>
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

export default withRouter(FooterNav);
