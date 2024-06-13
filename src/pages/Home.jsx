import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import HeaderForm from "../components/HeaderForm";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import MonthForm from "../components/MonthForm";
import AddButton from "../components/AddButton";
import List from "../components/List";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Home = ({ list, setList, currentMonth, setCurrentMonth }) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState("");
  const { isAuthenticated, getUserInfo, userInfo } = useContext(AuthContext);

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (
      date.trim() === "" ||
      item.trim() === "" ||
      price.trim() === "" ||
      detail.trim() === ""
    ) {
      alert("빈 칸을 채워주세요");
      return;
    }

    
    const newList = {
      createdBy: userInfo.id,
      createByNickName: userInfo.nickname,
      item: item,
      price: Number(price),
      detail: detail,
      date: date,
    };
    console.log(newList);
    const postedList = await axios.post("http://localhost:4000/expenses", newList);
    console.log(postedList);

    const updateList = [...list, newList];
    setList(updateList);
    setItem("");
    setPrice("");
    setDetail("");
    setDate("");
  };

  const filteredList = list.filter((item) => {
    return parseInt(item.date.split("-")[1]) === parseInt(currentMonth);
  });


  return (
    <>
      {isAuthenticated ? (
        <>
        <HeaderForm onSubmit={handleAdd}>
        <DateInput date={date} setDate={setDate} />
        <Input
          date={date}
          setDate={setDate}
          item={item}
          setItem={setItem}
          price={price}
          setPrice={setPrice}
          detail={detail}
          setDetail={setDetail}
        />
        <AddButton>등록</AddButton>
      </HeaderForm>
      <MonthForm
        currentMonth={currentMonth}
        setCurrentMonth={setCurrentMonth}
      />
      <List filteredList={filteredList} />
      </>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
      
    </>
  );
};

export default Home;
