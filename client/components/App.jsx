import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ImageView from "./ImageView.jsx";
import Gallery from "./Gallery.jsx";

const App = function () {
  return (
    <div className="photo-container">
      <Router>
        <Route
          render={({ location }) => (
            <TransitionGroup>
              <CSSTransition
                key={location.key}
                timeout={400}
                classNames={"fade"}
              >
                <Switch location={location}>
                  <Route exact path="/:id">
                    <Gallery />
                  </Route>
                  <Route path="/:id/image/:photoId">
                    <ImageView />
                  </Route>
                  <Route
                    path="/"
                    render={() => <div>Error 404 - Page Not Found</div>}
                  />
                </Switch>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </Router>
    </div>
  );
};
export default App;
