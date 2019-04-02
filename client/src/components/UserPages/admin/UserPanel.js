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
        <div className="admin__dash__users">
          <div>
            <table className="admin__dash__users__table">
              <thead>
                <tr className="admin__dash__users__table--tr">
                  <th className="admin__dash__users__table--th">user</th>
                  <th className="admin__dash__users__table--th">balance</th>
                  <th className="admin__dash__users__table--th">location</th>
                  <th className="admin__dash__users__table--th">hover to show</th>

                  <th className="admin__dash__users__table--th">
                    phone number
                  </th>
                  <th className="admin__dash__users__table--th">User ID</th>
                </tr>
              </thead>

              <tbody>
                {this.state.userList.map(item => (
                  <tr
                    key={item.user.name}
                    className="admin__dash__users__table--tr"
                  >
                    <td className="admin__dash__users__table--td">
                      <img
                        src={item.user.avatar}
                        alt="avatar"
                        className="discription__wrappertop__down__comment--wrapper--result--replay--profile--image"
                      />
                      <span className="admin__dash__users__table--span">
                        {" "}
                        {item.user.name}
                      </span>
                    </td>

                    <td className="admin__dash__users__table--td">
                      <span className="admin__dash__users__table--span">
                        {item.balance}
                      </span>
                    </td>
                    <td className="admin__dash__users__table--td">
                      <span className="admin__dash__users__table--span">
                        {item.location}
                      </span>
                    </td>
                    <td className="admin__dash__users__table--td">
                      <span className="admin__dash__users__table--span hover__span__cart">
                        user cart
                      </span>
                      <div className="cartShow">{item.cart.map(i => <tr
                              key={i.name}
                              className="admin__dash__users__table--tr"
                          >
                              <td className="admin__dash__users__table--td">
                              <img
                                  src={i.image}
                                  alt="avatar"
                                  className="discription__wrappertop__down__comment--wrapper--result--replay--profile--image"
                              />
                              <span className="admin__dash__users__table--span">
                                  {" "}
                                  {i.name}
                              </span>
                              </td> 
                              <td className="admin__dash__users__table--td">
                              <span className="admin__dash__users__table--span">
                                {i.price}
                              </span>
                            </td>
                      </tr>)}
                         </div>
                      </td>
                    <td className="admin__dash__users__table--td">
                      <span className="admin__dash__users__table--span">
                        {item.phoneNumber}
                      </span>
                    </td>
                    <td className="admin__dash__users__table--td">
                      <span className="admin__dash__users__table--span">
                        {item.user._id}
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

export default UserPanel;
