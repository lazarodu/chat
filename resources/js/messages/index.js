import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if (document.getElementById("messages")) {
  ReactDOM.render(<App />, document.getElementById("messages"));
}
