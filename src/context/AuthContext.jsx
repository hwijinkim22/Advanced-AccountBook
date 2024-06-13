import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userInfo, setUserInfo] = useState(null);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  const getUserInfo = async () => {
    try {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
      const response = await axios.get("https://moneyfulpublicpolicy.co.kr/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        }
      });
      setUserInfo(response.data);
      return response.data;
    }
    else {
      console.log("액세스 토큰 없음");
    }
    } catch (error) {
      console.error("유저 정보 에러=>", error);
    }
  }
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getUserInfo, userInfo, setUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};