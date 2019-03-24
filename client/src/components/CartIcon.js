import React from "react";

class CartIcon extends React.Component {
  render() {
    return (
      <div className="header__top__wrapper--user--basket">
        <img
          src="https://es.toppng.com/public/uploads/preview/shopping-cart-11530997198v4d0ouzc1u.png"
          className="header__top__wrapper--user--basket--image"
        />
        <p className="header__top__wrapper--user--basket--number">(0)</p>
      </div>
    );
  }
}
export default CartIcon;