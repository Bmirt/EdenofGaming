import React from "react";

class Map extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
  }
  render() {
    return (
      <section className="map">
        <iframe
          title="map"
          className="map__content"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5955.564904759726!2d44.775803!3d41.725213!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa5ddbfea1d2a3f5b!2sGeorgian%20Technical%20University%20%2F%20Administrative%20Building!5e0!3m2!1sen!2sge!4v1643382891175!5m2!1sen!2sge"
          frameBorder="0"
          allowFullScreen
        />
        <div className="map__content__wrapper">
          <p className="map__content__wrapper__about">
            "EdenOfGaming" offers wide selection of the latest and most high
            rated games in the world and not only. For more information,please
            contact us with specified information displayed on the page.
          </p>
          <div className="map__content__wrapper__information">
            <p className="map__content__wrapper__information__wrapper">
              <i className="fas fa-map-marked-alt awesome" />
              <span className="map__content__wrapper__information__wrapper__location">
                77 Merab Kostava St, Tbilisi
              </span>
            </p>
            <p className="map__content__wrapper__information__wrapper">
              <i className="fas fa-phone-square awesome" />
              <span className="map__content__wrapper__information__wrapper__location">
                Phone:555555555
              </span>
            </p>
            <p className="map__content__wrapper__information__wrapper">
              <i className="fas fa-at awesome" />
              <span className="map__content__wrapper__information__wrapper__location">
                E-mail:support@edenofgaming.com
              </span>
            </p>
          </div>
        </div>
      </section>
    );
  }
}

export default Map;
