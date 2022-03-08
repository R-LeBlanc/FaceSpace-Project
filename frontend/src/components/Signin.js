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
  background-image: linear-gradient(
    to bottom right,
    var(--primary-color),
    var(--primary-light)
  );
  border-bottom: 1px solid white;
  border-radius: 0 0 20% 20%;
  box-shadow: 0 0 15px #4f80d5;
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
  height: 90%;
`;

const SigninWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: inherit;
`;

const Border = styled.div`
  clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 44% 100%, 40% 85%, 0% 85%);
  background: rgba(127, 210, 232, 0.4);
  display: flex;
  flex-direction: column;
  padding: 50px 30px;
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
  transition: 0.4s all ease-in-out;

  &:hover {
    border: 1px solid white;
    box-shadow: 0 0 15px #d7000b;
    cursor: pointer;
    transform: scale(1.1);
  }
`;
