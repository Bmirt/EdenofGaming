import React from "react";
// import axios from "axios";

class UserProfile extends React.Component {
    render() { 
          return (
            <div> 
    
            <div className="container bootstrap snippet">
                                <div className="row">
                                    <div className="col-sm-10"><h1>User name</h1></div>
                                </div>
                    <div className="row">
                            <div className="col-sm-3">
                        

                    <div className="text-center">
                        <img src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png" className="avatar img-circle img-thumbnail" alt="avatar"/>
                        <h6>Upload a different photo...</h6>
                        <input type="file" className="text-center center-block file-upload"/>
                    </div>
                    <br />

                    <div className="panel panel-default">
                        <div className="panel-heading">Website <i className="fa fa-link fa-1x"></i></div>
                        <div className="panel-body"><a href="http://bootnipets.com">bootnipets.com</a></div>
                    </div>
                    
                    
                    <ul className="list-group">
                        <li className="list-group-item text-muted">Activity <i className="fa fa-dashboard fa-1x"></i></li>
                        <li className="list-group-item text-right"><span className="pull-left"><strong>Shares</strong></span> 125</li>
                        <li className="list-group-item text-right"><span className="pull-left"><strong>Likes</strong></span> 13</li>
                        <li className="list-group-item text-right"><span className="pull-left"><strong>Posts</strong></span> 37</li>
                        <li className="list-group-item text-right"><span className="pull-left"><strong>Followers</strong></span> 78</li>
                    </ul>

                        <div className="panel panel-default">
            <div className="panel-heading">Social Media</div>
            <div className="panel-body">
                    <div className="bottom">
                            <a className="btn btn-primary btn-twitter btn-sm" href="https://twitter.com">
                                <i className="fa fa-twitter"></i>
                            </a>
                            <a className="btn btn-danger btn-sm" rel="publisher"
                            href="https://plus.google.com">
                                <i className="fa fa-google-plus"></i>
                            </a>
                            <a className="btn btn-primary btn-sm" rel="publisher"
                            href="https://plus.google.com">
                                <i className="fa fa-facebook"></i>
                            </a>
                            
                        </div>            </div>
        </div>
             
                                        
            </div>
                    <div className="col-sm-9">
                            <ul className="nav nav-tabs">
                                <li className="active"><a data-toggle="tab" href="#home">Basic Information</a></li>
                                <li><a data-toggle="tab" href="#settings">Balance</a></li>
                            </ul>
      

                        <div className="tab-content">
                            <div className="tab-pane active" id="home">

                            <h3 className="header__bottom__nav--list">basic information</h3>


                            </div>
                            <div className="tab-pane" id="settings">

                            <h3 className="header__bottom__nav--list">balance information</h3>


                                        </div>

                                                    
                        </div>
                    </div>
            </div>


                    </div>
            </div>
        )
    }
  }
  
  export default UserProfile