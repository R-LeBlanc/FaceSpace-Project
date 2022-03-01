import { BrowserRouter, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

import HomePage from "./Homepage";

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <div>
        <Switch>
          <Route exact path="/">
            {HomePage}
          </Route>
          <Route path="/api/users/:id">Users Page</Route>
          <Route path="/signin">Sign in here</Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
