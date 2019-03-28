import React from "react";
import chat from "../../final project/assets/js/chat";
import Auth from "../utils/AuthMethods";

class Chat extends React.Component {
  state ={
    name : Auth.getCurrentUser() ? Auth.getCurrentUser().name : "User",
    avatar: Auth.getCurrentUser() ? Auth.getCurrentUser().avatar : "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/WPVG_icon_2016.svg/1024px-WPVG_icon_2016.svg.png"
  }
  render() {
    return (
      <React.Fragment>
        <aside id="chat" className="chat">
          <nav className="chat__nav">
            <div
              onClick={() => {
                console.log("chat on click");
                chat();
              }}
              id="btn"
              className="chat__nav__button"
            >
              <i id="awesome" className="fas fa-comment-alt awesome " />
            </div>

            <div className="chat__nav__header" id="headchat">
              {" "}
              <p className="chat__nav__header__text">LIVE CHAT</p>
            </div>
            <div className="chat__nav__main">
              <div className="chat__nav__main__wrapper">
                <img
                  src={this.state.avatar}
                  alt=""
                  className="chat__nav__main__wrapper--icon"
                />
                <div className="chat__nav__main__wrapper--message">
                  <p className="chat__nav__main__wrapper--message--user">
                    {this.state.name}
                  </p>
                  <p className="chat__nav__main__wrapper--message--content">
                    {" "}
                    KOKO is so wild and sexy{" "}
                  </p>
                </div>
              </div>
              <div className="chat__nav__main__wrapper wrapperadmin">
                <img
                  src="https://blog.mozilla.org/firefox/files/2017/12/firefox-logo-300x310.png"
                  alt=""
                  className="chat__nav__main__wrapper--icon"
                />
                <div className="chat__nav__main__wrapper--message">
                  <p className="chat__nav__main__wrapper--message--user">
                    Admin
                  </p>
                  <p className="chat__nav__main__wrapper--message--content">
                    {" "}
                    Yes indeed{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="chat__nav__footer">
              <input
                type="text"
                placeholder=" TYPE"
                className="chat__nav__footer__chat"
              />
              <button className="chat__nav__footer__button ">
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
