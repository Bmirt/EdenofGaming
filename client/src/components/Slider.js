import React from "react";
class Slider extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul className="main__top__slider" id="slider">
          <li className="main__top__slider__image firstimage active" />
          <li className="main__top__slider__image secondimage" />
          <li className="main__top__slider__image thirdimage" />
          <li className="main__top__slider__image fourthimage" />
          <li className="main__top__slider__image fifthimage" />
          <button id="prev" className="both">
            <i className="fas fa-angle-left bothkey" />
          </button>
          <button id="next" className="both">
            <i className="fas fa-angle-right bothkey" />
          </button>
        </ul>
      </React.Fragment>
    );
  }
}

export default Slider;
