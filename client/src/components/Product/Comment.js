import React from "react";
import UserContext from "../../context/user-context";
import axios from "axios";
import Auth from "../utils/AuthMethods";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: props.productID,
      comment: "",
      comments: null,
      haveComments: false
    };
  }
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/posts/${this.state.productID}`)
      .then(res => {
        if (res.data.length > 0)
          this.setState({ comments: res.data, haveComments: true });
      });
  }
  onHandleSubmit = e => {
    e.preventDefault();
    const jwt = Auth.getJWT();
    fetch(`/api/posts/${this.state.productID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: jwt
      },
      body: { text: this.state.comment }
    })
      .then(res => console.log("then", res))
      .catch(err => console.log("errror", err));
  };
  render() {
    console.log(this.state);
    return (
      <UserContext.Consumer>
        {context => (
          <div className="discription__wrappertop__down__comment">
            <div className="discription__wrappertop__down__comment--wrapper">
              <form className="discription__wrappertop__down__comment--wrapper--inside">
                <div className="discription__wrappertop__down__comment--wrapper--inside--profile">
                  <img
                    src={
                      context.user
                        ? context.user.avatar
                        : "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1"
                    }
                    alt=""
                    className="discription__wrappertop__down__comment--wrapper--inside--profile--image"
                  />

                  <span className="discription__wrappertop__down__comment--wrapper--inside--profile--name">
                    {context.user ? context.user.name : "user"}
                  </span>
                </div>
                <textarea
                  onChange={this.onHandleChange}
                  name="comment"
                  id=""
                  className="discription__wrappertop__down__comment--wrapper--inside--comment"
                  placeholder="write comment"
                />
                <button
                  onClick={this.onHandleSubmit}
                  className="discription__wrappertop__down__comment--wrapper--inside--button"
                >
                  post
                </button>
              </form>
              {this.state.haveComments ? (
                this.state.comments.map(item => (
                  <div
                    key={item.date}
                    className="discription__wrappertop__down__comment--wrapper--result"
                  >
                    <div className="discription__wrappertop__down__comment--wrapper--result--profile">
                      <img
                        src="https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1"
                        alt=""
                        className="discription__wrappertop__down__comment--wrapper--result--profile--image"
                      />
                      <span className="discription__wrappertop__down__comment--wrapper--result--profile--name">
                        koko
                      </span>
                    </div>
                    <p className="discription__wrappertop__down__comment--wrapper--result--comment">
                      {item.text}
                    </p>
                  </div>
                ))
              ) : (
                <div>No comments yet</div>
              )}
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
