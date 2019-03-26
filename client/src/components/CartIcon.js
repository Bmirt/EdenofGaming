import React from "react";
import ShopContext from "../context/shop-context";

class CartIcon extends React.Component {
  static contextType = ShopContext;

  render() {
    return (
      <ShopContext.Consumer>
        {context => (
          <div className="header__top__wrapper--user--basket">
            <img
              src="https://es.toppng.com/public/uploads/preview/shopping-cart-11530997198v4d0ouzc1u.png"
              className="header__top__wrapper--user--basket--image"
              alt="Cart"
            />
            <p className="header__top__wrapper--user--basket--number">
              {this.context.cart.reduce((count, curItem) => {
                return count + curItem.quantity;
              }, 0)}
            </p>
          </div>
        )}
      </ShopContext.Consumer>
    );
  }
}
export default CartIcon;
