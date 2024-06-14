import React, { useContext, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../../pages/Home";
import Detail from "../../pages/Detail";
import { useState } from "react";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { AuthContext, AuthProvider } from "../../context/AuthContext";
import MyPage from "../../pages/MyPage";
import axios from "axios";
import Header from "../Header";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const Router = () => {
  const [currentMonth, setCurrentMonth] = useState(
    `${new Date().getMonth() + 1}`
  );
  const { isAuthenticated } = useContext(AuthContext);
  const [list, setList] = useState([]);

  const fetchExpenses = async () => {
    const response = await axios.get("https://excited-treasure-screen.glitch.me/expenses")
    return response.data;
  }

  const {data, isLoading, isError} = useQuery({
    queryKey: ["expenses"],
    queryFn: fetchExpenses,
  });

  useEffect(() => {
    if(data) {
      setList(data);
    }
  },[data]);
  

  if(isLoading) {
    return <div>로딩 중입니다.</div>
  }

  if(isError) {
    console.error("불러오는 중 오류 =>", isError);
  }

  // useEffect(() => {
  //   axios.get("http://localhost:4000/expenses")
  //     .then(({ data }) => {
  //       console.log(data);
  //       setList(data);
  //     })
  //     .catch((error) => {
  //       console.log("Error =>", error);
  //     });
  // }, []);



  return (
    <>
      <AuthProvider>
        <BrowserRouter>
        <Header/>
          <Routes>
            <Route
              path="/"
              element={<Home list={list} setList={setList} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth}/>}
            />
            <Route
              path="/detail/:id"
              element={<Detail list={list} setList={setList} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/user"
              element={isAuthenticated ? <MyPage /> : <Login />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default Router;
