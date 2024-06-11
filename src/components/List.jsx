import React from 'react';
import styled from 'styled-components'; 
import { Navigate, useNavigate } from 'react-router-dom';

const StyledListContainer = styled.div`
  background-color: #cae6fb;
  padding: 40px;
  width: 78.5%;

  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  margin: 30px auto 30px auto;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  border: 1px groove black;
  padding: 10px 10px;
  cursor: pointer;
`;

const ItemHeader = styled.div`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 5px;
`;

const ItemDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const List = ({ filteredList }) => {
  const navigate = useNavigate();

  return (
    <StyledListContainer>
      <StyledList>
        {filteredList.map(filter => (
          <ListItem key={filter.id} 
          onClick={() => {
            navigate(`/detail/${filter.id}`)
          }}>
            <ItemHeader>{filter.date}</ItemHeader>
            <ItemDetails>
              <span>{filter.item} - {filter.detail}</span>
              <span>{filter.price.toLocaleString()}원</span>
            </ItemDetails>
          </ListItem>
        ))}
      </StyledList>
    </StyledListContainer>
  );
};

export default List;
