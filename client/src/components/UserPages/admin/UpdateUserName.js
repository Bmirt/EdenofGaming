import React from "react";
import axios from "axios";
import userContext from "../../../context/user-context";


class UpdateUserName extends React.Component {
    constructor() {
        super();
        this.state = {
            value: "",
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
        const newName = {
            name: this.state.name,
        };
        var config = {
            headers: { Authorization: localStorage.getItem("token") }
          };
        axios
          .post(`http://localhost:5000/api/profile/changename/${this.state.value}`, newName, config )
          .then(res => {
            console.log(res.data);
            alert("name has been succesfully updated");
            window.location = "/";
          })
          .catch(err => this.setState({ errors: err.response.data }));
      }
    
      render() {
        return (
          <userContext.Consumer>
            {
              (context)=>
              <div>
                <div className="container bootstrap snippet">
                  <div className="row">
                   
    
                  
                          <form
                            className="admin__game__form"
                            onSubmit={this.onSubmit}
                            method="post"
                            id="gameAdding"
                          >
                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="value">
                                  <h4 className="user-profile__input-title">
                                    user id
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  className="form-control user-profile__input"
                                  name="value"
                                  id="value"
                                  placeholder="value"
                                  title="value"
                                  value={this.state.value}
                                  onChange={this.onChange}
                                />
                              </div>
                            </div>

                            <div className="form-group">
                              <div className="col-xs-6">
                                <label htmlFor="game_name">
                                  <h4 className="user-profile__input-title">
                                    new name
                                  </h4>
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  id="game_name"
                                  placeholder="new name"
                                  className="form-control user-profile__input "
                                  title="enter new name"
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
                                  <i className="glyphicon glyphicon-ok-sign" /> Update Name
                                </button>
                                
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
               
            }
           </userContext.Consumer>
        );
      }
    }

 export default UpdateUserName

    
    