import React from "react";
import axios from "axios";
import Product from "./Product"

class Games extends React.Component {
  state = {
    games: [],
    isLoaded: false
  };
  componentDidMount() {
    axios
      .get("http://localhost:5000/api/products")
      .then(res => {
        this.setState({
          games: res.data,
          isLoaded: true
        });
        console.log(res.data);
      })
      .catch(err => console.log(err));
  }

  render() {
    const { games } = this.state;
    console.log(games);
    if (!this.state.isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <section className="main__middle">
          <div className="main__middle__wrapper">
            {games.map(game => (
              <Product
                key={game._id}
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