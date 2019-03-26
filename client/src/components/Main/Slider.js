import React from "react";
class Slider extends React.Component {
  state = {
    images: [
      "https://stmed.net/sites/default/files/wolfenstein-hd-wallpapers-33901-7518132.jpg",
      "https://stmed.net/sites/default/files/video-game-hd-wallpapers-33874-6610787.jpg",
      "https://stmed.net/sites/default/files/world-of-warships-hd-wallpapers-33918-5969700.jpg"
    ],
    currentImage: 1
  };

  nextSlide = () => {
    this.setState({
      currentImage: (this.state.currentImage + 1) % this.state.images.length
    });
    console.log(this.state.currentImage);
  };
  prevSlide = () => {
    if (this.state.currentImage > 0) {
      this.setState({
        currentImage: this.state.currentImage - 1
      });
    }else{
      this.setState({
        currentImage: this.state.images.length-1
      })
    }
  };
  render() {
    return (
      <React.Fragment>
        <ul className="main__top__slider" id="slider">
          <li
            className="main__top__slider__image firstimage active"
            style={{
              backgroundImage: `url("${
                this.state.images[this.state.currentImage]
              }")`
            }}
          />
          <button onClick={this.prevSlide} id="prev" className="both">
            <i className="fas fa-angle-left bothkey" />
          </button>
          <button onClick={this.nextSlide} id="next" className="both">
            <i className="fas fa-angle-right bothkey" />
          </button>
        </ul>
      </React.Fragment>
    );
  }
}

export default Slider;
