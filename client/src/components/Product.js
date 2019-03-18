import React from "react";

class Product extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="main__middle__wrapper__container">
          <div className="main__middle__wrapper__container--image">
            <div className="main__middle__wrapper__container--image--text">
              <p className="main__middle__wrapper__container--image--text--all platform ">
                {this.props.platform}
              </p>
              <p className="main__middle__wrapper__container--image--text--all price">
                price {this.props.proce}$
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