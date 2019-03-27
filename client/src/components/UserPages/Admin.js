import React from "react";
import Auth from "../utils/AuthMethods";
// import axios from "axios";
import UserContext from "../../context/user-context";
import AddGames from "./admin/AddGame";

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
                  <ul className="list-group">
                    <li className="list-group-item text-muted">
                      New Activities <i className="fa fa-dashboard fa-1x" />
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>new Users</strong>
                      </span>{" "}
                      7098978
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Messages</strong>
                      </span>{" "}
                      125
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Likes</strong>
                      </span>{" "}
                      23
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Dislikes</strong>
                      </span>{" "}
                      4
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Comments</strong>
                      </span>{" "}
                      78
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Sold</strong>
                      </span>{" "}
                      28
                    </li>
                  </ul>

                  <div className="panel panel-default">
                    <div className="panel-heading"> Connect Social Media</div>
                    <div className="panel-body">
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
                        href="#pages"
                      >
                        Pages
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
                        href="#users"
                      >
                        Users
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane active" id="home">
                      <h3 className="header__bottom__nav--list">dashboard</h3>
                    </div>
                    <div className="tab-pane" id="pages">
                      <h3 className="header__bottom__nav--list">
                        Pages information
                      </h3>
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