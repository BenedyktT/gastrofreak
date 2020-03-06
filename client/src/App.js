import React from "react";
import "./styles/App.scss";
import Header from "./components/layouts/Header";
import FooterNav from "./components/layouts/FooterNav";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/search/Search";

function App() {
  return (
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
  );
}

export default App;
