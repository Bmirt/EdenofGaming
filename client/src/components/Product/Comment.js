import React from "react";
import Auth from "../utils/AuthMethods";
import userContext from "../../context/user-context";
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      liked: false,
      disliked: false,
      likeCount: props.likes.length,
      dislikeCount: props.dislikes.length,
      showReplays: false
    };
  }

  static contextType = userContext;

  componentDidMount() {
    let liked = false;
    let disliked = false;
    if (Auth.getCurrentUser()) {
      for (let i = 0; i < this.props.likes.length; i++) {
        if (this.props.likes[i].user == Auth.getCurrentUser().id) {
          liked = true;
        }
        if (this.props.dislikes[i].user == Auth.getCurrentUser().id) {
          disliked = true;
        }
      }
    }
    this.setState({ liked: liked, disliked: disliked });
  }
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
    } else {
      if (this.state.liked) {
        this.like();
      }
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
  render() {
    console.log(this.state.liked);
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

        <div style={{ height: "auto" }}>
          <span
            style={{ fontSize: "20px", display: "inline-block", width: "20px" }}
          >
            {this.state.likeCount}
          </span>
          <i
            onClick={this.like}
            style={{ cursor: "pointer", fontSize: "25px", marginRight: "10px" }}
            className="fas fa-thumbs-up"
          />
          <i
            onClick={this.dislike}
            style={{ cursor: "pointer", fontSize: "25px" }}
            className="fas fa-thumbs-down"
          />
          <span style={{ fontSize: "20px" }}>{this.state.dislikeCount}</span>
          {this.state.showReplays ? (
            <div>
              <div
                style={{
                  width: "80%",
                  float: "right",
                  height: "auto",
                  background: "green"
                }}
              >
                <div className="discription__wrappertop__down__comment--wrapper--result--profile">
                  <img
                    src={this.props.avatar}
                    alt=""
                    style={{ width: "35px", borderRadius: "50%" }}
                  />
                  <span
                    style={{
                      fontSize: "16px",
                      color: "#FFF",
                      marginLeft: "10px"
                    }}
                  >
                    {this.props.name}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: "14px",
                    color: "#FFF",
                    padding: "10px",
                    background: "brown"
                  }}
                >
                  {this.props.text}
                </p>
                <div style={{ display: "flex" }}>
                  <textarea
                    type="text"
                    name="replay"
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
