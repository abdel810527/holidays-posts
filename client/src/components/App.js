import React, { Fragment } from "react";

import { Router, Route } from "react-router-dom";
import history from "../history/history";

import Main from "./Main";
import Addpost from "./Addpost";
import Signup from "./authentication/Signup";
import Login from "./authentication/Login";
import Logout from "./authentication/Logout";

import "../css/style.css";

function App() {
  return (
    <Fragment>
      <Router history={history}>
        <Route path="/" exact component={Signup} />
        <Route path="/addpost/:token/:postId" component={Addpost} />
        <Route path="/main/:token" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Router>
    </Fragment>
  );
}

export default App;
