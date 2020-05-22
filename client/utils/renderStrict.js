import React from 'react';
import ReactDOM from 'react-dom';

let StrictMode = function (props) {
  return props.children || null;
};

if (React.StrictMode) {
  StrictMode = React.StrictMode;
}

const renderStrict = function (element, node) {
  ReactDOM.render(<StrictMode>{element}</StrictMode>, node);
};

export default renderStrict;
