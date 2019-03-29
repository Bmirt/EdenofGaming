import React from "react";
import Auth from "../utils/AuthMethods";
import userContext from "../../context/user-context";
import Reply from "./Reply";
import Axios from "axios";
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      likes: props.likes,
      dislikes: props.dislikes,
      liked: false,
      disliked: false,
      likeCount: props.likes.length,
      dislikeCount: props.dislikes.length,
      showReplays: false,
      replytext: ""
    };
  }

  static contextType = userContext;

  componentDidMount() {
    this.setState({ replies: this.state.replies.reverse() });
    let liked = false;
    let disliked = false;
    if (Auth.getCurrentUser()) {
      for (let i = 0; i < this.props.likes.length; i++) {
        if (this.state.likes[i].user === Auth.getCurrentUser().id) {
          liked = true;
        }
        if (this.state.dislikes.length !== 0) {
          if (this.state.dislikes[i].user === Auth.getCurrentUser().id) {
            disliked = true;
          }
        }
      }
      console.log("dislikes arrrat", this.state.dislikes);
    }
    this.setState({ liked: liked, disliked: disliked });
  }
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  like = e => {
    const { productID, reviewID } = this.state;
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to like the review");
      return;
    }
    if (this.state.liked) {
      fetch(`/api/posts/unlike/${productID}/${reviewID}`, {
        method: "POST",
        headers: {
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log("error", err));
      this.setState({
        liked: false,
        likeCount: this.state.likeCount - 1
      });
    } else {
      if (this.state.disliked) {
        this.dislike();
        // this.setState({dislikeCount:this.state.dislikeCount-1})
      }
      fetch(`/api/posts/like/${productID}/${reviewID}`, {
        method: "POST",
        headers: {
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log("error", err));
      this.setState({ liked: true, likeCount: this.state.likeCount + 1 });
    }
  };
  dislike = e => {
    const { productID, reviewID } = this.state;
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to dislike the review");
      return;
    }
    if (this.state.disliked) {
      fetch(`/api/posts/undislike/${productID}/${reviewID}`, {
        method: "POST",
        headers: {
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log("error", err));
      this.setState({
        disliked: false,
        dislikeCount: this.state.dislikeCount - 1
      });
    } else if (this.state.liked) {
      this.like();
    } else {
      fetch(`/api/posts/dislike/${productID}/${reviewID}`, {
        method: "POST",
        headers: {
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.log("error", err));
      this.setState({
        disliked: true,
        dislikeCount: this.state.dislikeCount + 1
      });
    }
  };
  showReplays = () => {
    this.setState({ showReplays: true });
  };

  onHandleSubmit = e => {
    e.preventDefault();
    const jwt = Auth.getJWT();
    const { productID, reviewID } = this.state;
    console.log(productID, reviewID, jwt);
    fetch(`/api/posts/comment/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt
      },
      body: JSON.stringify({ text: this.state.replytext })
    })
      .then(res => res.json())
      .then(res => {
        if (res.user !== undefined) {
          const newReply = res;
          const allReplies = this.state.replies;
          allReplies.push(newReply);
          this.setState({ replies: allReplies });
        } else {
          throw Error(res.text);
        }
      })
      .catch(err => {
        this.context.message(
          "The text field should not be empty and it should be between 10 to 30 characters"
        );
      });
    this.setState({ replytext: "" });
    document.querySelectorAll('textarea').forEach(item => item.value = "")
  };

  render() {
    console.log(this.state);
    return (
      <div className="discription__wrappertop__down__comment--wrapper--result">
        <div className="discription__wrappertop__down__comment--wrapper--result--profile">
          <img
            src={this.props.avatar}
            alt=""
            className="discription__wrappertop__down__comment--wrapper--result--profile--image"
          />
          <span className="discription__wrappertop__down__comment--wrapper--result--profile--name">
            {this.props.name}
          </span>
        </div>
        <p className="discription__wrappertop__down__comment--wrapper--result--comment">
          {this.props.text}
        </p>

        <div style={{ height: "auto", width: "100%" }}>
          <div style={{ width: "40%" }}>
            <div style={{ float: "right", marginRight: "20px" }}>
              <span
                style={{
                  fontSize: "20px",
                  display: "inline-block",
                  width: "20px",
                  color: "#FFF"
                }}
              >
                {this.state.likeCount}
              </span>
              <i
                onClick={this.like}
                style={{
                  cursor: "pointer",
                  fontSize: "25px",
                  marginRight: "10px",
                  color: "#FFF"
                }}
                className="fas fa-thumbs-up"
              />
              <i
                onClick={this.dislike}
                style={{ cursor: "pointer", fontSize: "25px", color: "#FFF" }}
                className="fas fa-thumbs-down"
              />
              <span style={{ fontSize: "20px", color: "#FFF" }}>
                {this.state.dislikeCount}
              </span>
            </div>
          </div>
          {this.state.showReplays ? (
            <div style={{ width: "60%" }}>
              <div
                style={{
                  height: "auto",
                  background: "#262526"
                }}
              >
                {this.props.replies.map(item => (
                  <Reply
                    key={item._id}
                    avatar={item.avatar}
                    name={item.name}
                    text={item.text}
                  />
                ))}
                <div style={{ display: "flex" }}>
                  <textarea
                    className="textarea"
                    onChange={this.onHandleChange}
                    type="text"
                    name="replytext"
                    style={{
                      height: "80px",
                      width: "300px",
                      borderRadius: "9px",
                      resize: "none",
                      outline: "none",
                      padding: "6px 12px"
                    }}
                  />

                  <button
                    onClick={this.onHandleSubmit}
                    type="submit"
                    style={{
                      background: "orange",
                      border: "none",
                      padding: "5px 10px",
                      // height:"30px",
                      alignSelf: "center",
                      outline: "none",
                      borderRadius: "8px"
                    }}
                  >
                    Replay
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <span onClick={this.showReplays} style={{ cursor: "pointer" }}>
              Replays
            </span>
          )}
        </div>
      </div>
    );
  }
}
