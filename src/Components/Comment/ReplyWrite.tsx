import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  padding: 10px 60px 10px 0;
  background-color: ${(props) => props.theme.bgColor};
`;

const Form = styled.form`
  margin-left: 10%;
  width: 90%;
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  min-height: 90px;
  padding: 20px 0px 5px 5px;
`;

const Textarea = styled.textarea`
  width: 95%;
  margin: 0 auto;
  resize: none;
  font-size: 1.2rem;
  margin-top: 10px;
  padding: 10px 5px;
  min-height: 20px;
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

const Owner = styled.div`
  margin-left: 3%;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Btn = styled.button`
  width: 60px;
  height: 30px;
  border: none;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 1.1rem;
  padding: 5px;
  margin-right: 1%;
  background-color: ${(props) => props.theme.bgColor};

  &:hover {
    cursor: pointer;
  }
`;

interface ICommentReplyWritePage {
  commentId: string;
  setReplyClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAddReply: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReplyWrite({
  setReplyClicked,
  commentId,
  setIsAddReply,
}: ICommentReplyWritePage) {
  const { register, handleSubmit, reset } = useForm();

  const onValid = (newReply: any) => {
    if (!window.confirm(`댓글을 작성하시겠습니까?`)) {
      return;
    }
    const now = new Date();
    const currentTime = {
      year: now.getFullYear(),
      month: String(now.getMonth() + 1).padStart(2, "0"),
      date: String(now.getDate()).padStart(2, "0"),
      hour: String(now.getHours()).padStart(2, "0"),
      minute: String(now.getMinutes()).padStart(2, "0"),
    };

    newReply.replyId = String(Date.now());
    newReply.commentId = commentId;
    newReply.owner = `loggedInUser`;
    newReply.createdAt = `${currentTime.year}.${currentTime.month}.${currentTime.date}. ${currentTime.hour}:${currentTime.minute}`;

    const replies = JSON.parse(localStorage.getItem("reply") as string) || [];

    localStorage.setItem("reply", JSON.stringify([...replies, newReply]));

    setIsAddReply(true);

    reset();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <Owner>대댓글 주인 이름</Owner>
        <Textarea
          rows={3}
          placeholder="댓글을 남겨보세요"
          {...register("reply", {
            required: "댓글을 한 글자 이상 적어 주세요.",
          })}
        ></Textarea>
        <BtnWrapper>
          <Btn type={"button"} onClick={() => setReplyClicked(false)}>
            취소
          </Btn>
          <Btn>등록</Btn>
        </BtnWrapper>
      </Form>
    </Container>
  );
}

export default ReplyWrite;
