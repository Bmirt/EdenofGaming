import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import userContext from "../../context/user-context";

class IndividualProfile extends React.Component {
  constructor() {
    super();
    this.state = {
      gameList: [],
      profile: []
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    var config = {
      headers: { Authorization: localStorage.getItem("token") }
    };
    axios
      .get(`/api/products`, config)
      .then(res => {
        this.setState({
          gameList: res.data
        });
      })
      .catch(err => this.setState({ isLoaded: true }));

    axios
      .get(`/api/profile`, config)
      .then(res => {
        this.setState({
          gameList: res.data
        });
      })
      .catch(err => this.setState({ isLoaded: true }));
  }

  render() {
    const { errors } = this.state;
    return (
      <React.Fragment>
        <div class="container emp-profile">
          <form method="post">
            <div class="row">
              <div class="col-md-4">
                <div class="profile-img">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
                    alt=""
                  />
                  <div class="file btn btn-lg btn-primary">
                    Change Photo
                    <input type="file" name="file" />
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="profile-head">
                  <h5>Kshiti Ghelani</h5>
                  <h6>Web Developer and Designer</h6>
                  <p class="proile-rating">
                    RANKINGS : <span>8/10</span>
                  </p>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
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
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Timeline
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-2">
                <input
                  type="submit"
                  class="profile-edit-btn"
                  name="btnAddMore"
                  value="Edit Profile"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-md-4">
                <div class="profile-work">
                  <p>WORK LINK</p>
                  <a href="">Website Link</a>
                  <br />
                  <a href="">Bootsnipp Profile</a>
                  <br />
                  <a href="">Bootply Profile</a>
                  <p>SKILLS</p>
                  <a href="">Web Designer</a>
                  <br />
                  <a href="">Web Developer</a>
                  <br />
                  <a href="">WordPress</a>
                  <br />
                  <a href="">WooCommerce</a>
                  <br />
                  <a href="">PHP, .Net</a>
                  <br />
                </div>
              </div>
              <div class="col-md-8">
                <div class="tab-content profile-tab" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div class="row">
                      <div class="col-md-6">
                        <label>User Id</label>
                      </div>
                      <div class="col-md-6">
                        <p>Kshiti123</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Name</label>
                      </div>
                      <div class="col-md-6">
                        <p>Kshiti Ghelani</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Email</label>
                      </div>
                      <div class="col-md-6">
                        <p>kshitighelani@gmail.com</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div class="col-md-6">
                        <p>123 456 7890</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div class="col-md-6">
                        <p>Web Developer and Designer</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div class="row">
                      <div class="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div class="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div class="col-md-6">
                        <p>10$/hr</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div class="col-md-6">
                        <p>230</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>English Level</label>
                      </div>
                      <div class="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Availability</label>
                      </div>
                      <div class="col-md-6">
                        <p>6 months</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <label>Your Bio</label>
                        <br />
                        <p>Your detail description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* <div>
          <div className="user__cdkey">
            <div>
              <table className="user__cdkey__table">
                <thead>
                  <tr className="user__cdkey__table--tr">
                    <th className="user__cdkey__table--th">Game Name</th>
                    <th className="user__cdkey__table--th">cd-key</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.gameList.map(item => (
                    <tr key={item._id} className="user__cdkey__table--tr">
                      <td className="user__cdkey__table--td">
                        <img
                          src={item.image}
                          alt="avatar"
                          className="discription__wrappertop__down__comment--wrapper--result--replay--profile--image"
                        />
                        <span className="user__cdkey__table--span">
                          {" "}
                          {item.name}
                        </span>
                      </td>

                      <td className="user__cdkey__table--td">
                        <span className="user__cdkey__table--span">
                          {item.cdkey}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div> */}
      </React.Fragment>
    );
  }
}

export default IndividualProfile;
