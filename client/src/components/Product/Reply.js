import React from "react";
export default class Reply extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="discription__wrappertop__down__comment--wrapper--result--replay">
          <div className="discription__wrappertop__down__comment--wrapper--result--replay--profile">
            <img
              src={this.props.avatar}
              alt=""
              className="discription__wrappertop__down__comment--wrapper--result--replay--profile--image"
            />
            <span className="discription__wrappertop__down__comment--wrapper--result--replay--profile--name">
              {this.props.name}
            </span>
          </div>
          <p className="discription__wrappertop__down__comment--wrapper--result--replay--comment ">
            {this.props.text}
          </p>
        </div>
      </React.Fragment>
    );
  }
}
