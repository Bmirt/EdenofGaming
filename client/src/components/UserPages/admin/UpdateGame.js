import React from "react";
import axios from "axios";
import shopContext from "../../../context/shop-context";


class UpdateGame extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
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
        const deleteId = {
            name: this.state.name,         
        };
       console.log(deleteId)
        axios
          .delete(`http://localhost:5000/api/products/${this.state.name}`, )
          .then(res => {
            console.log(res.data);
            alert("product has been succesfully deleted");
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
                            className="admin__game__form"
                            onSubmit={this.onSubmit}
                            method="delete"
                            id="gameAdding"
                          >
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="game_name">
                                  <h4 className="user-profile__input-title">
                                    game id
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  id="game_name"
                                  placeholder="game id"
                                  className="form-control user-profile__input "
                                  title="enter game id"
                                  value={this.state.name}
                                  onChange={this.onChange}
                                />
                                
                              </div>
                            </div>
                           
    
                            
                            <div className="form-group">
                              <div className="col-xs-12">
                                <br />
                                <button
                                  className="btn btn-lg btn-success admin__game__button user-profile__btn__color"
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

 export default UpdateGame

    
    