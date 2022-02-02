import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IComments, IPosts } from "../Interface";
import CommentList from "./CommentList";

const Container = styled.div`
  min-width: 700px;
  margin-top: 20px;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.bgColor};
`;

const Textarea = styled.textarea`
  width: 90%;
  margin: 0 auto;
  resize: none;
  font-size: 1.2rem;
  margin-top: 10px;
  padding: 10px 5px;
  min-height: 20px;
  border-radius: 5px;
  background-color: #f7f7f7;
  border: 1px solid ${(props) => props.theme.borderColor};
`;

const Owner = styled.div`
  margin-left: 5%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  border: 2px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  min-height: 90px;
  padding: 20px 10px 10px 10px;
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
  margin-right: 4%;
  &:hover {
    cursor: pointer;
  }
`;

function CommentWrite() {
  const { register, handleSubmit, reset } = useForm();

  const postState = useLocation().state as IPosts;
  console.log(postState);

  const onValid = (newComment: any) => {
    if (!window.confirm(`댓글을 작성하시겠습니까?`)) {
      return;
    }
    console.log(newComment);
    const now = new Date();
    const currentTime = {
      year: now.getFullYear(),
      month: String(now.getMonth() + 1).padStart(2, "0"),
      date: String(now.getDate()).padStart(2, "0"),
      hour: String(now.getHours()).padStart(2, "0"),
      minute: String(now.getMinutes()).padStart(2, "0"),
    };

    newComment.commentId = String(Date.now());
    newComment.postId = postState.postId;
    newComment.owner = `loggedInUser`;
    newComment.date = `${currentTime.year}.${currentTime.month}.${currentTime.date}. ${currentTime.hour}:${currentTime.minute}`;

    const comments =
      JSON.parse(localStorage.getItem("comment") as string) || [];

    localStorage.setItem("comment", JSON.stringify([...comments, newComment]));

    reset();
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onValid)}>
        <Owner>댓글 주인 이름</Owner>
        <Textarea
          rows={3}
          placeholder="댓글을 남겨보세요"
          {...register("comment", {
            required: "댓글을 한 글자 이상 적어 주세요.",
          })}
        ></Textarea>
        <BtnWrapper>
          <Btn>등록</Btn>
        </BtnWrapper>
      </Form>
      <CommentList></CommentList>
    </Container>
  );
}

export default CommentWrite;
