import React, { Component, Fragment } from "react";

import Navbar from "../Navbar";
import Errormessage from "../errors/Errormessage";

import history from "../../history/history";
import errorHandler from "../errors/handlers/errorHandler";

export class Login extends Component {
  state = {
    email: "",
    password: "",
    errorMessage: false,
    errorMessageResponse: ""
  };

  componentDidMount(){
    document.body.className = "bg";
  }

  componentWillUnmount(){
    document.body.className = "";
  }

  loginHandler = e => {
    e.preventDefault();

    fetch("https://holidays-posts.herokuapp.com/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(result => result.json())
      .then(result => {
       errorHandler(result)
        localStorage.setItem(
          "user",
          JSON.stringify([result.firstName, result.lastName])
        );
        history.push(`/main/${result.token}`);
      })
      .catch(error => console.log(error));
  };

  render() {
    return (
      <Fragment>
        <Navbar />
        <div className="container authentication">
          <div className="row">
            {this.state.errorMessage && (
              <Errormessage message={this.state.errorMessageResponse} />
            )}
            <div className="col s12 col m6 offset-m3">
              <div className="card">
                <div className="container">
                  <form onSubmit={e => this.loginHandler(e)}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          type="email"
                          className="validate"
                          onChange={e =>
                            this.setState({ email: e.target.value })
                          }
                          required
                        />
                        <label htmlFor="disabled">Email</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="password"
                          type="password"
                          className="validate"
                          onChange={e =>
                            this.setState({ password: e.target.value })
                          }
                          required
                        />
                        <label htmlFor="password">Paswoord</label>
                      </div>
                    </div>
                    <button
                      className="waves-effect waves-light btn orange darken-2"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Login;
