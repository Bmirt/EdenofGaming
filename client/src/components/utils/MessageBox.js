import React, { Component } from "react";

let dialogStyles = {
  minwidth: "200px",
  maxWidth: "400",
  margin: "0 auto",
  position: "fixed",
  left: "50%",
  top: "35%",
  transform: "translate(-50%,-50%)",
  backgroundColor: "#0E0D13",
  padding: "10px 20px 40px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column",
  color: "#FFF",
  zIndex: 1000
};

let dialogCloseButtonStyles = {
  marginBottom: "15px",
  padding: "3px 8px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "none",
  width: "30px",
  height: "30px",
  fontWeight: "bold",
  alignSelf: "flex-end",
  backgroundColor: "#0E0D13",
  color:"#FFF",
  outline:"none"
};

class MessageBox extends Component {
  
  render() {
    let dialog = (
      <div style={dialogStyles}>
        <button style={dialogCloseButtonStyles} onClick={this.props.close}>
          x
        </button>

        <div>{this.props.children}</div>
      </div>
    );

    if (!this.props.isOpen) {
      dialog = null;
    }
    return <div>{dialog}</div>;
  }
}

export default MessageBox;
