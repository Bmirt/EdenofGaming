import React from "react";
import { Link } from "react-router-dom";

export const Logo = props => {
  return (
    <Link to={"/"} className="header__top__wrapper--logo">
      <img
        src={props.logo}
        alt=""
        className="header__top__wrapper--logo--image"
      />
    </Link>
  );
};
