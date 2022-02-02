import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IComments, IPosts } from "../Interface";

const Container = styled.ul`
  margin-top: 10px;
`;

const CommentBox = styled.li`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  min-height: 65px;
  padding: 20px 30px;
  word-wrap: break-word;
`;

const CommentOwner = styled.div`
  font-size: 1.1rem;
`;

const Comment = styled.div`
  margin: 15px 0;
  line-height: 1.1rem;
`;

const CommentInfoBox = styled.div`
  display: flex;
  color: #8b8b8b;
  font-size: 0.8rem;
`;

const CommentInfoDate = styled.div``;

const CommentReply = styled.div`
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

function CommentList() {
  const allComments: IComments[] = JSON.parse(
    localStorage.getItem("comment") as string
  );

  const postState = useLocation().state as IPosts;

  const thisComments = allComments.filter(
    (comment) => comment.postId === postState.postId
  );

  const handleReply = () => {};

  return (
    <Container>
      {thisComments.map((comment, index) => (
        <CommentBox key={index}>
          <CommentOwner>{comment.owner}</CommentOwner>
          <Comment>{comment.comment}</Comment>
          <CommentInfoBox>
            <CommentInfoDate>{comment.date}</CommentInfoDate>
            <CommentReply onClick={handleReply}>답글쓰기</CommentReply>
          </CommentInfoBox>
        </CommentBox>
      ))}
    </Container>
  );
}

export default CommentList;
