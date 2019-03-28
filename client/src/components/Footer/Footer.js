import React from "react";
import { Link } from "react-router-dom";

class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <footer className="footer">
          <section className="footer__wrapper">
            <div className="footer__wrapper__item  left">
              <Link to="#" className="name" style={{ textDecoration: "none" }}>
                ABOUT EDEN OF GAMING
              </Link>
              <Link
                to="/about"
                className="location"
                style={{ textDecoration: "none" }}
              >
                <i className="fas  fa-globe-americas awesome" /> Find Us On This
                Location
              </Link>
            </div>
            <div className="footer__wrapper__item  middle">
              Special Thanks To{" "}
              <Link
                to="http://techub.ge/"
                target="_blank"
                className="techub"
                style={{ textDecoration: "none" }}
              >
                Techub
              </Link>
            </div>
            <div className="footer__wrapper__item ">
              <h2 className="footer__wrapper__item__text"> Follow Us</h2>
              <div className="footer__wrapper__item__wrapper ">
                <span className="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i className="fab fa-youtube awesome" />{" "}
                </span>
                <span className="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i className="fab fa-facebook-f awesome" />{" "}
                </span>
                <span className="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i className="fab fa-twitter awesome" />{" "}
                </span>
                <span className="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i className="fab fa-instagram awesome" />{" "}
                </span>
                <span className="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i className="fab fa-google-plus-g awesome" />{" "}
                </span>
              </div>
            </div>

            <div className="footer__wrapper__bottom">
              {" "}
              © 2019 All Rights Reserved
            </div>
          </section>
        </footer>
      </React.Fragment>
    );
  }
}

export default Footer;
