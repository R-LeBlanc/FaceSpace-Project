import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { UsersContext } from "./UsersContext";

const ProfilePage = () => {
  const { id } = useParams();
  const { state } = React.useContext(UsersContext);
  const [userProfile, setUserProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [friends, setFriends] = React.useState([]);

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
        // console.log(friend);
        fetch(`/api/users/${friend}`)
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setFriends((friends) => [...friends, data.data]);
            // setFriends(data.data);
          });
      });
    }
  }, [loading]);

  //   console.log(friends);
  //   console.log(userProfile);

  return (
    <Body>
      <Header>
        <Title to="/">Facespace</Title>
        <SignIn to="/signin">Sign In</SignIn>
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

const SignIn = styled(Link)`
  color: white;
  text-decoration: none;
`;

const ProfileHeader = styled.div`
  font-size: 0.9rem;
  display:flex
  position: relative;
`;

const Banner = styled.div`
  background-image: url("/images/facespace_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 30vh;
  width: 100vw;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 20vw;
`;

const DisplayImg = styled.img`
  max-height: 20vh;
  position: relative;
  top: -10vh;
  z-index: 5;
`;

const Name = styled.div`
  color: var(--primary-color);
  font-size: 1.5rem;
  margin: 20px 30px;
  z-index: 5;
`;

const FriendsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20vw;
`;

const UsersFriends = styled.div`
  border-bottom: 2px solid var(--primary-color);
  color: var(--primary-color);
  font-size: 1.3rem;
  width: 100%;
`;

const ImgWrapper = styled.div`
  display: flex;
`;

const SecondImgWrapper = styled.div`
  margin: 20px 20px 20px 0;
  position: relative;
  text-align: center;
  width: var(--user-img-width);
`;

const FriendImg = styled.img`
  border: 2px solid var(--primary-color);
  /* height: 100%; */
  width: 100%;
`;

const FriendName = styled.div`
  background: rgba(255, 255, 255, 0.4);
  padding: 5px 0;
  position: absolute;
  bottom: 2px;
  width: 100%;
`;
