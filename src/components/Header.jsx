import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/AuthContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #4c4ff9;
`;

const Title = styled.h1`
  a {
    text-decoration: none;
    color: black;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Button = styled.button`
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
`;

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("정말로 로그아웃 하시겠습니까?");
    if (confirmLogout) {
      logout();
      navigate("/");
    }
  };

  return (
    <HeaderContainer>
      <Title>
        <Link to="/">가계부</Link>
      </Title>
      <Nav>
        {isAuthenticated ? (
          <>
          <NavLink to="/user">My Page</NavLink>
          <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Signup</NavLink>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
