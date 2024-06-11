import styled from 'styled-components'

const HeaderForm = styled.form `
    background-color: #cae6fb;
    display: flex;
    justify-content: start;
    align-items: center;
    width: 80%;
    margin: 0% auto 0% auto;
    padding: 30px;
    box-shadow: 0 5px 5px rgba(0,0,0,0.1);

    & > div {
        margin-right: 15px;
    }

    input[type="text"] {
        margin-right: 10px;
        border: 1px solid black;
        border-radius: 5px;
    }

    span {
        margin-right: 5px;
    }

`;

export default HeaderForm;