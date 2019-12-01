import React, { Component } from "react";

//Compile

export default class Post extends Component {
  deletePost = () => {
    const { token, _id } = this.props;

    fetch("https://holidays-posts.herokuapp.com/posts/deletepost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({
        postId: _id
      })
    })
      .then(result => result.json())
      .then(result => {
        console.log(result);
        if (result.message === "Post deleted succesfully") {
          this.props.deleteFromPosts(result.data._id);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { country, place, text, imageURL, _id } = this.props;
    return (
      <div className="col s12 m6 post">
        <div className="card medium">
          <div className="card-image">
            <img src={`https://holidays-posts.herokuapp.com/${imageURL}`} />
            <span className="card-title">{country}</span>
          </div>
          <div className="card-content">
            <p>{text}</p>
          </div>
          <div className="card-action">
            <p style={{ display: "inline", textAlign: "left" }}>{place}</p>
            <div
              className="secondary-content deletePost"
              onClick={this.deletePost}
            >
              <i className="material-icons">close</i>
            </div>
            <div
              className="secondary-content editPost"
              onClick={() => this.props.editPost(_id)}
            >
              <i className="material-icons">mode_edit</i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
