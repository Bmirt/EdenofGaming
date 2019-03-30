import React from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import spinner from "../../final project/spinner.gif";
import { Trailler } from "./Trailler";
import { Iframe } from "./Iframe";
import ShopContext from "../../context/shop-context";
import Review from "./Review";
import Auth from '../utils/AuthMethods';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null,
      isLoaded: false,
      likes: null,
      dislikes: null,
      liked: false,
      disliked:false,
      likeCount: 0,
      dislikeCount: 0,
    };
  }

  static contextType = ShopContext;

  componentDidMount() {
    window.scroll(0, 0);
    axios
      .get(`http://localhost:5000/api/products/${this.props.match.params.id}`)
      .then(res => {
        this.setState({
          product: res.data,
          isLoaded: true
        });
      })
      .catch(err => this.setState({ isLoaded: true }));
  }


  componentDidMount() {
    let liked = false;
    let disliked = false;
    if (Auth.getCurrentUser()) {
      this.props.likes.forEach(item => {
        if(item.user === Auth.getCurrentUser().id){
          liked = true;
        }
      });
      this.props.dislikes.forEach(item => {
        if(item.user === Auth.getCurrentUser().id){
          disliked = true;
        }
      });
      
    }
    this.setState({ liked: liked, disliked: disliked });
  }
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  like = (productID, reviewID, jwt) => {
    this.setState({ likeCount: this.state.likeCount + 1 });
    fetch(`/api/posts/like/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        const newLike = {
          _id: res._id,
          user: res.user
        };
        const Likes = this.state.likes;
        Likes.push(newLike);
        this.setState({ liked: true, likes: Likes });
      })
      .catch(err => console.log("error", err));
  };
  unlike = (productID, reviewID, jwt) => {
    this.setState({ likeCount: this.state.likeCount - 1 });
    fetch(`/api/posts/unlike/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        let likes = this.state.likes;
        for (let i = 0; i < likes.length; i++) {
          if (likes[i].user === res.user) {
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

  dislike = (productID, reviewID, jwt) => {
    this.setState({ dislikeCount: this.state.dislikeCount + 1 });
    fetch(`/api/posts/dislike/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        const newDislike = {
          _id: res._id,
          user: res.user
        };
        const Dislikes = this.state.dislikes;
        Dislikes.push(newDislike);
        this.setState({ disliked: true, dislikes: Dislikes });
      })
      .catch(err => console.log("error", err));
  };
  unDislike = (productID, reviewID, jwt) => {
    this.setState({ dislikeCount: this.state.dislikeCount - 1 });
    fetch(`/api/posts/undislike/${productID}/${reviewID}`, {
      method: "POST",
      headers: {
        Authorization: jwt
      }
    })
      .then(res => res.json())
      .then(res => {
        let dislikes = this.state.dislikes;
        for (let i = 0; i < dislikes.length; i++) {
          if (dislikes[i].user === res.user) {
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
    const { productID, reviewID } = this.state;
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to like the review");
      return;
    }
    if (this.state.liked) {
      this.unlike(productID, reviewID, jwt);
    } else if (this.state.disliked) {
      this.unDislike(productID, reviewID, jwt);
      this.like(productID, reviewID, jwt);
    } else {
      this.like(productID, reviewID, jwt);
    }
  };
  onHandleDislike = e => {
    const { productID, reviewID } = this.state;
    const jwt = Auth.getJWT();
    if (!jwt) {
      this.context.message("Please log in to dislike the review");
      return;
    }
    if (this.state.disliked) {
      this.unDislike(productID, reviewID, jwt);
    } else if (this.state.liked) {
      this.unlike(productID, reviewID, jwt);
      this.dislike(productID, reviewID, jwt);
    } else {
      this.dislike(productID, reviewID, jwt);
    }
  };



  render() {
    console.log('product',this.state.product)
    const { product } = this.state;
    if (!this.state.isLoaded) {
      return (
        <img
          style={{ width: "80px", height: "80px", margin: "100px 500px" }}
          src={spinner}
          alt="spinner"
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

              <div
                onClick={this.context.addToCart.bind(this, product)}
                style={{ cursor: "pointer", fontFamily: "Orbitron" }}
                className="discription__wrappertop__wrapper__details__buy cart"
              >
                <i className="fas fa-shopping-cart awesome" /> Add To Cart
              </div>
              <div className="discription__wrappertop__wrapper__details__buy">
                <i className="fas fa-money-bill-alt awesome" /> Buy{" "}
              </div>

              <div className="discription__wrappertop__wrapper__details__raiting">
                <span className="discription__wrappertop__wrapper__details__raiting__thumbs">
                  <i className="fas fa-thumbs-up awesome" />
                  <span className="discription__wrappertop__wrapper__details__raiting__thumbs--score">222222</span>
                </span>
                <span className="discription__wrappertop__wrapper__details__raiting__thumbs">
                  <i className="fas fa-thumbs-down awesome" />
                  <span className="discription__wrappertop__wrapper__details__raiting__thumbs--score dislike">0</span>
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
