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
      comments: []
    };
  }
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    console.log(this.state);
  }
  onHandleSubmit = e => {
    e.preventDefault();
    const jwt = Auth.getJWT();
    console.log(jwt)
    axios.post(`http://localhost/5000/api/posts/${this.state.productID}`, {
      text: this.state.comment,
        headers: {
          'Content-Type': 'application/json',
          Authorization: jwt
        }.then(res =>console.log(res))
    });
  };
  render() {
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
              <div className="discription__wrappertop__down__comment--wrapper--result">
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
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptas facilis sed cum quisquam nihil cumque nemo, unde
                  assumenda dolorum ab iusto, ullam commodi neque odio molestiae
                  at mollitia numquam repellat! Voluptas facilis sed cum
                  quisquam nihil cumque nemo, unde assumenda dolorum ab iusto,
                  ullam commodi neque odio molestiae at mollitia numquam repell
                </p>
              </div>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
