import React from "react";
import axios from "axios";

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
          product: res,
          isLoaded: true
        });

      })

      .catch(err => this.setState({isLoaded:true}));
  }
  render() {
    const { product } = this.state;
    if (!this.state.isLoaded) {
      return <h1>Loading...</h1>;
    }
    return product ? <h1>found</h1> : <h1>product not found</h1>;
  }
}

export default ProductDetails;
