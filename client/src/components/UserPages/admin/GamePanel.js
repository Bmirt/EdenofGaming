import React from "react";
import axios from "axios";

class GamePanel extends React.Component {
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
        <div className="admin__dash__users">
          <div>
            <table className="admin__dash__users__table">
              <thead>
                <tr className="admin__dash__users__table--tr">
                  <th className="admin__dash__users__table--th">Games</th>
                  <th className="admin__dash__users__table--th">price</th>
                  <th className="admin__dash__users__table--th">id</th>
                </tr>
              </thead>
              <tbody>
                {this.state.gameList.map(item => (
                  <tr key={item._id} className="admin__dash__users__table--tr">
                    <td className="admin__dash__users__table--td">
                      <img
                        src={item.image}
                        alt="avatar"
                        className="discription__wrappertop__down__comment--wrapper--result--replay--profile--image"
                      />
                      <span className="admin__dash__users__table--span">
                        {" "}
                        {item.name}
                      </span>
                    </td>

                    <td className="admin__dash__users__table--td">
                      <span className="admin__dash__users__table--span">
                        {item.price}
                      </span>
                    </td>
                    <td className="admin__dash__users__table--td">
                      <span className="admin__dash__users__table--span">
                        {item._id}
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

export default GamePanel;
