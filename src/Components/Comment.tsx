import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IComment, IPost } from "../Interface";
import CommentList from "./Comment/CommentList";
import CommentWrite from "./Comment/CommentWrite";

const CommentListContainer = styled.ul`
  margin-top: 10px;
`;

function Comment() {
  const allComments: IComment[] = JSON.parse(
    localStorage.getItem("comment") as string
  );
  const postState = useLocation().state as IPost;

  const thisComments = allComments?.filter(
    (comment) => comment.postId === postState.postId
  );

  const [commentArr, setCommentArr] = useState(
    thisComments ? [...thisComments] : []
  );
  const [isAddComment, setIsAddComment] = useState(false);

  useEffect(() => {
    (async () => {
      setCommentArr([...thisComments]);
      setIsAddComment(false);
    })();
  }, [isAddComment]);

  return (
    <>
      <CommentWrite isAddComment={setIsAddComment}></CommentWrite>
      <CommentListContainer>
        {commentArr?.map((comment, index) => (
          <CommentList
            key={index}
            owner={comment.owner}
            comment={comment.comment}
            date={comment.date}
            commentId={comment.commentId}
          ></CommentList>
        ))}
      </CommentListContainer>
    </>
  );
}

export default Comment;
