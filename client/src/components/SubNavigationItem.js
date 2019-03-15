import React from "react";
import {Link} from 'react-router-dom';


class SubNavigationItem extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Link to="#" className="header__bottom__nav--list--nav--nav--list">
          <div className="header__bottom__nav--list--nav--nav--list--line" />
          {this.props.title}
          <div className="header__bottom__nav--list--nav--nav--list--line" />
        </Link>
      </React.Fragment>
    );
  }
}

export default SubNavigationItem;