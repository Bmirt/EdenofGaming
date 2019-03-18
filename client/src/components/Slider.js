import React from "react";
class Slider extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ul class="main__top__slider" id="slider">
          <li class="main__top__slider__image firstimage active" />
          <li class="main__top__slider__image secondimage" />
          <li class="main__top__slider__image thirdimage" />
          <li class="main__top__slider__image fourthimage" />
          <li class="main__top__slider__image fifthimage" />
          <button id="prev" class="both">
            <i class="fas fa-angle-left bothkey" />
          </button>
          <button id="next" class="both">
            <i class="fas fa-angle-right bothkey" />
          </button>
        </ul>
      </React.Fragment>
    );
  }
}

export default Slider;
