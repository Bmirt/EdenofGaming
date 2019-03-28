import React from "react";
export default class Comment extends React.Component {
  state = {
    like: 0,
    dislike: 0
  }
  like = e => {
    this.setState({
      like: this.state.like + 1
    });
    e.target.style.pointerEvents = "none";
    document.getElementById("dislike").style.pointerEvents = "auto";
  };
  dislike = e => {
    this.setState({
      dislike: this.state.dislike + 1
    });
    e.target.style.pointerEvents = "none";
    document.getElementById("like").style.pointerEvents = "auto";
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
          <span style={{ fontSize: "20px" }}>{this.state.like}</span>
          <button id="like" onClick={this.like}>
            Like
          </button>
          <button id="dislike" onClick={this.dislike}>
            dislike
          </button>
          <span>{this.state.dislike}</span>
        </div>
      </div>
    );
  }
}
