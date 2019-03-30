import React from "react";
import axios from "axios";

class UserPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      age: [],
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
          age: res.data
        });
      })

      .catch(err => this.setState({ isLoaded: true }));
  }


  render() {
   
    
    return (
        <div>
        <div className="admin__dash__age">
            <p>users:</p>
             <p>{this.state.age
                    .map(item => <div><p>{item.user.name}</p><p>{item.balance}</p></div>)}</p>
             
        </div>
  </div>
    );
  }
}

export default UserPanel;
