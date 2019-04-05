import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/AuthMethods";
import axios from "axios";

class Product extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     product: null,
  //     isLoaded: false,
  //     profile: null
  //   };
  // }

  // componentWillMount() {
  //   window.scroll(0, 0);
  //   const jwt = Auth.getJWT();
  //   var config = {
  //     headers: {
  //       Authorization: jwt
  //     }
  //   };

  //   axios
  //     .get("http://localhost:5000/api/profile", config)
  //     .then(res => {
  //       this.setState({
  //         profile: res.data
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  render() {
    const { id, image, platform, price, name } = this.props;
    const link = `/product/${id}`;
    return (
      <React.Fragment>
        <Link to={link} className="main__middle__wrapper__container">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="main__middle__wrapper__container--image"
          >
            <div className="main__middle__wrapper__container--image--text">
              <p className="main__middle__wrapper__container--image--text--all platform ">
                {platform}
              </p>
              <p className="main__middle__wrapper__container--image--text--all price">
                price {price}$
              </p>
              <p className="main__middle__wrapper__container--image--text--all click">
                For More Click Here
              </p>
            </div>
          </div>
          <div className="main__middle__wrapper__container--name ">{name}</div>
        </Link>
      </React.Fragment>
    );
  }
}

export default Product;
