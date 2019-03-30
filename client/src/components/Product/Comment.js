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
      showReplays: false,
      replytext: ""
    };
  }

  static contextType = userContext;

  componentDidMount() {
    this.setState({ replies: this.props.replies.reverse() });
    let liked = false;
    let disliked = false;
    if (Auth.getCurrentUser()) {
      this.props.likes.forEach(item => {
        if(item.user === Auth.getCurrentUser().id){
          liked = true;
        }
      });
      this.props.dislikes.forEach(item => {
        if(item.user === Auth.getCurrentUser().id){
          disliked = true;
        }
      });
      
    }
    this.setState({ liked: liked, disliked: disliked });
  }
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  like = (productID, reviewID, jwt) => {
    fetch(`/api/posts/like/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        const newLike = {
          _id: res._id,
          user: res.user
        };
        const Likes = this.state.likes;
        Likes.push(newLike);
        this.setState({ liked: true, likes: Likes });
      })
      .catch(err => console.log("error", err));
  };
  unlike = (productID, reviewID, jwt) => {
    fetch(`/api/posts/unlike/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        let likes = this.state.likes;
        for (let i = 0; i < likes.length; i++) {
          if (likes[i].user === res.user) {
            likes.splice(i, 1);
          }
        }
        this.setState({
          liked: false,
          likes: likes
        });
      })
      .catch(err => console.log("error", err));
  };

  dislike = (productID, reviewID, jwt) => {
    fetch(`/api/posts/dislike/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        const newDislike = {
          _id: res._id,
          user: res.user
        };
        const Dislikes = this.state.dislikes;
        Dislikes.push(newDislike);
        this.setState({ disliked: true, dislikes: Dislikes });
      })
      .catch(err => console.log("error", err));
  };
  unDislike = (productID, reviewID, jwt) => {
    fetch(`/api/posts/undislike/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        let dislikes = this.state.dislikes;
        for (let i = 0; i < dislikes.length; i++) {
          if (dislikes[i].user === res.user) {
            dislikes.splice(i, 1);
          }
        }
        this.setState({
          disliked: false,
          dislikes: dislikes
        });
      })
      .catch(err => console.log("error", err));
  };

  onHandleLike = e => {
    const { productID, reviewID } = this.state;
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to like the review");
      return;
    }
    if (this.state.liked) {
      this.unlike(productID, reviewID, jwt);
    } else if (this.state.disliked) {
      this.unDislike(productID, reviewID, jwt);
      this.like(productID, reviewID, jwt);
    } else {
      this.like(productID, reviewID, jwt);
    }
  };
  onHandleDislike = e => {
    const { productID, reviewID } = this.state;
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to dislike the review");
      return;
    }
    if (this.state.disliked) {
      this.unDislike(productID, reviewID, jwt);
    } else if (this.state.liked) {
      this.unlike(productID, reviewID, jwt);
      this.dislike(productID, reviewID, jwt);
    } else {
      this.dislike(productID, reviewID, jwt);
    }
  };
  showReplays = () => {
    this.setState({ showReplays: true });
  };

  onHandleSubmit = e => {
    e.preventDefault();
    const jwt = Auth.getJWT();
    const { productID, reviewID } = this.state;
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
    document.querySelectorAll("textarea").forEach(item => (item.value = ""));
  };

  render() {
    console.log("state", this.state);
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
                {this.state.likes.length}
              </span>
              <i
                onClick={this.onHandleLike}
                style={{
                  cursor: "pointer",
                  fontSize: "25px",
                  marginRight: "10px",
                  color: "#FFF"
                }}
                className="fas fa-thumbs-up"
              />
              <i
                onClick={this.onHandleDislike}
                style={{ cursor: "pointer", fontSize: "25px", color: "#FFF" }}
                className="fas fa-thumbs-down"
              />
              <span style={{ fontSize: "20px", color: "#FFF" }}>
                {this.state.dislikes.length}
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
