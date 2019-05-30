import React from "react";
import axios from "axios";

class TotalUsers extends React.Component {
  constructor() {
    super();
    this.state = {
      total: [],
      balance: "",
      errors: {}
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    var config = {
      headers: { Authorization: localStorage.getItem("token") }
    };
    axios
      .get(`/api/profile/all`, config)
      .then(res => {
        this.setState({
          total: res.data.filter(item => item._id)
        });
      })

      .catch(err => this.setState({ isLoaded: true }));
  }

  some() {}

  render() {
    return (
      <div>
        <a href="#users" data-toggle="tab" className="user-profile__link">
          <div className="admin__dash__info admin__dash__info--total">
            <p className="admin__dash__info--total--p">total users:</p>
            <div className="admin__dash__info--total--div">
              <i className="fas fa-chart-bar admin__dash__info--total--awesome" />
              <p className="admin__dash__info--total--span">
                {" "}
                {this.state.total.length}
              </p>
            </div>
          </div>
        </a>
      </div>
    );
  }
}

export default TotalUsers;
