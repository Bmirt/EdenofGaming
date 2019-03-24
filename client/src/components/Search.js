import React from "react";
export const Search = props => {
  return (
    <div id="z" className="header__top__wrapper__search">
      <input
        type="search"
        placeholder="Search"
        className="header__top__wrapper__search--content"
      />
      <button className="header__top__wrapper__search--button">
        <i className="fab fa-searchengin awesome" />
      </button>
    </div>
  );
};
