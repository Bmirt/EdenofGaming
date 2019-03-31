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
      .get(`http://localhost:5000/api/profile/all`, config)
      .then(res => {
        this.setState({
          total: res.data
        });
      })

      .catch(err => this.setState({ isLoaded: true }));
  }


  render() {
   
    return (
      <div>
      <a href="#users"  data-toggle="tab" className="user-profile__link">
        <div className="admin__dash__info admin__dash__info--total">
         
            <p>total users</p>
            <i className="fas fa-chart-bar"></i>

             <p>total: {this.state.total.map((home) => <span>{home.length}</span>)}</p>
             
        </div></a>
  </div>
    );
  }
}

export default TotalUsers;
