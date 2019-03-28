import React from "react";
export default class Reply extends React.Component {
  render() {
    return (
      <React.Fragment>
      
        <div className="discription__wrappertop__down__comment--wrapper--result--profile" >
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
            color: "black",
            padding: "10px",
            background: "#C8C5C5"
          }}
        >
          {this.props.text}
        </p>
      </React.Fragment>
    );
  }
}
