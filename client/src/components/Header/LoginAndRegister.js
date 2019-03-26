import React from 'react'
import {Link} from 'react-router-dom'
import user from '../final project/assets/images/user.png'


export default () =>{
    return <React.Fragment>
        <Link
                      to={"/login"}
                      className="header__top__wrapper--user--login"
                    >
                      <img src={user} width="30px;" alt="" />
                      <span className="header__top__wrapper--user--login--text">
                        Log In
                      </span>
                    </Link>
                    <Link
                      to={"/register"}
                      className="header__top__wrapper--user--login register"
                    >
                      <img src={user} width="30px;" alt="" />
                      <span className="header__top__wrapper--user--login--text ">
                        Register
                      </span>
                    </Link>
    </React.Fragment>
}