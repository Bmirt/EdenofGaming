import React from "react";
import axios from "axios";
import spinner from "../../final project/spinner.gif";
import { Trailler } from "./Trailler";
import { Iframe } from "./Iframe";
import ShopContext from "../../context/shop-context";
import Review from "./Review";
import Auth from "../utils/AuthMethods";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoaded: false,
      profile: null
    };
  }

  static contextType = ShopContext;

  componentDidMount() {
    window.scroll(0, 0);
    const jwt = Auth.getJWT();
    var config = {
      headers: {
        Authorization: jwt
      }
    };
    axios
      .get(`http://localhost:5000/api/products/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          product: res.data,
          isLoaded: true
        });
      })
      .catch(err => this.setState({ isLoaded: true }));
    axios
      .get("http://localhost:5000/api/profile", config)
      .then(res => {
        this.setState({
          profile: res.data
        });
      })
      .catch(err => {
        // console.log(err);
      });
  }
  liked = () => {
    if (this.state.product) {
      const { likes } = this.state.product;
      if (Auth.getCurrentUser()) {
        const userID = Auth.getCurrentUser().id;
        for (let i = 0; i < likes.length; i++) {
          if (likes[i].user === userID) {
            return true;
          }
        }
      }
    }
    return false;
  };
  disliked = () => {
    if (this.state.product) {
      const { dislikes } = this.state.product;
      if (Auth.getCurrentUser()) {
        const userID = Auth.getCurrentUser().id;
        for (let i = 0; i < dislikes.length; i++) {
          if (dislikes[i].user === userID) {
            return true;
          }
        }
      }
    }
    return false;
  };
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  like = (productID, jwt) => {
    fetch(`/api/products/like/${productID}/`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        const newLike = {
          _id: res._id,
          user: Auth.getCurrentUser().id
        };
        const Likes = this.state.product.likes;
        Likes.push(newLike);
        this.setState({ liked: true, likes: Likes });
      })
      .catch(err => console.log("error", err));
  };
  unlike = (productID, jwt) => {
    fetch(`/api/products/unlike/${productID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        let likes = this.state.product.likes;
        for (let i = 0; i < likes.length; i++) {
          if (likes[i].user === Auth.getCurrentUser().id) {
            likes.splice(i, 1);
          }
        }
        this.setState({
          liked: false,
          likes: likes
        });
      })
      .catch(err => console.log("error", err));
  };

  dislike = (productID, jwt) => {
    fetch(`/api/products/dislike/${productID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        const newDislike = {
          _id: res._id,
          user: Auth.getCurrentUser().id
        };
        const Dislikes = this.state.product.dislikes;
        Dislikes.push(newDislike);
        this.setState({ disliked: true, dislikes: Dislikes });
      })
      .catch(err => console.log("error", err));
  };
  unDislike = (productID, jwt) => {
    fetch(`/api/products/undislike/${productID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        let dislikes = this.state.product.dislikes;
        for (let i = 0; i < dislikes.length; i++) {
          if (dislikes[i].user === Auth.getCurrentUser().id) {
            dislikes.splice(i, 1);
          }
        }
        this.setState({
          disliked: false,
          dislikes: dislikes
        });
      })
      .catch(err => console.log("error", err));
  };

  onHandleLike = e => {
    const { _id } = this.state.product;
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to like the game");
      return;
    }
    if (this.liked()) {
      this.unlike(_id, jwt);
    } else if (this.disliked()) {
      this.unDislike(_id, jwt);
      this.like(_id, jwt);
    } else {
      this.like(_id, jwt);
    }
  };
  onHandleDislike = e => {
    const { _id } = this.state.product;
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to dislike the game");
      return;
    }
    if (this.disliked()) {
      this.unDislike(_id, jwt);
    } else if (this.liked()) {
      this.unlike(_id, jwt);
      this.dislike(_id, jwt);
    } else {
      this.dislike(_id, jwt);
    }
  };

  render() {
    console.log(this.state.profile);
    let carting = () => {
      if (this.state.profile === null) {
        return alert(
          "You have to setup a profile in order to add items to cart"
        );
      } else {
        console.log("i am here");
        return this.context.addToCart.bind(this, product);
      }
    };
    console.log("this is carting", carting);
    let carting2 = () => {
      this.context.message(
        "You have to setup a profile in order to add items to cart"
      );
      setTimeout(() => {
        window.location = "/userprofile";
      }, 3000);
    };
    const { product } = this.state;
    if (!this.state.isLoaded) {
      return (
        <img
          style={{ width: "80px", height: "80px", margin: "100px 500px" }}
          src={spinner}
          alt="spinners"
        />
      );
    }
    return product ? (
      <section
        className="discription"
        style={{ backgroundImage: `url(${product.image2})` }}
      >
        <div className="discription__wrappertop">
          <div className="discription__wrappertop__wrapper">
            <img
              src={product.image}
              alt=""
              className="discription__wrappertop__wrapper--image"
            />

            <div className="discription__wrappertop__wrapper__details">
              <div className="discription__wrappertop__wrapper__details__name">
                {product.name}
              </div>
              <div className="discription__wrappertop__wrapper__details__date">
                {product.release}
              </div>

              <div className="discription__wrappertop__wrapper__details__platform">
                <span className="pc">{product.platforms}</span>
              </div>

              <div className="discription__wrappertop__wrapper__details__developer">
                {product.developer}
              </div>

              <div className="discription__wrappertop__wrapper__details__price">
                ${product.price}
              </div>
              {this.state.profile && (
                <div
                  onClick={this.context.addToCart.bind(this, product)}
                  style={{ cursor: "pointer", fontFamily: "Orbitron" }}
                  className="discription__wrappertop__wrapper__details__buy cart"
                >
                  Add to cart
                </div>
              )}

              {this.state.profile === null && (
                <div
                  onClick={carting2}
                  style={{ cursor: "pointer", fontFamily: "Orbitron" }}
                  className="discription__wrappertop__wrapper__details__buy cart"
                >
                  Add to cart
                </div>
              )}
              {/* <div
                onClick={carting}
                style={{ cursor: "pointer", fontFamily: "Orbitron" }}
                className="discription__wrappertop__wrapper__details__buy cart"
              > 
                <i className="fas fa-shopping-cart awesome" /> Add To Cart
              </div> */}

              <div className="discription__wrappertop__wrapper__details__raiting">
                <span className="discription__wrappertop__wrapper__details__raiting__thumbs">
                  <i
                    onClick={this.onHandleLike}
                    className="fas fa-thumbs-up awesome"
                  />
                  <span className="discription__wrappertop__wrapper__details__raiting__thumbs--score">
                    {this.state.product.likes.length}
                  </span>
                </span>
                <span className="discription__wrappertop__wrapper__details__raiting__thumbs">
                  <i
                    onClick={this.onHandleDislike}
                    className="fas fa-thumbs-down awesome"
                  />
                  <span className="discription__wrappertop__wrapper__details__raiting__thumbs--score dislike">
                    {this.state.product.dislikes.length}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <Trailler>
            <Iframe url={product.trailer.replace("watch?v=", "embed/")} />
          </Trailler>
          <div className="discription__wrappertop__down">
            <p className="discription__wrappertop__down__aboutgame">
              {product.description}
            </p>

            <div className="discription__wrappertop__down__system">
              <p className="discription__wrappertop__down__system__lawspecs">
                <span className="discription__wrappertop__down__system__lawspecs__os">
                  Windows 7,Windows 8,Windows 10
                </span>
                <span className="discription__wrappertop__down__system__lawspecs__processor">
                  AMD FX-8320 (3,5 GHz) / Intel i5-4690K (3,5 GHz) or better
                </span>
                <span className="discription__wrappertop__down__system__lawspecs__grapics">
                  GeForce GTX 660 / Radeon R7 370 with 2 GB VRAM
                </span>
                <span className="discription__wrappertop__down__system__lawspecs__hdd">
                  25 GB available space
                </span>
                <span className="discription__wrappertop__down__system__lawspecs__api">
                  DirectX: Version 11
                </span>
              </p>

              <p className="discription__wrappertop__down__system__recomendedspecs">
                <span className="discription__wrappertop__down__system__recomendedspecs__os">
                  Windows 7,Windows 8,Windows 10
                </span>
                <span className="discription__wrappertop__down__system__recomendedspecs__processor">
                  Intel Core i7-3930K (3.2 GHz)/AMD Ryzen 5 1600 (3.2 GHz) or
                  better
                </span>
                <span className="discription__wrappertop__down__system__recomendedspecs__grapics">
                  AMD Radeon RX 480 / NVIDIA GeForce GTX 970 with 4 GB VRAM
                </span>
                <span className="discription__wrappertop__down__system__recomendedspecs__hdd">
                  25 GB available space
                </span>
                <span className="discription__wrappertop__down__system__recomendedspecs__api">
                  DirectX: Version 11
                </span>
              </p>
            </div>
            <Review productID={product._id} />
          </div>
        </div>
      </section>
    ) : (
      <h1>product not found</h1>
    );
  }
}

export default ProductDetails;
