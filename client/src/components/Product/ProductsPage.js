import React from "react";
import spinner from "../../final project/spinner.gif";
import Product from "./Product";

class ProductsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: [],
      isLoaded: false,
      id: this.props.match.params.id
    };
  }

  initComponent() {
    fetch("/api/products")
      .then(res => res.json())
      .then(res =>
        this.setState({
          isLoaded: true,
          filtered: res.filter(
            value =>
              value.platforms
                .toUpperCase()
                .includes(this.state.id.toUpperCase()) ||
              value.genre.toUpperCase().includes(this.state.id.toUpperCase())
          )
        })
      )
      .catch(err => console.log(err));
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isLoaded: false,
      filter: [],
      id: nextProps.match.params.id
    });
    this.initComponent();
  }

  componentDidMount() {
    this.initComponent();
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
      <div style={{ display: "flex", width:"100%" }}>
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
          <h1 style={{textAlign:"center", color:'#FFF',width:"100%", margin:"150px 0"}}>No Products Found</h1>
        )}
      </div>
    );
  }
}

export default ProductsPage;
