import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import MessageDropdown from "./pages/MessageDropdown";

function App() {
  return (
    <BrowserRouter>
      <MessageDropdown />
      <ToastContainer autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
