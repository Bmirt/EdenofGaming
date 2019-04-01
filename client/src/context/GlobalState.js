import React from "react";
import ShopContext from "./shop-context";
import UserContext from "./user-context";
import Auth from "../components/utils/AuthMethods";
import MessageBox from "../components/utils/MessageBox";
import SearchBox from "../components/SearchBox";
import { Router } from "react-router-dom";
class GlobalState extends React.Component {
  static contextType = ShopContext;
  state = {
    user: Auth.getCurrentUser(),
    games: [],
    cart: [],
    MessageBoxIsOpen: false,
    MessageBoxText: "",
    searchBoxVisible: false,
    searchResult: []
  };
  componentDidMount() {
    const jwt = Auth.getJWT();
    if (jwt) {
      Promise.all([
        fetch("/api/profile/products", {
          headers: {
            Authorization: jwt
          }
        }),
        fetch("/api/products")
      ])
        .then(([cart, games]) => {
          return Promise.all([cart.json(), games.json()]);
        })
        .then(([cart, games]) => {
          this.setState({ cart: cart, games: games });
        })
        .catch(err => {
          console.log(err);
        });
    }
    fetch("/api/products")
      .then(res => res.json())
      .then(res => this.setState({ games: res }))
      .catch(err => console.log(err));
  }
  searchBoxVisible = visibility => {
    this.setState({
      searchBoxVisible: visibility
    });
  };
  search = name => {
    console.log("searc")
    let res = [];
    res = this.state.games.filter((value)=>  value.name.toUpperCase().includes(name.toUpperCase()));
    this.setState({ searchResult: res });
  };
  closeSearchBox=()=>{
    this.setState({
      searchBoxVisible:false
    })
  }
  closeMessageBox = () => {
    this.setState({ MessageBoxIsOpen: false, MessageBoxText: " " });
  };
  message = messageText => {
    this.setState({
      MessageBoxIsOpen: true,
      MessageBoxText: messageText
    });
    setTimeout(() => {
      this.closeMessageBox();
    }, 2000);
  };

  logout = () => {
    Auth.logout();
    this.setState({ user: null });
  };
  addToCart = product => {
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
        .then(res => {
          const updatedCart = [...this.state.cart];
          const newItem = {
            item: product._id,
            price: product.price,
            image: product.image,
            name: product.name
          };
          this.message("Added To Cart");
          updatedCart.push(newItem);
          this.setState({ cart: updatedCart });
        });
    }
  };
  removeFromCart = productId => {
    const updatedCart = [...this.state.cart];
    const updatedItemIndex = updatedCart.findIndex(
      item => item.item === productId
    );
    updatedCart.splice(updatedItemIndex, 1);
    const jwt = Auth.getJWT();
    fetch(`/api/profile/product/${productId}`, {
      method: "delete",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => this.setState({ cart: updatedCart }));
  };
  getCartTotal=()=>{
    let sum = 0;
    for(let i = 0; i < this.state.cart.length;i++){
      sum += Number(this.state.cart[i].price);
    }
    return sum;
  }
  render() {
    if(this.state.cart.length>0){
    console.log(this.getCartTotal())

    }
    return (
      <UserContext.Provider
        value={{
          user: this.state.user,
          updateUserState: this.updateUserState,
          updateAdminState: this.updateAdminState,
          logout: this.logout,
          message: this.message,
          searchBoxVisible: this.searchBoxVisible,
          search: this.search
        }}
      >
        <ShopContext.Provider
          value={{
            games: this.state.games,
            cart: this.state.cart,
            addToCart: this.addToCart,
            removeFromCart: this.removeFromCart,
            count: this.state.count,
            message: this.message,
            getCartTotal: this.getCartTotal
          }}
        >
          <SearchBox
            visible={this.state.searchBoxVisible}
            games={this.state.searchResult}
            close={this.closeSearchBox}
          />

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
