import React, { useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
const DetailContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

const StyledForm = styled.form`
  background-color: #cae6fb;
  width: 50%;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 400px;
`;

const StyledInput = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 10px;
`;
const Detail = ({ list, setList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const details = list.find((item) => item.id === id);

  const itemRef = useRef();
  const priceRef = useRef();
  const detailRef = useRef();
  const dateRef = useRef();

  const update = (e) => {
    e.preventDefault();

    const editList = list.map((item) =>
      item.id === id
        ? {
            ...item,
            item: itemRef.current.value,
            price: priceRef.current.value,
            detail: detailRef.current.value,
            date: dateRef.current.value,
          }
        : item
    );

    setList(editList);
    navigate("/");

  };

  return (
    <DetailContainer>
      {/* {list && ( */}
      <StyledForm onSubmit={update}>
        <h3>상세 페이지</h3>
        날짜 :<StyledInput defaultValue={details?.date} ref={dateRef} />
        항목 :<StyledInput defaultValue={details?.item} ref={itemRef} />
        가격 :<StyledInput defaultValue={details?.price.toLocaleString()}원 ref={priceRef} />
        내용 :<StyledInput defaultValue={details?.detail} ref={detailRef} />
        <ButtonContainer>
          <AddButton type="submit">수정</AddButton>
          <AddButton>삭제</AddButton>
        </ButtonContainer>
      </StyledForm>
      {/* )} */}
    </DetailContainer>
  );
};

export default Detail;
