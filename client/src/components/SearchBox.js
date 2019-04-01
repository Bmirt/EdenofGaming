import React from "react";
export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return this.props.visible ? (
      <div
        className="search-box"
        style={{
          width: "100%",
          height: "auto",
          background: "#FFF",
          position: "absolute",
          zIndex: "100000",
          top: "180px"
        }}
      >
        <span onClick={this.props.close} style={{ position: "absolute", top:"10px",right:"10px",fontSize:"22px",cursor:"pointer"}}>X</span>
        {this.props.games.length > 0 ? (
          this.props.games.map(item => (
            <div
              style={{ margin: "5px", background: "gray", cursor: "pointer" }}
              key={item._id}
              onClick={() => {
                window.location = `/products/${item._id}`;
              }}
            >
              <img src={item.image} width="80px" height="80px" />
              <span style={{fontSize:"18px", marginLeft:"8px"}}>{item.name}</span>
            </div>
          ))
        ) : (
          <div>
            <h1>No result found</h1>
          </div>
        )}
      </div>
    ) : null;
  }
}
