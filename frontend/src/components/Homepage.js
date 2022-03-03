import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import GlobalStyles from "./GlobalStyles";
import { useNavigate } from "react-router-dom";

import { UsersContext } from "./UsersContext";

const HomePage = () => {
  const navigate = useNavigate();
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

  const handleImageClick = (id) => {
    // console.log(id);
    navigate(`/${id}`);
  };

  //   console.log(state);
  return (
    <Page>
      <Header>
        <Title>Facespace</Title>
        <SignIn to="/signin">Sign In</SignIn>
      </Header>
      <BigWrapper>
        <Wrapper>
          <Comment>All Facespace Members</Comment>
          {!state.loading &&
            state.data.map((user) => {
              // console.log(user.avatarUrl);
              return (
                <Image
                  key={user.id}
                  src={user.avatarUrl}
                  onClick={() => handleImageClick(user.id)}
                />
              );
            })}
        </Wrapper>
      </BigWrapper>
    </Page>
  );
};

export default HomePage;

const Page = styled.div`
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

const Title = styled.div``;

const SignIn = styled(Link)`
  color: white;
  text-decoration: none;
`;

const BigWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: var(--max-content-width);
`;

const Comment = styled.div`
  color: var(--primary-color);
  font-size: 1.8rem;
  margin: 15px 10px 0;
  width: 90%;
`;

const Image = styled.img`
  display: flex;
  margin: 10px;
  width: var(--user-img-width);

  &:hover {
    border: 5px solid var(--primary-color);
    cursor: pointer;
    transform: scale(1.5);
  }
`;
