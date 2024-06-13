import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const MyPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #c7cdf4;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  max-width: 800px;
  margin: 0 auto;
`;

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
  border: 2px solid #ddd;
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-width: 300px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #45a049;
  }
`;


const MyPage = () => {
  const {userInfo, getUserInfo} = useContext(AuthContext);
  const [avatar, setAvatar] = useState(null);
  const [nickname, setNickname] = useState("");
  
  // const getUserInfo = async () => {
  //   try {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if(accessToken) {
  //     const response = await axios.get("https://moneyfulpublicpolicy.co.kr/user", {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${accessToken}`,
  //       }
  //     });
  //     setUserInfo(response.data);
  //     console.log("유저 정보 =>", response.data);
  //   }
  //   else {
  //     console.log("액세스 토큰 없음");
  //   }
  //   } catch (error) {
  //     console.error("유저 정보 에러=>", error);
  //   }
  // }
  console.log(userInfo);
  useEffect(() => {
    getUserInfo();
  },[]);

  const avatarChange = (e) => {
    e.preventDefault();
    setAvatar(e.target.files[0]);
  }

  const nicknameChange = (e) => {
    setNickname(e.target.value);
  }

  const handleSubmit = async () => {
    const formData = new FormData();
    if(avatar) {
      formData.append("avatar", avatar);
      formData.append("nickname", nickname);
    }
    
    try{
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.patch("https://moneyfulpublicpolicy.co.kr/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      getUserInfo();
      alert("프로필 업데이트 성공!")
    }
    catch (error) {
      console.error("프로필 업데이트 오류=>", error);
    }
  };

  return (
    <MyPageContainer>
      MyPage
      {userInfo && (
        <UserInfoContainer>
          <p>아이디: {userInfo.id}</p>
          <p>닉네임: {userInfo.nickname}</p> <button>닉네임 변경하기</button>
          <ProfileImage src={userInfo.avatar} alt="프로필 사진"/>
          <Input
          type="text"
          value={nickname}
          onChange={nicknameChange}
          placeholder="닉네임 변경"
          />
          <Input
          type="file"
          accept="image/*"
          onChange={avatarChange}
          />
          <Button onClick={handleSubmit}>프로필 업데이트</Button>
        </UserInfoContainer>
      )
      }
    </MyPageContainer>
  )
}

export default MyPage
