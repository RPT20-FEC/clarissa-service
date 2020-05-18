import React from "react";
import ReactDom from "react-dom";
import App from "./components/App.jsx";

const Index = function () {
  return <App />;
};

ReactDom.render(<Index />, document.getElementById("photo-service"));
