import React from "react";
import Slider from "./Slider";
import Games from "./Games";
import SocialMedia from "./SocialMedia";
import Chat from "./Chat";
class Main extends React.Component {
  render() {
    return (
      <React.Fragment>
        <main className="main">
          <section className="main__top">
            <Slider />
          </section>
          <Games />
        </main>
        <SocialMedia/>
        <Chat/>
      </React.Fragment>
    );
  }
}

export default Main;
