import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "../../pages/Home"
import Detail from '../../pages/Detail'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Login from '../../pages/Login'
import Register from '../../pages/Register'
import { AuthContext, AuthProvider } from '../../context/AuthContext'
import MyPage from '../../pages/MyPage'

const Router = () => {
  const {isAuthenticated} = useContext(AuthContext);
  const [list, setList] = useState([
    {
      id:uuidv4(),
      item: "의료비",
      price: 25000,
      detail: "귀막힘",
      date: "2024-05-24"
    },
    {
      id:uuidv4(),
      item: "식비",
      price: 20000,
      detail: "족발",
      date: "2024-05-20"
    },
    {
      id:uuidv4(),
      item: "식비",
      price: 35000,
      detail: "술값",
      date: "2024-05-04"
    },
    {
      id:uuidv4(),
      item: "미용",
      price: 55000,
      detail: "파마",
      date: "2024-03-24"
    }
  ]);

  const [currentMonth, setCurrentMonth] = useState(`${new Date().getMonth() + 1}`);



  return (
    <>
  <AuthProvider>
    <BrowserRouter>
			<Routes>
				<Route path="/" element={isAuthenticated ?<Home currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} list={list} setList={setList}/> : <Login/>} />
        <Route path="/detail/:id" element={<Detail list={list} setList={setList}/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/user" element={isAuthenticated? <MyPage/> : <Login/>} />
			</Routes>
    </BrowserRouter>
  </AuthProvider>
    </>
  )
}

export default Router