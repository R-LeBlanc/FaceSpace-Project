import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useNavigate } from "react-router-dom";

import { SignedInUserContex } from "./SignedInUserContext";
import { UsersContext } from "./UsersContext";

const SignInPage = () => {
  const navigate = useNavigate();
  const {
    userState,
    actions: { recieveSignedInUserData },
  } = React.useContext(SignedInUserContex);
  const {
    state,
    actions: { recieveUserDataFromServer },
  } = React.useContext(UsersContext);
  const [name, setName] = React.useState(null);

  const onNameChange = (event) => {
    state.data.map((user) => {
      if (user.name === event.target.value) {
        setName(user);
      }
    });
    // setName(event.target.value);
  };

  const handleSubmit = () => {
    // console.log(name);
    // state.data.map((user) => {
    //   console.log(user);
    //   if (user.name === name) {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(name),
    };
    fetch(`/api/users/`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        recieveSignedInUserData(data.data);
        navigate("/");
      });
    //   }
    // });
  };

  return (
    <Body>
      <Header>
        <Title to="/">FaceSpace</Title>
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
  background-image: url("/images/Mass_Effect/mass-effect-legendary-key-art.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  font-family: var(--heading-font-family);
  height: 100vh;
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
  height: 93%;
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
