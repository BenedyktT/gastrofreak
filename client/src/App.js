import React from "react";
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

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Header />
				<Router>
					<Route exact path="/" component={Login} />
					<Switch>
						<Route exact path="/search" component={Search} />
						<Route exact path="/category/:category" component={CategoryList} />
						<Route exact path="/meal/:id" component={Recipe} />
					</Switch>
				</Router>
			</div>
			<FooterNav />
		</Provider>
	);
}

export default App;
