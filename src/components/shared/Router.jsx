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

const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/expenses")
      .then(({ data }) => {
        console.log(data);
        setList(data);
      })
      .catch((error) => {
        console.log("Error =>", error);
      });
  }, []);

    const [currentMonth, setCurrentMonth] = useState(
    `${new Date().getMonth() + 1}`
  );

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
