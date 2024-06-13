import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../context/AuthContext';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);


  const RegisterPage = () => {
    navigate("/register");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("https://moneyfulpublicpolicy.co.kr/login?expiresIn=360m", {
            id,
            password,
        });
        const tokenId = response.data.accessToken;
        localStorage.setItem("token", tokenId);
        login(tokenId);
        alert(`${response.data.nickname}님 환영합니다!`);
        navigate("/");
    } 
    catch (error) {
        console.error("Login Error =>", error);
        alert("올바르지 않은 정보입니다! 다시 시도해주세요.");
    }
  }
  return (
    <LoginContainer>
      <Title>Login</Title>
      <form onSubmit={handleLogin}>
        <FormGroup>
          <Label htmlFor="id">아이디:</Label>
          <Input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">비밀번호:</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">로그인</Button>
        <Button type="button" onClick={RegisterPage}>회원가입</Button>
      </form>
    </LoginContainer>
  );
};

export default Login;
