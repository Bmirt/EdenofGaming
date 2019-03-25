import React from "react";
import ShopContext from "./shop-context";
import UserContext from "./user-context";
import Auth from "../components/utils/AuthMethods";
class GlobalState extends React.Component {
    static contextType = ShopContext;
  state = {
    user: Auth.getCurrentUser(),
    games: this.context.games
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
            games: this.state.games
        }}>{this.props.children}</ShopContext.Provider>
      </UserContext.Provider>
    );
  }
}

export default GlobalState;
