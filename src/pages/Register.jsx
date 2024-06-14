import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUpContainer = styled.div`
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

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
  font-size: 0.875rem;
`;

const Register = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // 유효성 검사
  const validation = () => {
    const newError = {};
    if (id.length < 4 || id.length > 10) {
      newError.id = 'ID는 4글자 이상, 10글자 미만이어야만 합니다.';
    }
    if (password.length < 4 || password.length > 15) {
      newError.password = '비밀번호는 4글자 이상, 15글자 미만이어야만 합니다.';
    }
    if (nickname.length < 1 || nickname.length > 10) {
      newError.nickname = '닉네임은 1글자 이상, 10글자 미만이어야만 합니다.';
    }
    setErrors(newError);
    return Object.keys(newError).length === 0; // 에러가 비어있는지 확인
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        const response = await axios.post("https://moneyfulpublicpolicy.co.kr/register", {
          id,
          password,
          nickname,
        });
        console.log(response);
        const tokenId = response.data.token;
        localStorage.setItem("token", tokenId);
        alert("회원가입을 성공적으로 마쳤습니다!");
        navigate("/login");
      }
      catch (error) {
        console.error("Register Error =>", error);
      }
    }
  };

  const LoginPage = () => {
    navigate("/login");
  }

  return (
    <SignUpContainer>
      <Title>회원가입</Title>
      <form onSubmit={handleRegister}>
        <FormGroup>
          <Label htmlFor="id">아이디:</Label>
          <Input
            type="text"
            id="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
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
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="nickname">닉네임:</Label>
          <Input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
          {errors.nickname && <ErrorMessage>{errors.nickname}</ErrorMessage>}
        </FormGroup>
        <Button type="submit">회원가입하기</Button>
        <Button type="button" onClick={LoginPage} >로그인으로 돌아가기</Button>
      </form>
    </SignUpContainer>
  );
};

export default Register;
