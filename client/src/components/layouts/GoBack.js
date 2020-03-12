import React from "react";
import { ReactComponent as Left } from "../../assets/left.svg";

const GoBack = props => {
  return (
    <button
      className="goback"
      onClick={() => {
        props.history.goBack();
      }}
    >
      <Left width="25px" height="25px" />
    </button>
  );
};

export default GoBack;
