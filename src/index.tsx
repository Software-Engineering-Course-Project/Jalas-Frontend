import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";
import "src/resources/fonts/iransans-fonts/fonts.css";
import "src/resources/my-icons-collection/font/flaticon.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Poll from "src/views/poll/Poll";
import Reservation from 'src/views/reservation/Reservation';
import Status from  'src/views/status/Status';
import Create from 'src/views/create/Create';
import Vote from 'src/views/vote/Vote';



ReactDOM.render(
  <Router>
    <div>
      <Route path="/poll/:pollId" component={Poll} />
      <Route path="/reservation/:pollId/:reservationId" component={Reservation} />
      <Route path="/status/:pollId/:reservationId/:room" component={Status}/>
      <Route path="/create" component={Create}/>
      <Route path="/vote/:pollId" component={Vote} />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();