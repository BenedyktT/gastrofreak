import React, { useEffect } from "react";
import "./styles/App.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/layouts/Header";
import FooterNav from "./components/layouts/FooterNav";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/search/Search";
import CategoryList from "./components/search/CategoryList";
import Recipe from "./components/recipes/Recipe";
import Login from "./components/login/Login";
import setAuthToken from "./setAuthToken";
import Alert from "./components/alerts/Alert";
import PrivateRoute from "./components/auth/PrivateRoute";
import Account from "./components/auth/Account";
import Add from "./components/addRecipe/Add";
import Favourite from "./components/favourite/Favourite";
import { loadUser } from "./redux/actions/authActions";
import Dashboard from "./components/dashboard/Dashboard";

if (localStorage.getItem("token")) {
	setAuthToken(localStorage.getItem("token"));
}
function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Provider store={store}>
			<div className="App">
				<Router>
					<Header />
					<Route exact path="/login" component={Login} />
					<Alert />
					<Switch>
						<Route exact path="/" component={Dashboard} />
						<Route exact path="/search" component={Search} />
						<Route exact path="/category/:category" component={CategoryList} />
						<Route exact path="/meal/:id" component={Recipe} />
						<PrivateRoute exact path="/account" component={Account} />
						<PrivateRoute exact path="/add" component={Add} />
						<PrivateRoute exact path="/favourite" component={Favourite} />
					</Switch>
					<FooterNav />
				</Router>
			</div>
		</Provider>
	);
}

export default App;
