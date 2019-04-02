import React from "react";
import axios from "axios";

class UserCDkey extends React.Component {
  constructor() {
    super();
    this.state = {
      gameList: []
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
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default UserCDkey;
