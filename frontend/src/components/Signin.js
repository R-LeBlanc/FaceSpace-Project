import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";

const SignInPage = () => {
  const [user, setUser] = React.useState(null);

  const onNameChange = (event) => {
    setUser(event.target.value);
  };

  const handleSubmit = () => {
    console.log(user);
  };
  return (
    <Body>
      <Header>
        <Title to="/">Facespace</Title>
      </Header>
      <MainWrapper>
        <SigninWrapper>
          <Border>
            <Signin
              placeholder="Your first name"
              onChange={(event) => {
                onNameChange(event);
              }}
            ></Signin>
            <Submit type="submit" onClick={handleSubmit}>
              Submit
            </Submit>
          </Border>
        </SigninWrapper>
      </MainWrapper>
    </Body>
  );
};

export default SignInPage;

const Body = styled.div`
  font-family: var(--heading-font-family);
`;

const Header = styled.div`
  background-color: var(--primary-color);
  color: white;

  font-size: 2rem;
  height: var(--header-height);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(Link)`
  color: white;
  text-decoration: none;
`;

const MainWrapper = styled.div`
  background-image: url("/images/facespace_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  height: 95vh;
  width: 100vw;
`;

const SigninWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;

const Border = styled.div`
  background: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  padding: 30px;
  width: 300px;
`;

const Signin = styled.input`
  border: none;
  font-size: 1.3rem;
  height: 2rem;
  margin-bottom: 5px;
`;

const Submit = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  font-family: var(--heading-font-family);
  font-size: 1.5rem;
`;
