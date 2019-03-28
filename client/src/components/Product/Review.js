import React from "react";
import UserContext from "../../context/user-context";
import axios from "axios";
import Auth from "../utils/AuthMethods";
import userContext from "../../context/user-context";
import Comment from "./Comment";

export default class Review extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productID: props.productID,
      review: "",
      reviews: [],
      hasReviews: false,
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
        this.setState({ reviews: res.data.reverse(), hasReviews: true });
    });
  }
  onHandleSubmit = e => {
    e.preventDefault();
    const jwt = Auth.getJWT();
    console.log("submit")
    if (jwt) {
      fetch(`/api/posts/${this.state.productID}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
          Authorization: jwt
        },
        body: JSON.stringify({ text: this.state.review })
      })
        .then(res => res.json())
        .then(res => this.setState({ errors: res }))
        .catch(err => console.log(err));
      //updating reviews state so it displays new review right away when user posts
      let reviews = this.state.reviews;
      let newReview = {
        likes: [],
        dislikes: [],
        comments: [],
        date: Date.now(),
        text: this.state.review,
        avatar: this.context.user.avatar,
        name: this.context.user.name,
        user: this.context.user._id
      };
      reviews.push(newReview);
      this.setState({
        reviews: reviews
      });
      document.getElementById("reviewInput").value = "";
    } else {
      this.context.message("Please log to add a review");
    }
  };
  render() {
    console.log(this.state.reviews);
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
                  name="review"
                  id="reviewInput"
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
              {this.state.hasReviews ? (
                this.state.reviews.map(item => (
                  <Comment
                    key={item.date}
                    avatar={item.avatar}
                    name={item.name}
                    text={item.text}
                    likes={item.likes}
                    dislikes={item.dislikes}
                    replays={item.comments}
                    reviewID={item._id}
                    productID={this.state.productID}
                  />
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
