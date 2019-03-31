import React from "react";
import { SearchResult } from "./Header/SearchResult";
import Product from "./Product/Product"
export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
      console.log("prooops", this.props)
    return this.props.visible ? (
      <div
        className="search-box"
        style={{
          width: "500px",
          height: "400px",
          background: "#FFF",
          position: "absolute",
          zIndex: "100000",
          top: "100px",
          left: "550px",
          overflowY: "scroll"
        }}
      >
        {this.props.game ? this.props.game:
        <div><h1>No result found</h1></div>
        }
      </div>
    ) : null;
  }
}
