import React from "react";

class Product extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div class="main__middle__wrapper__container">
          <div class="main__middle__wrapper__container--image">
            <div class="main__middle__wrapper__container--image--text">
              <p class="main__middle__wrapper__container--image--text--all platform ">
                {this.props.platform}
              </p>
              <p class="main__middle__wrapper__container--image--text--all price">
                price {this.props.proce}$
              </p>
              <p class="main__middle__wrapper__container--image--text--all click">
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