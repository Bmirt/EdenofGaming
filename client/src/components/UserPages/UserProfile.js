import React from "react";
import axios from "axios";
// import classnames from "classnames";
import UserContext from "../../context/user-context";

class UserProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      handle: "",
      age: "",
      location: "",
      phoneNumber: "",
      bio: "",
      balance: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const newProfile = {
      handle: this.state.handle,
      age: this.state.age,
      location: this.state.location,
      phoneNumber: this.state.phoneNumber,
      bio: this.state.bio,
      balance: this.state.balance
    };
    var config = {
      headers: { Authorization: localStorage.getItem("token") }
    };
    axios
      .post("http://localhost:5000/api/profile", newProfile, config)
      .then(res => {
        console.log(res.data);
        alert("Profile has been succesfully updated");
        window.location = "/";
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const { errors } = this.state;
    return (
      <UserContext.Consumer>
        {
          (context)=>
          <div>
            <div className="container bootstrap snippet">
              <div className="row">
                <div className="col-sm-10">
                  <h1 className="user-profile__name">
                    Welcome {context.user.name}
                  </h1>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-3">
                  <div className="text-center">
                    <img
                      src={context.user.avatar}
                      className="avatar img-circle img-thumbnail"
                      alt="avatar"
                    />
                    <h6>Upload a different photo...</h6>
                    <input
                      type="file"
                      className="text-center center-block file-upload"
                    />
                  </div>
                  <br />

                  <ul className="list-group">
                    <li className="list-group-item text-muted">
                      Activity <i className="fa fa-dashboard fa-1x" />
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Shares</strong>
                      </span>{" "}
                      125
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Likes</strong>
                      </span>{" "}
                      13
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Posts</strong>
                      </span>{" "}
                      37
                    </li>
                    <li className="list-group-item text-right">
                      <span className="pull-left">
                        <strong>Followers</strong>
                      </span>{" "}
                      78
                    </li>
                  </ul>

                  <div className="panel panel-default">
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
                        Basic Information
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane active" id="home">
                      <form
                        className="user-formm"
                        onSubmit={this.onSubmit}
                        method="patch"
                        id="registrationForm"
                      >
                        <div className="form-group">
                          <div className="col-xs-6">
                            <label htmlFor="first_name">
                              <h4 className="user-profile__input-title">
                                handle identifier
                              </h4>
                            </label>
                            <input
                              type="text"
                              name="handle"
                              id="first_name"
                              placeholder="handle"
                              className="form-control user-profile__input "
                              title="enter your unique identifier"
                              value={this.state.handle}
                              onChange={this.onChange}
                            />
                            {errors.handle && (
                              <p className="form__wrapper__popup username is-red">
                                {errors.handle}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="col-xs-6">
                            <label htmlFor="last_name">
                              <h4 className="user-profile__input-title">Age</h4>
                            </label>
                            <input
                              type="text"
                              className="form-control user-profile__input "
                              name="age"
                              id="last_name"
                              placeholder="Age"
                              title="Enter your age"
                              value={this.state.age}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-xs-6">
                            <label htmlFor="email">
                              <h4 className="user-profile__input-title">
                                Biography
                              </h4>
                            </label>
                            <textarea
                              type="text"
                              className="form-control user-profile__input"
                              name="bio"
                              id="email"
                              title="enter your email."
                              value={this.state.bio}
                              onChange={this.onChange}
                              cols="30"
                              rows="9"
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-xs-6">
                            <label htmlFor="phone">
                              <h4 className="user-profile__input-title">
                                Location
                              </h4>
                            </label>
                            <input
                              type="text"
                              className="form-control user-profile__input"
                              name="location"
                              id="phone"
                              placeholder="enter your location"
                              title="Enter the name of the country you live in"
                              value={this.state.location}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>

                        <div className="form-group">
                          <div className="col-xs-6">
                            <label htmlFor="mobile">
                              <h4 className="user-profile__input-title">
                                Phone
                              </h4>
                            </label>
                            <input
                              type="text"
                              className="form-control user-profile__input"
                              name="phoneNumber"
                              id="mobile"
                              placeholder="enter mobile number"
                              title="enter your mobile number if any."
                              value={this.state.phoneNumber}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>

                        

                        <div className="form-group">
                          <div className="col-xs-6">
                            <label htmlFor="mobile">
                              <h4 className="user-profile__input-title">
                                Balance
                              </h4>
                            </label>
                            <input
                              type="number"
                              className="form-control user-profile__input "
                              name="balance"
                              id="mobile"
                              placeholder="Add Funds"
                              title="Enter Balance"
                              value={this.state.balance}
                              onChange={this.onChange}
                            />
                          </div>
                        </div>
                        
                        <div className="form-group">
                          <div className="col-xs-12">
                            <br />
                            <button
                              className="btn btn-lg btn-success user-profile__btn user-profile__btn__color"
                              type="submit"
                            >
                              <i className="glyphicon glyphicon-ok-sign" /> Save
                            </button>
                            <button
                              className="btn btn-lg  user-profile__btn"
                              type="reset"
                            >
                              <i className="glyphicon glyphicon-repeat" /> Reset
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </UserContext.Consumer>
    );
  }
}

export default UserProfile;