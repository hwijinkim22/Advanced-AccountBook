import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

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
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
        backgroundColor: "lightgray",
      }}
    >
      <h1>
        <Link
          style={{
            textDecoration: "none",
            color: "black",
            fontSize: "30px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
          to="/"
        >
          가계부
        </Link>
      </h1>
      <nav
        style={{
          display: "flex",
          gap: "20px",
        }}
      >
        {isAuthenticated ? (
          <>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              to="/login"
            >
              Login
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "black",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              to="/register"
            >
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
