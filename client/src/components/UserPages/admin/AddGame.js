import React from "react";
import axios from "axios";
import shopContext from "../../../context/shop-context";


class AddGames extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            image: "",
            image2: "",
            genre: "",
            developer: "",  
            reliase: "",
            platforms: "",
            price: "",
            trailer: "",
            description: "",
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
      }
    
      onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
      }
      onSubmit(e) {
        e.preventDefault();
        const newProduct = {
            name: this.state.name,
            developer: this.state.developer,
            image: this.state.image,
            image2: this.state.image2,
            genre: this.state.genre,
            trailer: this.state.trailer,
            reliase: this.state.reliase,
            platforms: this.state.platforms,
            price: this.state.price,
            description: this.state.description,
        };
       
        axios
          .post("http://localhost:5000/api/products", newProduct)
          .then(res => {
            console.log(res.data);
            alert("product has been succesfully added");
            window.location = "/";
          })
          .catch(err => this.setState({ errors: err.response.data }));
      }
    
      render() {
        return (
          <shopContext.Consumer>
            {
              (context)=>
              <div>
                <div className="container bootstrap snippet">
                  <div className="row">
                   
    
                  
                          <form
                            className="user-formm"
                            onSubmit={this.onSubmit}
                            method="post"
                            id="gameAdding"
                          >
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="game_name">
                                  <h4 className="user-profile__input-title">
                                    game title
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  id="game_name"
                                  placeholder="game title"
                                  className="form-control user-profile__input "
                                  title="enter your unique identifier"
                                  value={this.state.name}
                                  onChange={this.onChange}
                                />
                                
                              </div>
                            </div>
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="image">
                                  <h4 className="user-profile__input-title">image link</h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input "
                                  name="image"
                                  id="image"
                                  placeholder="image link"
                                  title="Enter image link"
                                  value={this.state.image}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
    
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="image2">
                                  <h4 className="user-profile__input-title">
                                    background image
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="image2"
                                  id="image2"
                                  placeholder="background image"
                                  title="Enter image link"
                                  value={this.state.image2}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
    
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="genre">
                                  <h4 className="user-profile__input-title">
                                    genre
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="genre"
                                  id="genre"
                                  placeholder="game genre"
                                  title="genre"
                                  value={this.state.genre}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="trailer">
                                  <h4 className="user-profile__input-title">
                                    trailer
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="trailer"
                                  id="trailer"
                                  placeholder="triler link"
                                  title="treiler"
                                  value={this.state.trailer}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
    
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="reliase">
                                  <h4 className="user-profile__input-title">
                                    reliase
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="reliase"
                                  id="reliase"
                                  placeholder="game reliase"
                                  title="reliase"
                                  value={this.state.reliase}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
    
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="platforms">
                                  <h4 className="user-profile__input-title">
                                    platforms
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="platforms"
                                  id="platforms"
                                  placeholder="platforms"
                                  title="platforms"
                                  value={this.state.platforms}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="price">
                                  <h4 className="user-profile__input-title">
                                    price
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="price"
                                  id="price"
                                  placeholder="price"
                                  title="price"
                                  value={this.state.price}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
    
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="developer">
                                  <h4 className="user-profile__input-title">
                                    developer
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="developer"
                                  id="developer"
                                  placeholder="game developer"
                                  title="developer"
                                  value={this.state.developer}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="description">
                                  <h4 className="user-profile__input-title">
                                    description
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="description"
                                  id="description"
                                  placeholder="game description"
                                  title="description"
                                  value={this.state.description}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>
    
    
    
    
                            
                            <div className="form-group">
                              <div className="col-xs-12">
                                <br />
                                <button
                                  className="btn btn-lg btn-success user-profile__btn user-profile__btn__color"
                                  type="submit"
                                >
                                  <i className="glyphicon glyphicon-ok-sign" /> add game
                                </button>
                                
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
               
            }
           </shopContext.Consumer>
        );
      }
    }

 export default AddGames

    
    