import React from "react";

class Map extends React.Component {
  render() {
    return (
      <section className="map">
        <iframe
          title="map"
          className="map__content"
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5957.245297479906!2d44.738859!3d41.7070812!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40447344e8047ced%3A0xb53d8ecd4495903f!2sBusiness+and+Technology+University!5e0!3m2!1sen!2sge!4v1552921700283"
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
                Tbilisi,Balanchivadze St.46
              </span>
            </p>
            <p className="map__content__wrapper__information__wrapper">
              <i className="fas fa-phone-square awesome" />
              <span className="map__content__wrapper__information__wrapper__location">
                Phone:591663231
              </span>
            </p>
            <p className="map__content__wrapper__information__wrapper">
              <i className="fas fa-at awesome" />
              <span className="map__content__wrapper__information__wrapper__location">
                E-mail:Edenofgaming.com
              </span>
            </p>
          </div>
          <div className="map__content__wrapper__developers">
            <span className="map__content__wrapper__developers__name toko">
              Tornike
            </span>
            <span className="map__content__wrapper__developers__name boria">
              Boria
            </span>

            <span className="map__content__wrapper__developers__name koko">
              KoKo
            </span>
            <span className="map__content__wrapper__developers__name vakho">
              Vakho
            </span>
          </div>
        </div>
      </section>
    );
  }
}

export default Map;
