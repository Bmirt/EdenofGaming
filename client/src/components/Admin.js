import React from "react";
import Auth from './utils/AuthMethods';
// import axios from "axios";

class Admin extends React.Component {
  state ={
    isAdmin: null
  }
  componentDidMount(){
    this.setState({isAdmin:Auth.isAdmin()})
  }
  render() {
    if(!this.state.isAdmin){
      return<h1 style={{textAlign:"center", fontSize:"20px", color:"#FFF",margin:"200px 0"}}>You Don't have Access To This Page</h1>
    }
    return (
      <div>
        <div className="container bootstrap snippet">
          <div className="row">
            <div className="col-sm-10">
              <h1 className= "admin__name">Admin Panel<span className= "admin__name--title">Manage Your Site</span></h1>
              <h2 className= "admin__name">Welcome {this.props.user.name} </h2>

            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              
              <ul className="list-group">
                <li className="list-group-item text-muted">
                  Activity <i className="fa fa-dashboard fa-1x" />
                </li>
                <li className="list-group-item text-right">
                  <span className="pull-left">
                    <strong>Messages</strong>
                  </span>{" "}
                  125
                </li>
                <li className="list-group-item text-right">
                  <span className="pull-left">
                    <strong>Likes</strong>
                  </span>{" "}
                  13
                </li>
                <li className="list-group-item text-right">
                  <span className="pull-left">
                    <strong>Dislikes</strong>
                  </span>{" "}
                  37
                </li>
                <li className="list-group-item text-right">
                  <span className="pull-left">
                    <strong>Comments</strong>
                  </span>{" "}
                  78
                </li>
              </ul>

              <div className="panel panel-default">
                <div className="panel-heading">Social Media</div>
                <div className="panel-body">
                  <div className="bottom">
                    <a
                      className="btn btn-primary btn-twitter btn-sm"
                      href="https://twitter.com"
                    >
                      <i className="fa fa-twitter" />
                    </a>
                    <a
                      className="btn btn-danger btn-sm"
                      rel="publisher"
                      href="https://plus.google.com"
                    >
                      <i className="fa fa-google-plus" />
                    </a>
                    <a
                      className="btn btn-primary btn-sm"
                      rel="publisher"
                      href="https://plus.google.com"
                    >
                      <i className="fa fa-facebook" />
                    </a>
                    <a
                      className="btn btn-warning btn-sm"
                      rel="publisher"
                      href="https://plus.google.com"
                    >
                      <i className="fa fa-behance" />
                    </a>
                  </div>{" "}
                </div>
              </div>

              {/* aaaaaaaaaaaa */}
            </div>
            <div className="col-sm-9">
              <ul className="nav nav-tabs">
                <li className="active">
                  <a data-toggle="tab" className="user-profile__link" href="#home">
                    dashboard
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" className="user-profile__link" href="#pages">
                    Pages
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" className="user-profile__link" href="#games">
                    Games
                  </a>
                </li>
                <li>
                  <a data-toggle="tab" className="user-profile__link" href="#users">
                    Users
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className="tab-pane active" id="home">
                <h3 className="header__bottom__nav--list">
                    dashboard
                  </h3>   
                 
                </div>
                <div className="tab-pane" id="pages">
                  <h3 className="header__bottom__nav--list">
                    Pages information
                  </h3>
                 </div> 
                  <div className="tab-pane" id="games">
                  <h3 className="header__bottom__nav--list">
                    Games information
                  </h3>
                </div> 
                  <div className="tab-pane" id="users">
                  <h3 className="header__bottom__nav--list">
                    Users information
                  </h3>

                  

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
