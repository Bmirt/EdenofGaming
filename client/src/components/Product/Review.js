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
      errors: {},
      profileImage: ""
    };
  }
  static contextType = userContext;

  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {}
    });
  };
  componentDidMount() {
    const jwt = Auth.getJWT();
    var config = {
      headers: {
        Authorization: jwt
      }
    };

    axios.get("/api/profile", config).then(res => {
      this.setState({
        profileImage: res.data.profileImage
      });
    });

    axios.get(`/api/posts/${this.state.productID}`).then(res => {
      if (res.data.length > 0)
        this.setState({ reviews: res.data.reverse(), hasReviews: true });
    });
  }
  onHandleSubmit = e => {
    e.preventDefault();
    const jwt = Auth.getJWT();
    console.log("submit");
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
        .then(res => {
          if (res.user === undefined) {
            this.setState({ errors: res });
          } else {
            let reviews = this.state.reviews;
            let newReview = {
              _id: res._id,
              likes: [],
              dislikes: [],
              comments: [],
              date: Date.now(),
              text: res.text,
              avatar: this.context.user.avatar,
              name: this.context.user.name,
              user: this.context.user._id
            };
            reviews.push(newReview);
            this.setState({
              reviews: reviews,
              hasReviews: true,
              review: ""
            });
          }
        })
        .catch(err => console.log(err));

      document.getElementById("reviewInput").value = "";
    } else {
      this.context.message("Please log to add a review");
    }
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
                      this.state.profileImage
                        ? this.state.profileImage
                        : "http://www.gravatar.com/avatar/795b9e490f1f0afc2a45e138a2239e6a?s=200&r=pg&d=mm"
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
                    {this.state.errors.alreadyreviewed}
                  </div>
                )}
                <button
                  onClick={this.onHandleSubmit}
                  className="discription__wrappertop__down__comment--wrapper--inside--button"
                >
                  Write A Review
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
                    replies={item.comments}
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
