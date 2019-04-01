import React from "react";
import spinner from "../../final project/spinner.gif";
import Product from "./Product";

class ProductsPage extends React.Component {
  state = {
    filtered: [],
    isLoaded: false
  };

  componentDidMount() {
    fetch("/api/products")
      .then(res => res.json())
      .then(res =>
        this.setState({
          isLoaded: true,
          filtered: res.filter(value =>
            value.platforms
              .toUpperCase()
              .includes(this.props.match.params.id.toUpperCase())
          )
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <img
          style={{ width: "80px", height: "80px", margin: "100px 500px" }}
          src={spinner}
          alt="spinner"
        />
      );
    }
    return (
      <div style={{ display: "flex" }}>
        {this.state.filtered.length > 0 ? (
          <section className="main__middle">
            <div className="main__middle__wrapper">
              {this.state.filtered.map(game => (
                <Product
                  key={game._id}
                  id={game._id}
                  image={game.image}
                  platform={game.platforms}
                  price={game.price}
                  name={game.name}
                />
              ))}
            </div>
          </section>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

export default ProductsPage;
