import React from "react";
import {Link} from "react-router-dom";


class SocialMedia extends React.Component {
  render() {
    return (
      <React.Fragment>
        <aside className="aside">
          <nav className="aside__nav">
            <li className="aside__nav__list">
              <Link to="#" target="_blank" className="aside__nav__list__social">
                <i className="fab fa-youtube awesome youtube" />
              </Link>
            </li>
            <li className="aside__nav__list">
              <Link to="#" target="_blank" className="aside__nav__list__social">
                <i className="fab fa-facebook-f awesome facebook" />
              </Link>
            </li>
            <li className="aside__nav__list">
              <Link to="#" target="_blank" className="aside__nav__list__social">
                <i className="fab fa-twitter awesome twitter" />
              </Link>
            </li>
            <li className="aside__nav__list">
              <Link to="#" target="_blank" className="aside__nav__list__social">
                <i className="fab fa-instagram awesome instagram" />
              </Link>
            </li>
            <li className="aside__nav__list">
              <Link to="#" target="_blank" className="aside__nav__list__social">
                <i className="fab fa-google-plus-g awesome google" />
              </Link>
            </li>
          </nav>
        </aside>
      </React.Fragment>
    );
  }
}


export default SocialMedia;