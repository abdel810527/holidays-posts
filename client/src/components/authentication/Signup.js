import React, { Component, Fragment } from "react";

import history from "../../history/history";

import Navbar from "../Navbar";
import Errormessage from "../errors/Errormessage";
import errorHandler from "../errors/handlers/errorHandler";

export class Signup extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    errorMessage: false,
    errorMessageResponse: "",
    confirmPassword: "",
    passwordconfirmError: false
  };

  componentDidMount(){
    document.body.className = "bg";
  }

  componentWillUnmount(){
    document.body.className = "";
  }

  submitSignup = e => {
    e.preventDefault();
    if (this.state.password !== this.state.confirmPassword) {
      return this.setState({ passwordconfirmError: true });
    }

    this.setState({ passwordconfirmError: false });

    fetch("https://holidays-posts.herokuapp.com/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(result => result.json())
      .then(result => {
        errorHandler(result);
        if (result.message === "User added") {
          history.push("/login");
        }
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
            {this.state.passwordconfirmError && (
              <h5 className="error-message red-text center-align">
                {" "}
                Paswords don't match
              </h5>
            )}
            <div className="col s12 col m6 offset-m3">
              <div className="card">
                <div className="container">
                  <form onSubmit={e => this.submitSignup(e)}>
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <input
                          id="first_name"
                          type="text"
                          className="validate"
                          onChange={e =>
                            this.setState({ firstName: e.target.value })
                          }
                          required
                        />
                        <label htmlFor="first_name">Surname</label>
                      </div>
                      <div className="input-field col s12 m6">
                        <input
                          id="last_name"
                          type="text"
                          className="validate"
                          onChange={e =>
                            this.setState({ lastName: e.target.value })
                          }
                          required
                        />
                        <label htmlFor="last_name">Name</label>
                      </div>
                    </div>
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
                        <label htmlFor="password">Password</label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          id="confirmpassword"
                          type="password"
                          className="validate"
                          onChange={e =>
                            this.setState({ confirmPassword: e.target.value })
                          }
                          required
                        />
                        <label htmlFor="confirmpassword">
                          Confirm password
                        </label>
                      </div>
                    </div>
                    <button
                      className="waves-effect waves-light btn orange darken-2"
                      type="submit"
                    >
                      Sign Up
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

export default Signup;
