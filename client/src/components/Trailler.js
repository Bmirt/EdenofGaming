import React from "react";
export class Trailler extends React.Component {
  render() {
    return (<div className="discription__wrappertop__middle">
      <div className="discription__wrappertop__middle__wrapper">
        {this.props.children}
      </div>
    </div>);
  }
}
