import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const token = localStorage.getItem("accessToken");
const baseUrlOne = "https://moneyfulpublicpolicy.co.kr";
const baseUrlTwo = "https://excited-treasure-screen.glitch.me";


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [userInfo, setUserInfo] = useState(null);
  const queryClient = useQueryClient();

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
    setUserInfo(null);
  };

  const getUserInfo = async () => {
    try {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
      const response = await axios.get(`${baseUrlOne}/user`, {
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

  const addExpenses = async (newList) => {
    const response = await axios.post(`${baseUrlTwo}/expenses`, newList);
    return response.data;
  };

  const addMutation = useMutation({
    mutationFn: addExpenses,
    onSuccess: () => {
      queryClient.invalidateQueries("expenses")
    }
  });

  const deleteExpenses = async (id) => {
    const response = await axios.delete(`${baseUrlTwo}/expenses/${id}`);
    return response.data;
  };
  
  const deleteMutation = useMutation({
    mutationFn: deleteExpenses,
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
    }
  });

  // 수정
  const editExpenses = async (updatedExpense) => {
    const { id,...rest } = updatedExpense;
    console.log(updatedExpense)
    try {
      const response = await axios.put(`${baseUrlTwo}/expenses/${id}`,
    rest
  );
  console.log(rest);
  return response.data;
    } catch (error) {
      console.error("수정 중 오류 =>",error);
    }
  };

  const editMutation = useMutation({
    mutationFn: editExpenses,
    onSuccess: () => {
      queryClient.invalidateQueries("expenses");
    }
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, getUserInfo, userInfo, setUserInfo,
    addMutation, deleteMutation, editMutation }}>
      {children}
    </AuthContext.Provider>
  );
};