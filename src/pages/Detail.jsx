import React, { useContext, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import AddButton from "../components/AddButton";
import { useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
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
  const { deleteMutation, editMutation } = useContext(AuthContext);

  const details = list.find((item) => item.id === id);

  const itemRef = useRef();
  const priceRef = useRef();
  const detailRef = useRef();
  const dateRef = useRef();

  const updateItem = (e) => {
    e.preventDefault();

    // const editList = list.map((item) =>
    //   item.id === id
    //     ? {
    //         ...item,
    // item: itemRef.current.value,
    // price: Number(priceRef.current.value),
    // detail: detailRef.current.value,
    // date: dateRef.current.value,
    //       }
    //     : item
    // );

    const newEditItem = {
      id,
      item: itemRef.current.value,
      price: Number(priceRef.current.value),
      detail: detailRef.current.value,
      date: dateRef.current.value,
    };

    editMutation.mutate(newEditItem);
    navigate("/");
  };

  const deleteItem = () => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        const removeList = list.filter((item) => item.id !== id);
        setList(removeList);
        navigate("/");
      },
    });
  };

  const back = () => {
    return navigate("/");
  };

  return (
    <DetailContainer>
      <StyledForm onSubmit={updateItem}>
        <h3>상세 페이지</h3>
        날짜 :<StyledInput defaultValue={details?.date} ref={dateRef} />
        항목 :<StyledInput defaultValue={details?.item} ref={itemRef} />
        가격 :
        <StyledInput
          defaultValue={details?.price.toLocaleString()}
          원
          ref={priceRef}
        />
        내용 :<StyledInput defaultValue={details?.detail} ref={detailRef} />
        <ButtonContainer>
          <AddButton type="submit">수정</AddButton>
          <AddButton type="button" onClick={deleteItem}>
            삭제
          </AddButton>
          <AddButton type="button" onClick={back}>
            뒤로 가기
          </AddButton>
        </ButtonContainer>
      </StyledForm>
    </DetailContainer>
  );
};

export default Detail;
