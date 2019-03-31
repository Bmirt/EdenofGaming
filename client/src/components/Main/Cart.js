import React from "react";
import ShopContext from "../../context/shop-context";
import { EmptyCart } from "./EmptyCart";
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
                {context.cart.map(item=>
                  <tr key={item.item} className="cart__wrapper__content">
                    <td className="cart__wrapper__content__inside product">
                      {item.name}
                    </td>
                    <td className="cart__wrapper__content__inside platform">
                      {item.platforms}
                    </td>
                    <td className="cart__wrapper__content__inside price">{item.price}$</td>
                    <td style={{backgroundImage:`url(${item.image})`}} className="cart__wrapper__content__inside image"> </td>
                    <td className="cart__wrapper__content__inside publisher">
                      {item.developer}
                    </td>
                    <td className="cart__wrapper__content__inside delete">
                      <button onClick={context.removeFromCart.bind(this, item.item)} className="cart__wrapper__content__inside--delete">
                        Remove
                      </button>
                    </td>
                  </tr>
                )
                }
                </tbody>
              </table>
            )
           : (
            <EmptyCart />
          )
        }
      </ShopContext.Consumer>
    );
  }
}

export default Cart;
