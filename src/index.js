import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AccountProvider } from "./context/AccountContext"; // Import the provider
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <AccountProvider>
    <App />
  </AccountProvider>,
  document.getElementById("root")
);
