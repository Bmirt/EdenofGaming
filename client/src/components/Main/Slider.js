import React from "react";
class Slider extends React.Component {
  state = {
    images: [
      "https://www.highreshdwallpapers.com/wp-content/uploads/2014/04/Awesome-High-Resolution-Video-Game-Wallpaper-1024x768.jpg",
      "https://cdn.wallpapersafari.com/48/5/hDsgpZ.jpg",
      "https://cutewallpaper.org/21/video-gamer-wallpaper/Video-Game-Wallpaper-High-Quality-Resolution-Free-Download-.jpg",
    ],
    currentImage: 1,
  };

  nextSlide = () => {
    this.setState({
      currentImage: (this.state.currentImage + 1) % this.state.images.length,
    });
    console.log(this.state.currentImage);
  };
  prevSlide = () => {
    if (this.state.currentImage > 0) {
      this.setState({
        currentImage: this.state.currentImage - 1,
      });
    } else {
      this.setState({
        currentImage: this.state.images.length - 1,
      });
    }
  };

  componentDidMount() {
    setInterval(() => {
      this.nextSlide();
    }, 2000);
  }
  render() {
    return (
      <React.Fragment>
        <ul className="main__top__slider" id="slider">
          <li
            className="main__top__slider__image firstimage active"
            style={{
              backgroundImage: `url("${
                this.state.images[this.state.currentImage]
              }")`,
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
