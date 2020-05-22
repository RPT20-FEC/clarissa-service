import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ImageView from './ImageView.jsx';
import Gallery from './Gallery.jsx';

const App = function () {
  return (
    <div className="photo-container">
      <Router>
        <Switch>
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
      </Router>
    </div>
  );
};
export default App;
