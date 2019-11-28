import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";
import "src/resources/fonts/iransans-fonts/fonts.css";
import "src/resources/my-icons-collection/font/flaticon.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Main from "src/views/main/Main";


ReactDOM.render(
  <Router>
      <Route path="/main" component={Main} />
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();