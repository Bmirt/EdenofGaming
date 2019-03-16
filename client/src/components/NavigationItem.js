import React from "react";

class NavigationItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul className="header__bottom__nav">
          <li className="header__bottom__nav--list">
            {this.props.title}
            <ul className="header__bottom__nav--list--nav nav--first">
              <li className="header__bottom__nav--list--nav--nav">
                {this.props.children}
              </li>
            </ul>
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default NavigationItem;
