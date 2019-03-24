import React from "react";
import logo from "../final project/assets/images/eagle.png";
import {Logo} from "./Logo";
import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import SubNavigationItem from "./SubNavigationItem";
import LoginAndRegister from "./LoginAndRegister";
import {Search} from "./Search";
import AuthMethods from "./utils/AuthMethods";
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      logout: props.logout,
      isAdmin: props.isAdmin

    };
  }

  render() {
    console.log(AuthMethods.isAdmin())
    return (
      <>
        <header className="header">
          <section className="header__top">
            <div id="j" className="header__top__wrapper">
              <Logo logo={logo}/>
              <Search/>
              <div className="header__top__wrapper--user">
                {this.state.user ? this.state.isAdmin ? 
                
                  (
                  <div>
                    <Link to={"/admin"} style={{ color: "white", fontSize:"16px" }}>
                      {this.props.user.name}
                    </Link>
                    <Link
                      onClick={this.state.logout}
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
                :
                 (
                  <div>
                    <Link to={"/userprofile"} style={{ color: "white", fontSize:"16px" }}>
                      {this.props.user.name}
                    </Link>
                    <Link
                      onClick={this.state.logout}
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
                  <LoginAndRegister/>
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
