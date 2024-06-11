import React, { useState } from 'react'
import styled from 'styled-components'
import List from './List'

const StyleMonthButton = styled.button`

  text-align: center;
  font-size: 18px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  width: 90%;
  margin: 20px;
  background-color: ${(props) => props.$active ? '#63eadd' : '#ffffffcc'};
  
  &:hover {
    background-color: #63eadd;
  }

`

const MonthButton = ({month, currentMonth ,setCurrentMonth}) => {
  
  const handleClick = (e) => {
    setCurrentMonth(e.target.value);
  }
  return (
    <div>
      <StyleMonthButton
       onClick={handleClick}
       $active={month.replace("월","") === currentMonth}
       value={month.replace("월", "")} // 각 버튼이 str 형식으로 된 숫자를 갖게 됨
      >
        {month}
      </StyleMonthButton>
    </div>
  )
}

export default MonthButton