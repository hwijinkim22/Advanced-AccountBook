import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import HeaderForm from "../components/HeaderForm";
import Input from "../components/Input";
import DateInput from "../components/DateInput";
import MonthForm from "../components/MonthForm";
import AddButton from "../components/AddButton";
import List from "../components/List";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = ({ list, setList, currentMonth, setCurrentMonth }) => {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const filteredList = list.filter((item) => {
    return parseInt(item.date.split("-")[1]) === parseInt(currentMonth);
  });

  const handleAdd = (e) => {
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
      id: uuidv4(),
      item: item,
      price: Number(price),
      detail: detail,
      date: date,
    };

    const updateList = [...list, newList];
    setList(updateList);
    setItem("");
    setPrice("");
    setDetail("");
    setDate("");
  };

  return (
    <>
      <Header/>
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
  );
};

export default Home;
