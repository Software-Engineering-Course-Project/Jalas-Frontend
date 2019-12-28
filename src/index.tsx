import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.css";
import "src/resources/fonts/iransans-fonts/fonts.css";
import "src/resources/my-icons-collection/font/flaticon.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";

import Poll from "src/views/poll/Poll";
import Reservation from 'src/views/reservation/Reservation';
import Status from  'src/views/status/Status';
import Create from 'src/views/create/Create';
import Vote from 'src/views/vote/Vote';
import Metting from 'src/views/meeting/Meeting';
import MyMeeting from 'src/views/meetings/MyMeeting';
import Login from 'src/views/Login/Login';
import Home from 'src/views/home/Home';
import EditPoll from './views/poll/EditPoll';
import Logger from './views/Logger/Logger';



ReactDOM.render(
  <Router>
    <div>
      <Route path="/poll/:pollId" component={Poll} />
      <Route path="/reservation/:pollId/:reservationId" component={Reservation} />
      <Route path="/status/:pollId/:reservationId/:room" component={Status}/>
      <Route path="/create" component={Create}/>
      <Route path="/vote/:pollId" component={Vote} />
      <Route path="/meeting/:pollId/:reservationId/:room" component={Metting} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
      <Route path="/mymeeting" component={MyMeeting} />
      <Route path="/edit/:pollId" component={EditPoll} />
      <Route path="/log" component={Logger} />
      <ToastContainer />
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();