import React from "react";
import UserContext from "../context/user-context";
export default class Comment extends React.Component {
  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div class="discription__wrappertop__down__comment">
            <div class="discription__wrappertop__down__comment--wrapper">
              <form class="discription__wrappertop__down__comment--wrapper--inside">
                <div class="discription__wrappertop__down__comment--wrapper--inside--profile">
                  <img
                    src={context.user ? context.user.avatar : "https://i0.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?resize=256%2C256&quality=100&ssl=1"}
                    alt=""
                    class="discription__wrappertop__down__comment--wrapper--inside--profile--image"
                  />
            
                  <span class="discription__wrappertop__down__comment--wrapper--inside--profile--name">
                    {context.user ? context.user.name : "user"}
                  </span>
                </div>
                <textarea
                  name=""
                  id=""
                  class="discription__wrappertop__down__comment--wrapper--inside--comment"
                  placeholder="write comment"
                />
              </form>
              <p class="discription__wrappertop__down__comment--wrapper--result">
                aq gamochndeba dawerili komentari
              </p>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}
