import React from "react";
import logo from "../../final project/assets/images/eagle.png";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import SubNavigationItem from "./SubNavigationItem";
import LoginAndRegister from "./LoginAndRegister";
import { Search } from "./Search";
import CartIcon from "./CartIcon";
import showNavigation from '../../halpers/header_responsive';

import UserContext from "../../context/user-context";

class Header extends React.Component {
  state = {
    platforms: "Platforms",
    genre: "Genre",
    comingSoon: "Coming Soon",
    bestSeller: "Best Seller",
    merchandise: "Merchandise",
    action: "ACTION",
    adventure: "ADVENTURE",
    horror: "HORROR",
    strategy: "STRATEGY",
    online: "ONLINE",
    quest: "QUEST",
    other: "OTHER"
  };

  changeGeo() {
    this.setState({
      platforms: "პლატფორმა",
      genre: "ჟანრი",
      comingSoon: "მალე დაემატება",
      bestSeller: "ბესთსელერი",
      merchandise: "Merchandise",
      action: "ACTION",
      adventure: "სათავგადასავლო",
      horror: "საშინელებათა",
      strategy: "სტრატეგია",
      online: "ონლაინი",
      quest: "QUEST",
      other: "სხვა"
    });
  }

  changeEng() {
    this.setState({
      platforms: "Platforms",
      genre: "Genre",
      comingSoon: "Coming Soon",
      bestSeller: "Best Seller",
      merchandise: "Merchandise",
      action: "ACTION",
      adventure: "ADVENTURE",
      horror: "HORROR",
      strategy: "STRATEGY",
      online: "ONLINE",
      quest: "QUEST",
      other: "OTHER"
    });
  }

  render() {
    // const user = AuthMethods.getCurrentUser();
    return (
      <UserContext.Consumer>
        {context => (
          <header className="header">
            <section className="header__top">
              <div id="j" className="header__top__wrapper">
                <Logo logo={logo} />
                <button onClick={() => this.changeGeo()}>GEO</button>
                <button onClick={() => this.changeEng()}>ENG</button>
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
              <div onClick={showNavigation} className="header__bottom__burger" id="button">
                <div className="header__bottom__burger__line" id="a" />
                <div className="header__bottom__burger__line" id="b" />
                <div className="header__bottom__burger__line" id="c" />
              </div>
              <nav className="header__bottom__navigation" id="nav">
                <NavigationItem title={this.state.platforms}>
                  <SubNavigationItem title="PC" />
                  <SubNavigationItem title="PLAYSTATION 4" />
                  <SubNavigationItem title="XBOX 1" />
                  <SubNavigationItem title="3DS" />
                  <SubNavigationItem title="PS VITA" />
                </NavigationItem>

                <NavigationItem title={this.state.genre}>
                  <SubNavigationItem title="FPS" />
                  <SubNavigationItem title={this.state.action} />
                  <SubNavigationItem title={this.state.adventure} />
                  <SubNavigationItem title={this.state.horror} />
                  <SubNavigationItem title={this.state.strategy} />
                  <SubNavigationItem title={this.state.online} />
                  <SubNavigationItem title={this.state.quest} />
                  <SubNavigationItem title={this.state.other} />
                </NavigationItem>

                <NavigationItem title={this.state.comingSoon}>
                  <SubNavigationItem title="Most Preordered" />
                  <SubNavigationItem title="Most Liked" />
                  <SubNavigationItem title="MOST VIEWED" />
                  <SubNavigationItem title="AWARD VINING" />
                </NavigationItem>

                <NavigationItem title={this.state.bestSeller}>
                  <SubNavigationItem title="THIS WEEK" />
                  <SubNavigationItem title="THIS MONTH" />
                  <SubNavigationItem title="THIS YEAR" />
                  <SubNavigationItem title="ALL TIME" />
                </NavigationItem>

                <NavigationItem title={this.state.merchandise}>
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
