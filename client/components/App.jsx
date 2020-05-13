import React from "react";
import { Route, Switch } from "react-router-dom";
import ImageView from "./ImageView.jsx";
import Gallery from "./Gallery.jsx";

const App = function () {
  return (
    <div className="photo-container">
      <Switch>
        <Route exact path="/:id">
          <Gallery />
        </Route>
        <Route path="/:id/image/:photoId">
          <ImageView />
        </Route>
      </Switch>
    </div>
  );
};
export default App;
