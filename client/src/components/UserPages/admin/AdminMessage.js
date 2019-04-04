import React from "react";
import axios from "axios";

class AdminMessage extends React.Component {
  constructor() {
    super();
    this.state = {
      message: []
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
    var config = {
      headers: { Authorization: localStorage.getItem("token") }
    };
    axios
      .get(`http://localhost:5000/api/profile/privatemessage`, config)
      .then(res => {
        this.setState({
          message: res.data
        });
      })

      .catch(err => this.setState({ isLoaded: true }));
  }

  render() {
    return (
      <div>
        <div className="user__cdkey">
          <div>
            <table className="user__cdkey__table">
              <thead>
                <tr className="user__cdkey__table--tr">
                  <th className="user__cdkey__table--th">User name</th>
                  <th className="user__cdkey__table--th">message</th>
                  <th className="user__cdkey__table--th">id</th>

                </tr>
              </thead>
              <tbody>
                {this.state.message.map(item => (
                  <tr key={item.msg} className="user__cdkey__table--tr">
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
                        {item.msg}
                      </span>
                    </td>
                    <td className="user__cdkey__table--td">
                      <span className="user__cdkey__table--span">
                        {item.user}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminMessage;