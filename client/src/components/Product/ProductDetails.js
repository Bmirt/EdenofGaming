import React from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import spinner from "../../final project/spinner.gif";
import { Trailler } from "./Trailler";
import { Iframe } from "./Iframe";
import ShopContext from "../../context/shop-context";
import Review from "./Review";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      product: null,
      isLoaded: false
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
  render() {
    const { product } = this.state;
    console.log(this.context.cart);
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
                </span>
                <span className="discription__wrappertop__wrapper__details__raiting__thumbs">
                  <i className="fas fa-thumbs-down awesome" />
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
