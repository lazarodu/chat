import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import MessageDropdown from "./pages/MessageDropdown";

if (document.getElementById("messageDropdown")) {
  ReactDOM.render(
    <MessageDropdown />,
    document.getElementById("messageDropdown")
  );
}
