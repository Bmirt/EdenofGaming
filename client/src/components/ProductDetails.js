import React from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import spinner from "../final project/spinner.gif"

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      product: null,
      isLoaded: false
    };
  }
  componentDidMount() {
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
      console.log(product)
      if (!this.state.isLoaded) {
      return <img style={{width:"80px", height:"80px", margin:"100px 500px"}} src={spinner} />;
    }
    return product ? (
      <section className="discription">
        <div className="discription__wrappertop">
          <img src={product.image} alt="" className="discription__wrappertop__image" />

          <div className="discription__wrappertop__details">
            <div className="discription__wrappertop__details__name" >Name: {product.name}</div>
            <div className="discription__wrappertop__details__platform" ><span class="pc">{product.platforms}</span></div>
            <div className="discription__wrappertop__details__price" >Price: {product.price}$</div>
            {/* <div className="discription__wrappertop__details__release" >Realease Date: {product.release}</div>
            <div className="discription__wrappertop__details__genre" >Genre: {product.genre}</div>
            <div className="discription__wrappertop__details__developers" >Developers: {product.developer}</div> */}
            <Link to="#" class="discription__wrappertop__details__buy cart"><i class="fas fa-shopping-cart awesome" ></i>Add To Cart</Link>
            <Link to="#" class="discription__wrappertop__details__buy"><i class="fas fa-money-bill-alt awesome"></i>Buy</Link>
            <div className="discription__wrappertop__details__raiting">
              <span className="discription__wrappertop__details__raiting__stars" />
              <span className="discription__wrappertop__details__raiting__stars" />
              <span className="discription__wrappertop__details__raiting__stars" />
              <span className="discription__wrappertop__details__raiting__stars" />
              <span className="discription__wrappertop__details__raiting__stars" />
            </div>
          </div>
          <p className="discription__wrappertop__aboutgame" />
          <div className="discription__wrappertop__system">
            <p className="discription__wrappertop__system__lawspecs" />
            <p className="discription__wrappertop__system__recomendedspecs" />
          </div>
        </div>
      </section>
    ) : (
      <h1>product not found</h1>
    );
  }
}

export default ProductDetails;
