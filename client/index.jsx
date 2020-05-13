import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./components/App.jsx";
import ImageView from "./components/ImageView.jsx";

const Index = function () {
  return (
    <div>
      <Router>
        <App />
      </Router>
    </div>
  );
};

ReactDom.render(<Index />, document.getElementById("photo-service"));
