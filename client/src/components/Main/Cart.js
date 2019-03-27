import React from "react";
import ShopContext from "../../context/shop-context";
import Product from "../Product/Product";
import { EmptyCart } from "./EmptyCart";
class Cart extends React.Component {
  render() {
    return (
      <ShopContext.Consumer>
        {(context) =>
          context.cart.length > 0 ? 
          context.cart.map(game => (
            <Product
              key={game._id}
              id={game._id}
              image={game.image}
              platform={game.platforms}
              price={game.price}
              name={game.name}
            />
          )) :
          <EmptyCart/>
        }
      </ShopContext.Consumer>
    );
  }
}

export default Cart;
