import React, { useState } from "react";
import styled from "styled-components";


const InputStyle = styled.input`
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Input = ({ item, setItem, price, setPrice, detail, setDetail }) => {

  return (
    <>
      <div>항목:</div>
      <InputStyle
        type="text"
        value={item}
        onChange={(e) => {
          setItem(e.target.value);
        }}
      />
      <br/>
      <div>가격:</div>
      <InputStyle
        type="text"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />

      <div>내용:</div>
      <InputStyle
        type="text"
        value={detail}
        onChange={(e) => {
          setDetail(e.target.value);
        }}
      />
    </>
  );
};

export default Input;
