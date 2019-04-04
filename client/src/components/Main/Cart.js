import React from "react";
import ShopContext from "../../context/shop-context";
import { EmptyCart } from "./EmptyCart";
import CartItem from "./CartItem";
import Product from "../Product/Product";
import {Link} from "react-router-dom"
class Cart extends React.Component {
  static contextType = ShopContext;
  componentDidMount() {}
  render() {
    return (
      <ShopContext.Consumer>
        {context =>
          context.cart.length > 0 ? (
            <div>
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
                  <td className="cart__wrapper__content__inside totalprice">
                     
                    </td>
                    <td className="cart__wrapper__content__inside totalprice ">
                      Total Price :
                    </td>
                    
                    <td
                      className="cart__wrapper__content__inside totalprice third"
                      //  colSpan="2"
                    >
                      {context.getCartTotal().toFixed(2)}$
                    </td>
                    <td  style={{ textAlign: "center" }} className="buy__wrapper">
                      <button onClick={context.purchase} className="cart__wrapper__content__inside--delete buy">
                        Buy
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {context.suggestedItem && (
                <div>
                  <h1 style={{textAlign:"center"}}>Other User Also Bought</h1>
                  <section className="main__middle">
                    <div className="main__middle__wrapper">
                      {context.suggestedItem && (
                        <Product
                          key={context.suggestedItem._id}
                          id={context.suggestedItem._id}
                          image={context.suggestedItem.image}
                          platform={context.suggestedItem.platforms}
                          price={context.suggestedItem.price}
                          name={context.suggestedItem.name}
                        />
                      )}
                    </div>
                  </section>
                </div>
              )}
            </div>
          ) : (
            <EmptyCart />
          )
        }
      </ShopContext.Consumer>
    );
  }
}

export default Cart;
