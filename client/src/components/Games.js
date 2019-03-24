import React from "react";
import axios from "axios";
import Product from "./Product";
import ShopContext from "../context/shop-context";
import spinner from "../final project/spinner.gif";

class Games extends React.Component {
  static contextType = ShopContext;
  state = {
    isLoaded: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/products")
      .then(res => {
        this.context.games = res.data;
        this.setState({
          isLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const games = this.context.games;
    if (!this.state.isLoaded) {
      return (
        <img
          style={{ width: "80px", height: "80px", margin: "100px 500px" }}
          src={spinner}
        />
      );
    } else {
      return (
        <section className="main__middle">
          <div className="main__middle__wrapper">
            {games.map(game => (
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
      );
    }
  }
}

export default Games;
