import React from "react";
import ShopContext from '../context/shop-context';

class CartIcon extends React.Component {
    static contextType = ShopContext;
    state ={
        count: 0
    }
    componentDidMount(){
        this.setState({count:this.context.cart.length})
    }
  render() {
    return (
      <div className="header__top__wrapper--user--basket">
        <img
          src="https://es.toppng.com/public/uploads/preview/shopping-cart-11530997198v4d0ouzc1u.png"
          className="header__top__wrapper--user--basket--image"
          alt="Cart"
        />
        <p className="header__top__wrapper--user--basket--number">({this.state.count})</p>
      </div>
    );
  }
}
export default CartIcon;