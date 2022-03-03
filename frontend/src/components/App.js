import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import React from "react";

import HomePage from "./Homepage";
import SignInPage from "./Signin";
import ProfilePage from "./ProfilePage";
import { UsersContext } from "./UsersContext";

const App = () => {
  const {
    state,
    actions: { recieveUserDataFromServer },
  } = React.useContext(UsersContext);

  React.useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        recieveUserDataFromServer(data);
      });
  }, []);

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
        <Route path="/:id" element={<ProfilePage />}></Route>
        <Route path="/signin" element={<SignInPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
