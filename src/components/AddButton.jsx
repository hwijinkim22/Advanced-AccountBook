import React, { useState } from "react";
import styled from "styled-components";

const ButtonStyle = styled.button`
  background-color: #75c3ff;
  border-radius: 10px;
  padding: 10px;
  margin: 5px 20px;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;

  &:hover {
    background-color: #5aabff;
  }
`;

const AddButton = ({children, type, onClick}) => {
  return (
    <div>
      <ButtonStyle
      type={type}
      onClick={onClick}
      >{children}</ButtonStyle>
    </div>
  );
};

export default AddButton;
