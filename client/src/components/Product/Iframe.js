import React from "react";
export const Iframe = props => {
  if (props.url) {
    return (<iframe src={props.url} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="discription__wrappertop__middle__wrapper__iframe" title="Trailer" />);
  }
  return null;
};
