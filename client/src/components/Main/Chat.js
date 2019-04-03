import React from "react";
import chat from "../../halpers/chat";
import Auth from "../utils/AuthMethods";
import userContext from "../../context/user-context";

class Chat extends React.Component {
  static contextType = userContext;
  state = {
    name: Auth.getCurrentUser() ? Auth.getCurrentUser().name : "User",
    avatar: Auth.getCurrentUser()
      ? this.context.user.avatar
      : "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png",
    sendMessages: [],
    recievedMessages: [],
    message: ""
  };

  componentDidMount() {
    const jwt = Auth.getJWT();
    fetch("/api/profile/privatemessage", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ recievedMessages: res });
      })
      .catch(err => console.log(err));
  }

  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  sendMessage = () => {
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to send a message");
    } else {
      fetch("/api/profile/customersupport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: jwt
        },
        body: JSON.stringify({ msg: this.state.message })
      })
        .then(res => res.json())
        .then(res => {
          let tmp = this.state.sendMessages;
          tmp.push(res);
          this.setState({ sendMessage: tmp, message: "" });
        })
        .catch(err => console.log(err));
      document.getElementById("messageInput").value = "";
    }
  };
  render() {
    return (
      <React.Fragment>
        <aside id="chat" className="chat">
          <nav className="chat__nav">
            <div
              onClick={() => {
                chat();
              }}
              id="btn"
              className="chat__nav__button"
            >
              <i id="awesome" className="fas fa-comment-alt awesome " />
            </div>

            <div className="chat__nav__header" id="headchat">
              {" "}
              <p className="chat__nav__header__text">Support</p>
            </div>
            <div className="chat__nav__main">
              {this.state.recievedMessages.length > 0 ? (
                this.state.recievedMessages.map(item => (
                  <div className="chat__nav__main__wrapper wrapperadmin">
                    <img
                      src={item.image}
                      alt=""
                      className="chat__nav__main__wrapper--icon"
                    />
                    <div className="chat__nav__main__wrapper--message">
                      <p className="chat__nav__main__wrapper--message--user">
                        {item.name}
                      </p>
                      <p className="chat__nav__main__wrapper--message--content">
                        {item.msg}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div />
              )}
              {this.state.sendMessages.length > 0 ? (
                this.state.sendMessage.map(item => (
                  <div className="chat__nav__main__wrapper" key={item.msg}>
                    <img
                      src={item.image}
                      alt=""
                      className="chat__nav__main__wrapper--icon"
                    />
                    <div className="chat__nav__main__wrapper--message">
                      <p className="chat__nav__main__wrapper--message--user">
                        {item.name}
                      </p>
                      <p className="chat__nav__main__wrapper--message--content">
                        {item.msg}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div />
              )}
            </div>

            <div className="chat__nav__footer">
              <input
                id="messageInput"
                onChange={this.onHandleChange}
                name="message"
                type="text"
                placeholder=" TYPE"
                className="chat__nav__footer__chat"
              />
              <button
                onClick={this.sendMessage}
                className="chat__nav__footer__button "
              >
                <i className="fas fa-pen-nib awesome" />
              </button>
            </div>
          </nav>
        </aside>
      </React.Fragment>
    );
  }
}

export default Chat;
