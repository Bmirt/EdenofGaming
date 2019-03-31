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
    if(Auth.getCurrentUser()){
      const jwt = Auth.getJWT();
      fetch('/api/profile/products',{
        headers:{
            Authorization: jwt
        }
      }).then(res => res.json())
      .then(res => this.setState({cart: res}))
      .catch(err => console.log(err))
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
    alert("logout called")
    Auth.logout();
    this.setState({ user: null });
  };
  addToCart = product => {
    if (!Auth.getCurrentUser()) {
      this.message("You need to be logged in");
      return;
    }
    if (this.state.cart.includes(product)) {
      this.message("Item is Already In The cart");
      return;
    }
    const updatedCart = [...this.state.cart];
    updatedCart.push(product);
    this.message("Added To Cart")
    setTimeout(() => {
      this.setState({ cart: updatedCart,
      user:Auth.getCurrentUser()
      });
      this.context.cart = updatedCart;
    }, 100);
  };
  removeFromCart = productId => {
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
            message:this.message
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
