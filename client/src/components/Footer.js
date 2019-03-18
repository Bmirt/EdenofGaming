import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <React.Fragment>
        <footer class="footer">
          <section class="footer__wrapper">
            <div class="footer__wrapper__item  left">
              <a href="" class="name">
                ABOUT EDEN OF GAMING
              </a>
              <a href="#" class="location">
                <i class="fas  fa-globe-americas awesome" /> Find Us On This
                Location
              </a>
            </div>
            <div class="footer__wrapper__item  middle">
              Special Thanks To{" "}
              <a href="http://techub.ge/" target="_blank" class="techub">
                Techub
              </a>
            </div>
            <div class="footer__wrapper__item ">
              <h2 class="footer__wrapper__item__text"> Follow Us</h2>
              <div class="footer__wrapper__item__wrapper ">
                <span class="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i class="fab fa-youtube awesome" />{" "}
                </span>
                <span class="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i class="fab fa-facebook-f awesome" />{" "}
                </span>
                <span class="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i class="fab fa-twitter awesome" />{" "}
                </span>
                <span class="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i class="fab fa-instagram awesome" />{" "}
                </span>
                <span class="footer__wrapper__item__wrapper--social">
                  {" "}
                  <i class="fab fa-google-plus-g awesome" />{" "}
                </span>
              </div>
            </div>

            <div class="footer__wrapper__bottom">
              {" "}
              &#169 2019 All Rights Reserved
            </div>
          </section>
        </footer>
      </React.Fragment>
    );
  }
}


export default Footer;