import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

const HomePage = () => {
  return (
    <>
      <Header>
        <Title>Facespace</Title>
        <SignIn to="/signin">Sign In</SignIn>
        {/* <Link to="signin">Sign In</Link> */}
      </Header>
    </>
  );
};

export default HomePage;

const Header = styled.div`
  background-color: var(--primary-color);
  color: white;
  font-family: var(--heading-font-family);
  font-size: 2rem;
  height: var(--header-height);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div``;

const SignIn = styled(Link)`
  color: white;
  text-decoration: none;
`;
