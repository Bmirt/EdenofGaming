import React from "react";
import { Link } from "react-router-dom";

class SubNavigationItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Link
          to="#"
          className="header__bottom__navigation__list--item--link"
          style={{ textDecoration: "none" }}
        >
          {this.props.title}
        </Link>
      </React.Fragment>
    );
  }
}

export default SubNavigationItem;
