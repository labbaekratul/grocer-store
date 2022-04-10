import React from "react";
import error from "../images/error.svg";

function MessageBox() {
  return (
    <div className="error_div">
      <img className="error_img" src={error} alt={error} />
      <p>Data Not Found</p>
    </div>
  );
}

export default MessageBox;
