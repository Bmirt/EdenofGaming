import React from "react";

class Product extends React.Component {
  render() {
    const {image, platform, price} = this.props;
    return (
      <React.Fragment>
        <div className="main__middle__wrapper__container">
          <div style={{backgroundImage: `url(${image})`}} className="main__middle__wrapper__container--image">
            <div className="main__middle__wrapper__container--image--text">
              <p className="main__middle__wrapper__container--image--text--all platform ">
                {platform}
              </p>
              <p className="main__middle__wrapper__container--image--text--all price">
                price {price}$
              </p>
              <p className="main__middle__wrapper__container--image--text--all click">
                For More Click Here
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Product;