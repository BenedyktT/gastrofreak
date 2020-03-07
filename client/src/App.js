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

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/search" />
            <Route exact path="/" component={Search} />
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
