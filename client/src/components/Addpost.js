import React, { Component, Fragment } from "react";
import history from "../history/history";

import Navbar from "./Navbar";
import Errormessage from "./errors/Errormessage";
import errorHandler from "./errors/handlers/errorHandler";

export default class Addpost extends Component {
  state = {
    errorMessage: false,
    errorMessageResponse: "",
    edit: false,
    token: "",
    country: "",
    place: "",
    text: "",
    image: ""
  };

  componentDidMount() {
    // Dont allow authorization if the user has no token
    if (!this.props.match.params.token) {
      return history.push("/signup");
    }

    const name = JSON.parse(localStorage.getItem("user"))
    this.setState({
      token: this.props.match.params.token,
      name
    });

    if (this.props.match.params.postId !== "0") {
      fetch("https://holidays-posts.herokuapp.com/posts/getpost", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.props.match.params.token,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          postId: this.props.match.params.postId
        })
      })
        .then(result => result.json())
        .then(result => {
         errorHandler(result)
          this.setState({
            edit: true,
            country: result.data.country,
            place: result.data.place,
            text: result.data.text,
            image: result.data.imageURL.split("/")[1]
          });
        })
        .catch(error => console.log(error));
    }
  }

  handleAddingPost = e => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("country", this.state.country);
    formData.append("place", this.state.place);
    formData.append("text", this.state.text);
    formData.append("image", this.state.image);

    if (this.state.edit) {
      formData.append("postId", this.props.match.params.postId);

      return fetch("https://holidays-posts.herokuapp.com/posts/updatepost", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.state.token
        },
        body: formData
      })
        .then(result => result.json())
        .then(result => {
          if (result.message === "Post updated succesfully") {
            this.setState({
              edit: false
            });
            history.push(`/main/${this.state.token}`);
          }
        });
    }

    fetch("https://holidays-posts.herokuapp.com/posts/addpost", {
      //Content-Type and Content-lenght in headers are set by formData
      headers: {
        Authorization: "Bearer " + this.state.token
      },
      method: "POST",
      body: formData
    })
      .then(result => result.json())
      .then(result => {
        if (result.message === "Post added succesfully") {
          history.push(`/main/${this.state.token}`);
        }
      })
      .catch(error => console.log(error));
  };

  render() {
    console.log(this.state);
    return (
      <Fragment>
        <Navbar name={this.state.name}/>
        <div className="container add-post">
        {this.state.errorMessage && (
              <Errormessage message={this.state.errorMessageResponse} />
            )}
          <div className="row">
            <div className="col s6 offset-s3">
              <div className="card add-post">
                <div className="container">
                  <form onSubmit={e => this.handleAddingPost(e)}>
                    <div className="row">
                      <div className="input-field col s6">
                        <input
                          id="country"
                          type="text"
                          className="validate"
                          value={this.state.country}
                          onChange={e =>
                            this.setState({ country: e.target.value })
                          }
                          required
                        />
                        <label
                          htmlFor="country"
                          className={this.state.edit === true ? "active" : ""}
                        >
                          Country
                        </label>
                      </div>
                      <div className="input-field col s6">
                        <input
                          id="place"
                          type="text"
                          className="validate"
                          value={this.state.place}
                          onChange={e =>
                            this.setState({ place: e.target.value })
                          }
                          required
                        />
                        <label
                          htmlFor="place"
                          className={this.state.edit === true ? "active" : ""}
                        >
                          Location
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          id="textarea1"
                          className="materialize-textarea"
                          value={this.state.text}
                          onChange={e =>
                            this.setState({ text: e.target.value })
                          }
                          required
                        ></textarea>
                        <label
                          htmlFor="textarea1"
                          className={this.state.edit === true ? "active" : ""}
                        >
                          Text (max. 140 characters)
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="file-field input-field">
                        <div className="btn">
                          <i className="material-icons">add_a_photo</i>
                          <input
                            type="file"
                            name="image"
                            value={this.state.imageURL}
                            onChange={e =>
                              this.setState({ image: e.target.files[0] })
                            }
                          />
                        </div>
                        <div className="file-path-wrapper">
                          <input
                            className="file-path validate"
                            type="text"
                            name="image"
                            onChange={e =>
                              this.setState({ image: e.target.files[0] })
                            }
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      className="waves-effect waves-light btn orange accent-2 secondary-content"
                      type="submit"
                    >
                      {this.state.edit ? "Update" : "Voeg toe"}
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

