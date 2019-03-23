import React from "react";
// import axios from "axios";

class UserProfile extends React.Component {
  render() {
    return (
      <div>
        <div className="container bootstrap snippet">
          <div className="row">
            <div className="col-sm-10">
              <h1 className= "user-profile__name">{this.props.user.name}</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="text-center">
                <img
                  src={this.props.user.avatar}
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
                      className="btn btn-primary btn-twitter btn-sm"
                      href="https://twitter.com"
                    >
                      <i className="fa fa-twitter" />
                    </a>
                    <a
                      className="btn btn-danger btn-sm"
                      rel="publisher"
                      href="https://plus.google.com"
                    >
                      <i className="fa fa-google-plus" />
                    </a>
                    <a
                      className="btn btn-primary btn-sm"
                      rel="publisher"
                      href="https://plus.google.com"
                    >
                      <i className="fa fa-facebook" />
                    </a>
                    <a
                      className="btn btn-warning btn-sm"
                      rel="publisher"
                      href="https://plus.google.com"
                    >
                      <i className="fa fa-behance" />
                    </a>
                  </div>{" "}
                </div>
              </div>

              {/* aaaaaaaaaaaa */}
            </div>
            <div className="col-sm-9">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a data-toggle="tab" className="user-profile__link" href="#home">
                    Basic Information
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" className="user-profile__link" href="#balance">
                    Balance
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane active" id="home">
                 
                  <form className="user-formm" action="##" method="patch" id="registrationForm">
                          <div className="form-group">
                              
                              <div className="col-xs-6">
                                  <label htmlFor="first_name"><h4 className= "user-profile__input-title">First name</h4></label>
                                  <input type="text" className="form-control user-profile__input" name="first_name" id="first_name" placeholder="first name" title="enter your first name if any."/>
                              </div>
                          </div>
                          <div className="form-group">
                              
                              <div className="col-xs-6">
                                  <label htmlFor="last_name"><h4 className= "user-profile__input-title">Last name</h4></label>
                                  <input type="text" className="form-control user-profile__input" name="last_name" id="last_name" placeholder="last name" title="enter your last name if any."/>
                              </div>
                          </div>
              
                          <div className="form-group">
                              
                              <div className="col-xs-6">
                                  <label htmlFor="phone"><h4 className= "user-profile__input-title">Phone</h4></label>
                                  <input type="text" className="form-control user-profile__input" name="phone" id="phone" placeholder="enter phone" title="enter your phone number if any."/>
                              </div>
                          </div>
              
                          <div className="form-group">
                              <div className="col-xs-6">
                                  <label htmlFor="mobile"><h4 className= "user-profile__input-title">Mobile</h4></label>
                                  <input type="text" className="form-control user-profile__input" name="mobile" id="mobile" placeholder="enter mobile number" title="enter your mobile number if any."/>
                              </div>
                          </div>
                          <div className="form-group">
                              
                              <div className="col-xs-6">
                                  <label htmlFor="email"><h4 className= "user-profile__input-title">Email</h4></label>
                                  <input type="email" className="form-control user-profile__input" name="email" id="email" placeholder="you@email.com" title="enter your email."/>
                              </div>
                          </div>
                          <div className="form-group">
                              
                              <div className="col-xs-6">
                                  <label htmlFor="email"><h4 className= "user-profile__input-title">Location</h4></label>
                                  <input type="email" className="form-control user-profile__input" id="location" placeholder="somewhere" title="enter a location"/>
                              </div>
                          </div>
                          <div className="form-group">
                              
                              <div className="col-xs-6">
                                  <label htmlFor="password"><h4 className= "user-profile__input-title">Password</h4></label>
                                  <input type="password" className="form-control user-profile__input" name="password" id="password" placeholder="password" title="enter your password."/>
                              </div>
                          </div>
                          <div className="form-group">
                              
                              <div className="col-xs-6">
                                  <label htmlFor="password2"><h4 className= "user-profile__input-title">Confirm Password</h4></label>
                                  <input type="password" className="form-control user-profile__input" name="password2" id="password2" placeholder="password2" title="enter your password2."/>
                              </div>
                          </div>
                          <div className="form-group">
                              <div className="col-xs-12">
                                      <br />
                                      <button className="btn btn-lg btn-success user-profile__btn user-profile__btn__color" type="submit"><i className="glyphicon glyphicon-ok-sign"></i> Save</button>
                                      <button className="btn btn-lg  user-profile__btn" type="reset"><i className="glyphicon glyphicon-repeat"></i> Reset</button>
                                  </div>
                          </div>
                  </form>
                </div>
                <div className="tab-pane" id="balance">
                  <h3 className="header__bottom__nav--list">
                    balance information
                  </h3>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserProfile;
