import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./queries.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />

    {/* <StarRating
      maxRating={5}
      messages={["terrible", "bad", "okay", "good", "amazing"]}
    />
    <StarRating maxRating={10} size={24} color="red" />
    <StarRating className="test" defaultRating={4} />
    <Test /> */}
  </React.StrictMode>
);
