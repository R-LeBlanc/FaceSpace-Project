import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { UsersContext } from "./UsersContext";
import { SignedInUserContex } from "./SignedInUserContext";

const ProfilePage = () => {
  const { id } = useParams();
  const { state } = React.useContext(UsersContext);
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [friends, setFriends] = React.useState([]);
  const { userState } = React.useContext(SignedInUserContex);

  React.useEffect(() => {
    fetch(`/api/users/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data.data);
        setLoading(false);
      });
  }, []);

  React.useEffect(() => {
    if (!loading) {
      userProfile.friends.map((friend) => {
        fetch(`/api/users/${friend}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setFriends((friends) => [...friends, data.data]);
          });
      });
    }
  }, [loading]);

  return (
    <Body>
      <Header>
        <Title to="/">FaceSpace</Title>
        {!userState.signedIn && <SignIn to="/signin">Sign In</SignIn>}
        {userState.signedIn && (
          <Welcome>Welcome, {userState.currentUser.name}</Welcome>
        )}
      </Header>
      {!loading && (
        <>
          <ProfileHeader>
            <Banner src="/images/facespace_bg.jpg" />
            <Wrapper>
              <DisplayImg src={userProfile.avatarUrl} />
              <Name>{userProfile.name}</Name>
            </Wrapper>
          </ProfileHeader>
          <FriendsWrapper>
            <Quote>"{userProfile.quote}"</Quote>
            <UsersFriends>{userProfile.name}'s Friends</UsersFriends>
            <ImgWrapper>
              {friends.map((friend) => {
                return (
                  <SecondImgWrapper key={friend.id}>
                    <FriendImg src={friend.avatarUrl}></FriendImg>
                    <FriendName>{friend.name}</FriendName>
                  </SecondImgWrapper>
                );
              })}
            </ImgWrapper>
          </FriendsWrapper>
        </>
      )}
    </Body>
  );
};

export default ProfilePage;

const Body = styled.div`
  background-color: var(--primary-color);
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

const SignIn = styled(Link)`
  color: white;
  font-size: 1.5rem;
  text-decoration: none;
`;

const Welcome = styled.div`
  font-size: 1.5rem;
`;

const ProfileHeader = styled.div`
  font-size: 0.9rem;
  display:flex
  position: relative;
`;

const Banner = styled.div`
  background-image: url("/images/Mass_Effect/mass-effect-legendary-key-art.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 30vh;
  /* width: 100vw; */
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 20vw;
`;

const DisplayImg = styled.img`
  border-radius: 5%;
  max-height: 20vh;
  position: relative;
  top: -10vh;
  z-index: 5;
`;

const Name = styled.div`
  color: var(--tertiary-light);
  font-size: 3rem;
  margin: 20px 30px;
  height: 40px;
  z-index: 5;
`;

const FriendsWrapper = styled.div`
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  padding: 0 20vw;
`;

const Quote = styled.div`
  color: var(--tertiary-light);
  font-family: Verdana, sans-serif;
  font-size: 1.2rem;
  padding-bottom: 30px;
  text-align: center;
`;

const UsersFriends = styled.div`
  background-image: linear-gradient(
    to bottom right,
    var(--primary-color),
    var(--primary-light)
  );
  border-bottom: 1px solid var(--tertiary-light);
  border-radius: 10px;
  box-shadow: 0 0 5px #4f80d5;
  color: var(--tertiary-light);
  font-size: 1.3rem;
  padding: 10px;
  margin-bottom: 15px;
  width: 100%;
`;

const ImgWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: var(--max-content-width);
`;

const SecondImgWrapper = styled.div`
  border-radius: 5%;
  position: relative;
  margin: 10px;
  overflow: hidden;
  transition: 0.4s all ease-in-out;
  height: var(--user-img-width);
  width: var(--user-img-width);

  &:hover {
    border: 5px solid var(--secondary-color);
    cursor: pointer;
    transform: scale(1.2);
  }
`;

const FriendImg = styled.img`
  display: flex;
  width: 100%;
`;

const FriendName = styled.div`
  background: rgba(127, 210, 232, 0.4);
  padding: 5px 0;
  position: absolute;
  bottom: 2px;
  width: 100%;
`;
