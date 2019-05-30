import React from "react";
import ShopContext from "../../context/shop-context";

class CartIcon extends React.Component {
  static contextType = ShopContext;

  render() {
    return (
      <ShopContext.Consumer>
        {context => (
          <div className="header__top__wrapper--user--basket">
            <img
              src="https://cdn4.iconfinder.com/data/icons/shopping-in-color/64/shopping-in-color-05-512.png"
              className="header__top__wrapper--user--basket--image"
              alt="Cart"
            />
            <p className="header__top__wrapper--user--basket--number">
              {context.cart.length}
            </p>
          </div>
        )}
      </ShopContext.Consumer>
    );
  }
}
export default CartIcon;
