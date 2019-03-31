import React from "react";
import ShopContext from "./shop-context";
import UserContext from "./user-context";
import Auth from "../components/utils/AuthMethods";
import MessageBox from "../components/utils/MessageBox";
class GlobalState extends React.Component {
  static contextType = ShopContext;
  state = {
    user: Auth.getCurrentUser(),
    games: [],
    cart: [],
    MessageBoxIsOpen: false,
    MessageBoxText: ""
  };
  componentDidMount() {
    if (Auth.getCurrentUser()) {
      const jwt = Auth.getJWT();
      fetch("/api/profile/products", {
        method: "GET",
        headers: {
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(res => this.setState({ cart: res }))
        .catch(err => console.log(err));
    }
    this.setState({
      user: Auth.getCurrentUser(),
      games: this.context.games,
      // cart: this.context.cart,
      MessageBoxIsOpen: false,
      MessageBoxText: ""
    });
  }
  closeMessageBox = () => {
    this.setState({ MessageBoxIsOpen: false, MessageBoxText: " " });
  };
  message = messageText => {
    this.setState({
      MessageBoxIsOpen: true,
      MessageBoxText: messageText
    });
  };

  logout = () => {
    Auth.logout();
    this.setState({ user: null });
  };
  addToCart = product => {
    console.log("cart", this.state.cart);
    if (!Auth.getCurrentUser()) {
      this.message("You need to be logged in");
      return;
    }
    for (let i = 0; i < this.state.cart.length; i++) {
      if (this.state.cart[i].item === product._id) {
        this.message("Item is Already In The cart");
        return;
      }
    }
    if (Auth.getCurrentUser()) {
      const jwt = Auth.getJWT();
      fetch(`/api/profile/product/${product._id}`, {
        method: "POST",
        headers: {
          Authorization: jwt
        }
      })
        .then(res => res.json())
        .then(res => {});
      const updatedCart = [...this.state.cart];
      const newItem = {
        item: product._id,
        price: product.price,
        image: product.image,
        name: product.name
      };
      updatedCart.push(newItem);
      this.message("Added To Cart");
      setTimeout(() => {
        this.setState({ cart: updatedCart, user: Auth.getCurrentUser() });
        this.context.cart = updatedCart;
      }, 100);
    }
  };
  removeFromCart = productId => {
    console.log("productid ", productId);
    const jwt = Auth.getJWT();
    fetch(`/api/profile/product/${productId}`, {
      method: "delete",
      headers: {
        Authorization: jwt
      }
    });
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.id === productId
    );
    updatedCart.splice(updatedItemIndex, 1);
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
          updateAdminState: this.updateAdminState,
          logout: this.logout,
          message: this.message
        }}
      >
        <ShopContext.Provider
          value={{
            games: this.state.games,
            cart: this.state.cart,
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            count: this.state.count,
            message: this.message
          }}
        >
          <MessageBox
            isOpen={this.state.MessageBoxIsOpen}
            close={this.closeMessageBox}
          >
            {this.state.MessageBoxText}
          </MessageBox>
          {this.props.children}
        </ShopContext.Provider>
      </UserContext.Provider>
    );
  }
}

export default GlobalState;
