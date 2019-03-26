import React from "react";
import ShopContext from "./shop-context";
import UserContext from "./user-context";
import Auth from "../components/utils/AuthMethods";
import Product from "../components/Product";
class GlobalState extends React.Component {
    static contextType = ShopContext;
  state = {
    user: Auth.getCurrentUser(),
    games: this.context.games,
    cart: this.context.cart,
    count: this.context.cart.length,
  };
  updateUserState = username => {
    this.setState({ user: username });
  };
  updateAdminState = adminStatus => {
    this.setState({ isAdmin: adminStatus });
  };

  logout = () => {
    Auth.logout();
    this.setState({ user: null });
  };
  addToCart = product => {
    console.log('Adding product', product);
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === product.id
    );

    if (updatedItemIndex < 0) {
      updatedCart.push({ ...product, quantity: 1 });
    } else {
      const updatedItem = {
        ...updatedCart[updatedItemIndex]
      };
      updatedItem.quantity++;
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setTimeout(() => {
      this.setState({ cart: updatedCart });
    }, 100);
  };
  removeFromCart = productId => {
    console.log('Removing product with id: ' + productId);
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === productId
    );

    const updatedItem = {
      ...updatedCart[updatedItemIndex]
    };
    updatedItem.quantity--;
    if (updatedItem.quantity <= 0) {
      updatedCart.splice(updatedItemIndex, 1);
    } else {
      updatedCart[updatedItemIndex] = updatedItem;
    }
    setTimeout(() => {
      this.setState({ cart: updatedCart });
    }, 100);
  };
  render() {
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          updateUserState: this.updateUserState,
          updateAdminState:this.updateAdminState,
          logout:this.logout
        }}
      >
        <ShopContext.Provider value={{
            games: this.state.games,
            cart: this.state.cart,
            addToCart: this.addToCart,
            count:this.state.count
        }}>{this.props.children}</ShopContext.Provider>
      </UserContext.Provider>
    );
  }
}

export default GlobalState;
