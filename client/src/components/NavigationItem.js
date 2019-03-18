import React from "react";

class NavigationItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul class="header__bottom__navigation__list">
          {this.props.title}
          <li class="header__bottom__navigation__list--item">
            {this.props.children}
          </li>
        </ul>
      </React.Fragment>
    );
  }
}

export default NavigationItem;
