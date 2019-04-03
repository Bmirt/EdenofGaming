import React from "react";
import Auth from "../utils/AuthMethods";
// import axios from "axios";
import UserContext from "../../context/user-context";
import AddGames from "./admin/AddGame";
import UserPanel from "./admin/UserPanel";
import Avarage from "./admin/Avarage";
import TotalUsers from "./admin/TotalUsers";
import DeleteGame from "./admin/DeleteGame";
import GamePanel from "./admin/GamePanel";
import UpdateGame from "./admin/UpdateGame";
import UpdateUserName from "./admin/UpdateUserName";
import AdminMessage from "./admin/AdminMessage";
import ReplyMessage from "./admin/ReplyMessage";

class Admin extends React.Component {
  state = {
    isAdmin: null
  };
  componentDidMount() {
    this.setState({ isAdmin: Auth.isAdmin() });
  }
  render() {
    if (!this.state.isAdmin) {
      return (
        <h1
          style={{
            textAlign: "center",
            fontSize: "20px",
            color: "#FFF",
            margin: "200px 0"
          }}
        >
          You Don't have Access To This Page
        </h1>
      );
    }
    return (
      <UserContext.Consumer>
        {context => (
          <div>
            <div className="container bootstrap snippet">
              <div className="row">
                <div className="col-sm-10">
                  <h1 className="admin__name">
                    Admin Panel
                    <span className="admin__name--title">Manage Your Site</span>
                  </h1>
                  <h2 className="admin__name">
                    Welcome {context.user.name}{" "}
                  </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <ul className="admin__list__group">
                    <li className="admin__list__item text-muted">
                      New Activities <i className="fa fa-dashboard" />
                    </li>
                    <li className="admin__list__item text-right">
                      <span className="admin__list__span">
                      new Users
                      </span>{" "}
                      7098978
                    </li>
                    <li className="admin__list__item text-right">
                      <span className="admin__list__span">
                      Messages
                      </span>{" "}
                      125
                    </li>
                    <li className="admin__list__item text-right">
                      <span className="admin__list__span">
                      Likes
                      </span>{" "}
                      23
                    </li>
                    <li className="admin__list__item text-right">
                      <span className="admin__list__span">
                      Dislikes
                      </span>{" "}
                      4
                    </li>
                    <li className="admin__list__item text-right">
                      <span className="admin__list__span">
                      Comments
                      </span>{" "}
                      78
                    </li>
                    <li className="admin__list__item text-right">
                      <span className="admin__list__span">
                      Sold
                      </span>{" "}
                      28
                    </li>
                  </ul>

                  <div>
                    <div className="panel-heading admin__list__item"> Connect Social Media</div>
                    <div className="panel-body admin__list__item">
                      <div className="bottom">
                        <a
                          className="btn btn-primary btn-twitter btn-sm admin__game__social"
                          href="https://twitter.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                             <i className="fab fa-twitter awesome twitter" />
                        </a>
                        <a
                          className="btn btn-danger btn-sm admin__game__social"
                          href="https://youtube.com"
                          target="_blank"
                          rel="noopener noreferrer"

                        >
                            <i className="fab fa-youtube awesome youtube" />
                        </a>
                        <a
                          className="btn btn-primary btn-sm admin__game__social"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://facebook.com"
                        >
                            <i className="fab fa-facebook-f awesome facebook" />
                        </a>
                        <a
                          className="btn btn-warning btn-sm admin__game__social"
                          target="_blank"
                          rel="noopener noreferrer"
                          href="https://instagram.com"
                        >
                            <i className="fab fa-instagram awesome instagram" />

                        </a>
                      </div>{" "}
                    </div>
                  </div>

                  {/* aaaaaaaaaaaa */}
                </div>
                <div className="col-sm-9">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a
                        data-toggle="tab"
                        className="user-profile__link"
                        href="#home"
                      >
                        dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        className="user-profile__link"
                        href="#users"
                      >
                        Users
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        className="user-profile__link"
                        href="#deleteGame"
                      >
                        edit username
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        className="user-profile__link"
                        href="#gamelist"
                      >
                        game list
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        className="user-profile__link"
                        href="#games"
                      >
                        Add Games
                      </a>
                    </li>
                   

                    <li>
                      <a
                        data-toggle="tab"
                        className="user-profile__link"
                        href="#updateGame"
                      >
                        update/delete Game
                      </a>
                    </li>

                    <li>
                      <a
                        data-toggle="tab"
                        className="user-profile__link"
                        href="#messages"
                      >
                         Messages
                      </a>
                    </li>
                    <li>
                      <a
                        data-toggle="tab"
                        className="user-profile__link"
                        href="#replymessages"
                      >
                         Reply
                      </a>
                    </li>


                    
                    
                  </ul>

                  

                  <div className="tab-content">
                    <div className="tab-pane active admin__dash" id="home">
                      <div className="admin__dash">
                        <Avarage />
                        <TotalUsers />
                        
                      </div>
                    </div>
                    <div className="tab-pane" id="messages">
                      <h3 className="header__bottom__nav--list">
                        Messages
                      </h3>
                      <AdminMessage />
                    </div>
                    <div className="tab-pane" id="replymessages">
                      <h3 className="header__bottom__nav--list">
                        Reply Messages
                      </h3>
                      <ReplyMessage />
                    </div>
                    <div className="tab-pane" id="gamelist">
                      <h3 className="header__bottom__nav--list">
                        game list
                      </h3>
                      <GamePanel />
                    </div>
                    <div className="tab-pane" id="deleteGame">
                      <h3 className="header__bottom__nav--list">
                        update user name
                      </h3>
                      <UpdateUserName />
                    </div>
                    <div className="tab-pane" id="updateGame">
                      <h3 className="header__bottom__nav--list">
                        Update games
                      </h3>
                      <UpdateGame />
                      <h3 className="header__bottom__nav--list">
                        delete games
                      </h3>
                      <DeleteGame />
                    </div>
                    <div className="tab-pane" id="games">
                      <h3 className="header__bottom__nav--list">
                       <AddGames />
                      </h3>
                    </div>
                    <div className="tab-pane" id="users">
                      <h3 className="header__bottom__nav--list">
                        Users information
                      </h3>
                      <UserPanel />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

export default Admin;
