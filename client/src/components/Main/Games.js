import React from "react";
import Product from "../Product/Product";
import Spinner from "../../final project/spinner.gif";
import ShopContext from '../../context/shop-context';

class Games extends React.Component {
  static contextType = ShopContext;
  state = {
    isLoaded: true
  };

  render() {
    const games = this.context.games;
    if (!this.state.isLoaded) {
      return (
        <Spinner/>
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
