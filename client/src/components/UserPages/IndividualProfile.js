import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import userContext from "../../context/user-context";

class IndividualProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: []
    };
  }
  static contextType = userContext;
  componentWillMount() {
    window.scroll(0, 0);
    var config = {
      headers: { Authorization: localStorage.getItem("token") }
    };

    axios
      .get(`/api/profile`, config)
      .then(res => {
        console.log(res.data);
        this.setState({
          profile: res.data
        });
      })
      .catch(err => this.setState({ isLoaded: true }));
  }

  render() {
    const { errors } = this.state;
    var styles = {
      position: "relative"
    };
    var styles2 = {
      position: "absolute",
      top: 0,
      left: 0
    };
    return (
      <React.Fragment>
        <div className="container individ__container">
          <form method="post">
            <div className="row">
              <div className="col-md-4">
                <div className="individ__img-container">
                  <img
                    className="individ__profile-image"
                    src={this.state.profile.profileImage}
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="profile-head">
                  <h3 className="individ__name">{this.state.profile.handle}</h3>
                  <p className="individ__member">Eden Of Gaming member</p>
                  <p className="individ__balance">
                    BALANCE :{" "}
                    <span className="individ__balance--num">
                      {this.state.profile.balance}
                    </span>
                  </p>
                  <ul className="nav nav-tabs" id="myTab" role="tablist">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <Link to="/userprofile">
                <div className="col-md-2">
                  <span name="btnAddMore" className="profile-edit-btn">Edit Profile</span>
                </div>
              </Link>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="individ__paneli panel-default">
                  <div className="panel-heading">Social Media</div>
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
              </div>
              <div className="col-md-8">
                <div className="tab-content profile-tabb" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label className="individ__label">User Id</label>
                      </div>
                      <div className="col-md-6">
                        <p className="individ__p">{this.state.profile._id}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="individ__label">Name</label>
                      </div>
                      <div className="col-md-6">
                        <p className="individ__p">
                          {this.state.profile.handle}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="individ__label">Email</label>
                      </div>
                      <div className="col-md-6">
                        <p className="individ__p">{this.context.user.email}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="individ__label">Phone</label>
                      </div>
                      <div className="col-md-6">
                        <p className="individ__p">
                          {this.state.profile.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="individ__label">location</label>
                      </div>
                      <div className="col-md-6">
                        <p className="individ__p">
                          {this.state.profile.location}
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="individ__label">age</label>
                      </div>
                      <div className="col-md-6">
                        <p className="individ__p">{this.state.profile.age}</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label className="individ__label">bio</label>
                      </div>
                      <div className="col-md-6">
                        <p className="individ__p">{this.state.profile.bio}</p>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  />
                </div>
                {/* <div>
                  <div classNameName="user__cdkey">
                    <div>
                      <table classNameName="user__cdkey__table">
                        <thead>
                          <tr classNameName="user__cdkey__table--tr">
                            <th classNameName="user__cdkey__table--th">
                              Game Name
                            </th>
                            <th classNameName="user__cdkey__table--th">
                              cd-key
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.profile.cart.map(item => (
                            <tr
                              key={item._id}
                              classNameName="user__cdkey__table--tr"
                            >
                              <td classNameName="user__cdkey__table--td">
                                <img
                                  src={item.image}
                                  alt="avatar"
                                  classNameName="discription__wrappertop__down__comment--wrapper--result--replay--profile--image"
                                />
                                <span classNameName="user__cdkey__table--span">
                                  {" "}
                                  {item.name}
                                </span>
                              </td>

                              <td classNameName="user__cdkey__table--td">
                                <span classNameName="user__cdkey__table--span">
                                  {item.cdkey}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div> */}
                {/* </div> */}
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default IndividualProfile;
