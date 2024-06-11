import styled from 'styled-components';
import MonthButton from './MonthButton';

const StyleMonthForm = styled.div `
    background-color: #cae6fb;
    padding: 40px;
    width: 78.5%;
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);
    margin: 30px auto 30px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    `
const months = [
    "1월", "2월", "3월", "4월",
    "5월", "6월", "7월", "8월",
    "9월", "10월", "11월", "12월"
];

console.log(months);

const MonthForm = ({currentMonth ,setCurrentMonth}) => {
    return (
        <StyleMonthForm>
            {months.map((month) => (
                <MonthButton
                key={month} 
                month={month}
                currentMonth={currentMonth}
                setCurrentMonth={setCurrentMonth}
                >{month}</MonthButton>
            ))}
        </StyleMonthForm>
    );
};
export default MonthForm;