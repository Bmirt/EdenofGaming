import React from "react";
export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // ...props,
      likes: 0,
      dislikes: 0,
      liked: false,
      disliked: false
    };
  }

  like = e => {
    if (this.state.liked) {
      this.setState({
        likes: this.state.likes - 1,
        liked: false
      });
      // e.target.style.transform = "scale(1)";
    } else {
      if (this.state.disliked) {
        this.dislike();
      }
      this.setState({ likes: this.state.likes + 1, liked: true });
      e.target.style.transform = "scale(1.1)";
    }
  };
  dislike = e => {
    if (this.state.disliked) {
      this.setState({
        dislikes: this.state.dislikes - 1,
        disliked: false
      });
      // e.target.style.transform = "scale(1)";
    } else {
      if (this.state.liked) {
        this.like();
      }
      this.setState({ dislikes: this.state.dislikes + 1, disliked: true });
      e.target.style.transform = "scale(1.1)";
    }
  };
  render() {
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

        <div>
          <span
            style={{ fontSize: "20px", display: "inline-block", width: "20px" }}
          >
            {this.state.likes}
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

          <span style={{ fontSize: "20px" }}>{this.state.dislikes}</span>
        </div>
      </div>
    );
  }
}
