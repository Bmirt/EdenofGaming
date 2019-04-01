import React from "react";
import ShopContext from "../../context/shop-context";
import { EmptyCart } from "./EmptyCart";
import CartItem from "./CartItem";
import shopContext from "../../context/shop-context";
class Cart extends React.Component {
  render() {
    return (
      <ShopContext.Consumer>
        {context =>
          context.cart.length > 0 ? (
            <table className="cart">
              <thead className="cart__header">
                <tr className="cart__header__wrapper">
                  <th className="cart__header__wrapper__name ">Product</th>
                  <th className="cart__header__wrapper__name">Platform</th>
                  <th className="cart__header__wrapper__name">Price</th>
                  <th className="cart__header__wrapper__name">Image</th>
                  <th className="cart__header__wrapper__name">Publisher</th>
                  <th className="cart__header__wrapper__name">Remove</th>
                </tr>
              </thead>
              <tbody className="cart__wrapper">
                {context.cart.map(item => (
                  <CartItem key={item.item} item={item} />
                ))}
                <tr>
                  <td className="cart__wrapper__content__inside price">
                    Total Price
                  </td>
                  <td
                    className="cart__wrapper__content__inside price"
                    colSpan="5"
                  >
                    {context.getCartTotal().toFixed(2)}
                    $
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <EmptyCart />
          )
        }
      </ShopContext.Consumer>
    );
  }
}

export default Cart;
