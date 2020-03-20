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
import MyRecipes from "./components/myRecipes/MyRecipes";
import Add from "./components/addRecipe/Add";
import Favourite from "./components/favourite/Favourite";
import { loadUser } from "./redux/actions/authActions";
import EditRecipe from "./components/recipes/EditRecipe";
import Landing from "./components/layouts/Landing";
import PreviewRecipe from "./components/addRecipe/PreviewRecipe";

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
          <Alert />
          <Header />
          <Route exact path="/login" component={Login} />

          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/category/:category" component={CategoryList} />
            <Route exact path="/meal/:id" component={Recipe} />
            <Route exact path="/preview" component={PreviewRecipe} />
            <PrivateRoute
              exact
              path="/edit/:id/:external"
              component={EditRecipe}
            />
            <PrivateRoute exact path="/myrecipe" component={Recipe} />
            <PrivateRoute exact path="/myRecipe/:id" component={Recipe} />
            <PrivateRoute exact path="/myRecipes" component={MyRecipes} />
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
