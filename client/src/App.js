import React from "react";
import "./styles/App.scss";
import Header from "./components/layouts/Header";
import FooterNav from "./components/FooterNav";

function App() {
  return (
    <div className="App">
      <Header />
      <FooterNav />
    </div>
  );
}

export default App;
