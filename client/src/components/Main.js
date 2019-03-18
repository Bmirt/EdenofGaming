import React from "react";
import Slider from "./Slider";
import Footer from "./Footer";
import Games from "./Games";
class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <main className="main">
          <section className="main__top">
            <Slider />
          </section>
          <Games />
          <Footer />
        </main>
      </React.Fragment>
    );
  }
}

export default Main;
