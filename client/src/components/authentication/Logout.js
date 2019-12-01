import React, { Fragment } from "react";
import history from "../../history/history";

export default function Logout() {
  const logOut = () => {
    localStorage.setItem("user", "");

    setTimeout(() => {
      history.push("/");
    }, 2500);

    return <h4 className="center-align">You're being logged out...</h4>;
  };
  return (
    <Fragment>
      <div className="container authentication">
        <div className="row">
          <div className="col s12 col m6 offset-m3 z-depth-3 teal lighten-2 white-text">
            <div className="container logout">{logOut()}</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
