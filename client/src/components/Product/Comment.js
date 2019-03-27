import React from "react";
import UserContext from "../../context/user-context";
import axios from "axios";
import Auth from "../utils/AuthMethods";
import userContext from "../../context/user-context";

export default class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: props.productID,
      comment: "",
      comments: [],
      haveComments: false,
      errors: {}
    };
  }
  static contextType = userContext;
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    axios.get(`/api/posts/${this.state.productID}`).then(res => {
      if (res.data.length > 0)
        this.setState({ comments: res.data, haveComments: true });
    });
  }
  onHandleSubmit = e => {
    e.preventDefault();
    const jwt = Auth.getJWT();
    console.log(jwt);

    fetch(`/api/posts/${this.state.productID}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: jwt
      },
      body: JSON.stringify({ text: this.state.comment })
    })
      .then(res => res.json())
      .then(res => this.setState({ errors: res }))
      .catch(err => console.log(err));
    let comments = this.state.comments;
    let newComment = {
      likes:[],
      dislikes:[],
      comments: [],
      date: Date.now(),
      text: this.state.comment,
      avatar: this.context.user.avatar,
      name: this.context.user.name,
      user: this.context.user._id,
    }
    comments.push(newComment);
    this.setState({
      comments: comments
    })
  };
  render() {
    console.log(this.state.comments)
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
                {this.state.errors && (
                  <div style={{ color: "red", fontWeight: "bold" }}>
                    {this.state.errors.text}
                  </div>
                )}
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
                        src={item.avatar}
                        alt=""
                        className="discription__wrappertop__down__comment--wrapper--result--profile--image"
                      />
                      <span className="discription__wrappertop__down__comment--wrapper--result--profile--name">
                        {item.name}
                      </span>
                    </div>
                    <p className="discription__wrappertop__down__comment--wrapper--result--comment">
                      {item.text}
                    </p>

                    <div>
                      <span style={{ fontSize: "20px" }}>0</span>
                      <span
                        style={{
                          marginRight: "20px",
                          height: "20px"
                        }}
                        className="discription__wrappertop__wrapper__details__raiting__thumbs"
                      >
                        <i className="fas fa-thumbs-up awesome" />
                      </span>
                      <span
                        style={{ height: "20px" }}
                        className="discription__wrappertop__wrapper__details__raiting__thumbs"
                      >
                        <i className="fas fa-thumbs-down awesome" />
                      </span>
                      <span>0</span>
                    </div>
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
