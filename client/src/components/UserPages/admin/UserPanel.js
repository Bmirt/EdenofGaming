import React from "react";
import axios from "axios";

class UserPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      userList: [],
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
          userList: res.data
        });
      })

      .catch(err => this.setState({ isLoaded: true }));
  }


  render() {
   
    
    return (
        <div>
        <div className="admin__dash__age">
            <p>users:</p>
             <div>{this.state.userList
                    .map(item => 
                    <div>
                    <img
                        src={item.user.avatar}
                        alt="avatar"
                        className="discription__wrappertop__down__comment--wrapper--result--replay--profile--image"
                      />
                    <span>{item.user.name}</span>
                    <span>balance:{item.balance}</span>
                    <hr />
                    </div>)}</div>
             
        </div>
  </div>
    );
  }
}

export default UserPanel;
