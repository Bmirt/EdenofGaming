import React from "react";
import userContext from "../../context/user-context";
class Search extends React.Component {
  static contextType = userContext;
  state = {
    searchinput: "",
  };
  onHandleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    e.target.value === ""
      ? this.context.searchBoxVisible(false)
      : this.context.searchBoxVisible(true);
    this.context.search(e.target.value);
  };

  render() {
    return (
      <div id="z" className="header__top__wrapper__search">
        <input
          onChange={this.onHandleChange}
          name="searchinput"
          type="search"
          placeholder="Search"
          className="header__top__wrapper__search--content"
        />
        <button className="header__top__wrapper__search--button">
          <i className="fab fa-searchengin awesome" />
        </button>
      </div>
    );
  }
}

export default Search;
