import React, { useState } from 'react'

const DateInput = ({date, setDate}) => {

  return (
    <div>
      날짜: <input 
      type='text'
      value={date}
      placeholder='YYYY-MM-DD'
      onChange={(e) => {
        setDate(e.target.value);
      }}
      >
      </input>
    </div>
  )
}

export default DateInput;