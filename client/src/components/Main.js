import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

import history from "../history/history";

import Navbar from "./Navbar";
import Post from "./Post";
import Errormessage from "./errors/Errormessage";
import errorHandler from "./errors/handlers/errorHandler";

export default class Main extends Component {
  state = {
    errorMessage: false,
    errorMessageResponse: "",
    rerender: true,
    token: "",
    posts: []
  };

  componentDidMount() {
    //Dont allow authorization if the user has no token
    if (!this.props.match.params.token) {
      return history.push("/signup");
    }

    const name = JSON.parse(localStorage.getItem("user"));

    this.setState({
      token: this.props.match.params.token,
      name
    });

    fetch("https://holidays-posts.herokuapp.com/posts/getposts", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + this.props.match.params.token
      }
    })
      .then(result => result.json())
      .then(result => {
        errorHandler(result);
        this.setState({ posts: result.data });
      });
  }

  renderPosts = () => {
    const { token } = this.props.match.params;

    if (this.state.posts === undefined) {
      return;
    }

    return this.state.posts.map(post => {
      return (
        <Post
          {...post}
          key={post._id}
          token={token}
          editPost={id => history.push(`/addpost/${token}/${id}`)}
          deleteFromPosts={this.deleteFromPosts}
        />
      );
    });
  };

  deleteFromPosts = id => {
    const updatedPosts = this.state.posts.filter(post => post._id !== id);
    this.setState({ posts: updatedPosts });
  };

  render() {
    return (
      <Fragment>
        <Navbar name={this.state.name} />
        <div className="row add-post-button center-align">
          <Link
            to={`/addpost/${this.state.token}/0`}
            className="btn orange accent-2"
          >
            Add Post
          </Link>
        </div>
        <div className="container posts">
          {this.state.errorMessage && (
            <Errormessage message={this.state.errorMessageResponse} />
          )}
          <div className="row">
            {this.state.posts.length === 0 ? (
              <h4 className="center-align">There are no posts</h4>
            ) : (
              this.renderPosts()
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
