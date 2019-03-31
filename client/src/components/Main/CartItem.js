import React from "react";
import shopContext from "../../context/shop-context";

class CartItem extends React.Component {
  constructor(props) {
    super(props);
  }
  static contextType = shopContext;
  render() {
    return (
      <tr key={this.props.item.item} className="cart__wrapper__content">
        <td className="cart__wrapper__content__inside product">
          {this.props.item.name}
        </td>
        <td className="cart__wrapper__content__inside platform">
          {this.props.item.platforms}
        </td>
        <td className="cart__wrapper__content__inside price">
          {this.props.item.price}$
        </td>
        <td
          style={{ backgroundImage: `url(${this.props.item.image})` }}
          className="cart__wrapper__content__inside image"
        >
          {" "}
        </td>
        <td className="cart__wrapper__content__inside publisher">
          {this.props.item.developer}
        </td>
        <td className="cart__wrapper__content__inside delete">
          <button
            onClick={this.context.removeFromCart.bind(
              this,
              this.props.item.item
            )}
            className="cart__wrapper__content__inside--delete"
          >
            Remove
          </button>
        </td>
      </tr>
    );
  }
}

export default CartItem;