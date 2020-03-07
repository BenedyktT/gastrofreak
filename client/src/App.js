import React from "react";
import "./styles/App.scss";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/layouts/Header";
import FooterNav from "./components/layouts/FooterNav";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/search/Search";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Header />
        <Router>
          <Switch>
            <Route exact path="/search" />
            <Route exact path="/" component={Search} />
          </Switch>
        </Router>
        <FooterNav />
      </div>
    </Provider>
  );
}

export default App;
