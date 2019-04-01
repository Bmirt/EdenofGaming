import React from "react";
import logo from "../../final project/assets/images/eagle.png";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import SubNavigationItem from "./SubNavigationItem";
import LoginAndRegister from "./LoginAndRegister";
import Search from "./Search";
import CartIcon from "./CartIcon";
import headerResponsive from '../../halpers/header_responsive'
import UserContext from "../../context/user-context";

class Header extends React.Component {
  render() {
    // const user = AuthMethods.getCurrentUser();
    return (
      <UserContext.Consumer>
        {context => (
          <header className="header">
            <section className="header__top">
              <div id="j" className="header__top__wrapper">
                <Logo logo={logo} />
                <Search />
                <div className="header__top__wrapper--user">
                  {context.user ? (
                    context.user.isAdmin ? (
                      <div>
                        <Link
                          className="header__top__wrapper--user--name"
                          to={"/admin"}
                          style={{ color: "white", fontSize: "16px" }}
                        >
                          {context.user.name}
                        </Link>
                        <Link
                          className="header__top__wrapper--user--logout"
                          onClick={context.logout}
                          to={"/"}
                          style={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: "16px",
                            marginLeft: "20px"
                          }}
                        >
                          Log Out
                        </Link>
                      </div>
                    ) : (
                      <div>
                        <Link to="/cart">
                          <CartIcon />
                        </Link>
                        <Link
                          to={"/userprofile"}
                          style={{ color: "white", fontSize: "16px" }}
                        >
                          {context.user.name}
                        </Link>
                        <Link
                          className=""
                          onClick={context.logout}
                          to={"/"}
                          style={{
                            textDecoration: "none",
                            color: "white",
                            fontSize: "16px",
                            marginLeft: "20px"
                          }}
                        >
                          Log Out
                        </Link>
                      </div>
                    )
                  ) : (
                    <LoginAndRegister />
                  )}
                </div>
              </div>
            </section>

            <section className="header__bottom">
              <div className="header__bottom__burger" onClick={headerResponsive} id="button">
                <div className="header__bottom__burger__line" id="a" />
                <div className="header__bottom__burger__line" id="b" />
                <div className="header__bottom__burger__line" id="c" />
              </div>
              <nav className="header__bottom__navigation" id="nav">
                <NavigationItem title="Platforms">
                  <SubNavigationItem title="PC" />
                  <SubNavigationItem title="PS4" />
                  <SubNavigationItem title="Xbox One" />
                  <SubNavigationItem title="3DS" />
                  <SubNavigationItem title="PS VITA" />
                </NavigationItem>

                <NavigationItem title="Genres">
                  <SubNavigationItem title="FPS" />
                  <SubNavigationItem title="ACTION" />
                  <SubNavigationItem title="ADVENTURE" />
                  <SubNavigationItem title="HOROR" />
                  <SubNavigationItem title="STRATEGY" />
                  <SubNavigationItem title="ONLINE" />
                  <SubNavigationItem title="QUEST" />
                  <SubNavigationItem title="OTHER" />
                </NavigationItem>

                <NavigationItem title="Coming Soon">
                  <SubNavigationItem title="Most Preordered" />
                  <SubNavigationItem title="Most Liked" />
                  <SubNavigationItem title="MOST VIEWED" />
                  <SubNavigationItem title="AWARD VINING" />
                </NavigationItem>

                <NavigationItem title="Best Sellers">
                  <SubNavigationItem title="THIS WEEK" />
                  <SubNavigationItem title="THIS MONTH" />
                  <SubNavigationItem title="THIS YEAR" />
                  <SubNavigationItem title="ALL TIME" />
                </NavigationItem>

                <NavigationItem title="Merchandise">
                  <SubNavigationItem title="T-SHIRTS" />
                  <SubNavigationItem title="MUGS" />
                  <SubNavigationItem title="POSSTERS" />
                  <SubNavigationItem title="TOYS" />
                </NavigationItem>
              </nav>
            </section>
          </header>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Header;
