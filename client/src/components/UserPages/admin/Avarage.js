import React from "react";
import axios from "axios";

class Avarage extends React.Component {
  constructor() {
    super();
    this.state = {
      age: [],
      balance: "",
      errors: {}
    };
  }

  componentDidMount() {
    window.scroll(0, 0);
     var config = {
      headers: { Authorization: localStorage.getItem("token") }
    };
    axios
      .get(`http://localhost:5000/api/profile/all`, config)
      .then(res => {
        this.setState({
          age: res.data.map(item => item.age)
        });
      })

      .catch(err => this.setState({ isLoaded: true }));
  }


  mean(numbers) {
    var total = 0,
        i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length;
}

  render() {
   
    return (
      <div >
        <div className="admin__dash__info admin__dash__info--age">
         
            <p className="admin__dash__info--age--p">users avarage age:</p>
            <div className="admin__dash__info--age--div">
                <i className="fas fa-chart-bar admin__dash__info--age--awesome"></i>
                <p className="admin__dash__info--age--span">{Math.round(this.mean(this.state.age))}</p>
             </div>
        </div>
  </div>
    );
  }
}

export default Avarage;
