import React from "react";
import Slider from "./Slider";
import Product from "./Product";
import Footer from "./Footer"

class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <main className="main">
          <section className="main__top">
            <Slider />
          </section>
          <section className="main__middle">
            <div class="main__middle__wrapper">
              <Product platform="PlayStation" price="100" />
              <Product platform="PlayStation" price="100" />
              <Product platform="PlayStation" price="100" />
              <Product platform="PlayStation" price="100" />
              <Product platform="PlayStation" price="100" />
              <Product platform="PlayStation" price="100" />
              <Product platform="PlayStation" price="100" />
              <Product platform="PlayStation" price="100" />
              <Product platform="PlayStation" price="100" />
            </div>
          </section>
          <Footer/>
        </main>
      </React.Fragment>
    );
  }
}

export default Main;
