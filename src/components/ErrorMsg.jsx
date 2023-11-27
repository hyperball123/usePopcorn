import React from "react";

function ErrorMsg({ message }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}

export default ErrorMsg;
