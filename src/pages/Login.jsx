import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
  };

  const RegisterPage = () => {
    navigate("/register");
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post("https://moneyfulpublicpolicy.co.kr/login", {
            id,
            password,
        });
        const tokenId = response.data.token;
        localStorage.getItem("token", tokenId);
        alert(`${response.data.nickname}님 환영합니다!`);
        navigate("/login");
    } 
    catch (error) {
        
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
