import React from "react";

class NavigationItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul className="header__bottom__navigation__list">
          {this.props.title}
          <li className="header__bottom__navigation__list--item">
            {this.props.children}
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default NavigationItem;
