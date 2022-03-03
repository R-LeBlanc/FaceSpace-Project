import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import { SignedInUserProvider } from "./components/SignedInUserContext";
import { UsersProvider } from "./components/UsersContext";

ReactDOM.render(
  <SignedInUserProvider>
    <UsersProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </UsersProvider>
  </SignedInUserProvider>,
  document.getElementById("root")
);
