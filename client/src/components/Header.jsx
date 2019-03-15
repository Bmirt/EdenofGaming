import React from "react";
import logo from "./eagle.png";
import user from "../final project/assets/images/user.png";
import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import SubNavigationItem from "./SubNavigationItem";
class Header extends React.Component {
  render() {
    return (
      <>
        <header className="header">
          <section className="header__top">
            <div className="header__top__wrapper">
              <h1 className="header__top__wrapper--logo">
                <img
                  src={logo}
                  alt=""
                  className="header__top__wrapper--logo--image"
                  width="140px"
                />
              </h1>
              <div className="header__top__wrapper--user">
                <input
                  type="search"
                  placeholder="Search"
                  className="header__top__wrapper--user--search"
                />
                <div className="header__top__wrapper--user--login">
                  <img src={user} width="30px;" alt="" />
                  <Link
                    to={"/login"}
                    className="header__top__wrapper--user--login--text"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="header__bottom">
            <NavigationItem title="Platforms">
              <SubNavigationItem title="PC" />
              <SubNavigationItem title="PLAYSTATION 4" />
              <SubNavigationItem title="XBOX 1" />
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
              <SubNavigationItem title="MOST PREORDERED" />
              <SubNavigationItem title="MOST LIKED" />
              <SubNavigationItem title="MOST VIEWD" />
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
          </section>
        </header>
      </>
    );
  }
}

export default Header;
