import React from "react";
import logo from "../final project/assets/images/eagle.png";
import user from "../final project/assets/images/user.png";
import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import SubNavigationItem from "./SubNavigationItem";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      logout: props.logout
    };
  }

  render() {
    return (
      <>
        <header className="header">
          <section className="header__top">
            <div id="j" className="header__top__wrapper">
              <Link to={"/"} className="header__top__wrapper--logo">
                <img
                  src={logo}
                  alt=""
                  className="header__top__wrapper--logo--image"
                />
              </Link>
              <div id="z" className="header__top__wrapper__search">
                <input
                  type="search"
                  placeholder="Search"
                  className="header__top__wrapper__search--content"
                />
                <button className="header__top__wrapper__search--button">
                  <i className="fab fa-searchengin awesome" />
                </button>
              </div>
              <div className="header__top__wrapper--user">
                {this.state.user ? (
                  <div>
                    <Link to={"/userprofile"} style={{ color: "white" }}>
                      {this.props.user.name}
                    </Link>
                    <Link
                      onClick={this.state.logout}
                      to={"/"}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        fontSize: "15px",
                        marginLeft: "20px"
                      }}
                    >
                      Log Out
                    </Link>
                  </div>
                ) : (
                  <>
                    <Link
                      to={"/login"}
                      className="header__top__wrapper--user--login"
                    >
                      <img src={user} width="30px;" alt="" />
                      <span className="header__top__wrapper--user--login--text">
                        Log In
                      </span>
                    </Link>
                    <Link
                      to={"/register"}
                      className="header__top__wrapper--user--login register"
                    >
                      <img src={user} width="30px;" alt="" />
                      <span className="header__top__wrapper--user--login--text ">
                        Register
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </section>

          <section className="header__bottom">
            <nav className="header__bottom__navigation">
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
      </>
    );
  }
}

export default Header;
