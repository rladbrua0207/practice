import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInUserAtom } from "../../atoms";

import { IComment, IPost } from "../../Interface";
import CommentList from "./CommentList";
import CommentWrite from "./CommentWrite";

const CommentListContainer = styled.ul`
  margin-top: 10px;
`;

function Comment() {
  const loggedInUser = useRecoilValue(loggedInUserAtom);
  const postState = useLocation().state as IPost;
  const allComments: IComment[] = JSON.parse(
    localStorage.getItem("comment") as string
  );

  const thisComments = allComments?.filter(
    (comment) => comment.postId === postState.postId
  );

  const [commentArr, setCommentArr] = useState(
    thisComments ? thisComments : []
  );
  const [isAddComment, setIsAddComment] = useState(false);
  const [isDeleteComment, setIsDeleteComment] = useState(false);

  useEffect(() => {
    (async () => {
      setCommentArr(thisComments);
      setIsAddComment(false);
      setIsDeleteComment(false);
    })();
  }, [isAddComment, isDeleteComment]);

  return (
    <>
      {loggedInUser.isLoggedIn ? (
        <CommentWrite isAddComment={setIsAddComment}></CommentWrite>
      ) : (
        <></>
      )}

      <CommentListContainer>
        {commentArr?.map((comment, index) => (
          <CommentList
            key={index}
            owner={comment.owner}
            ownerId={comment.ownerId}
            comment={comment.comment}
            createdAt={comment.createdAt}
            commentId={comment.commentId}
            isDeleteComment={setIsDeleteComment}
          ></CommentList>
        ))}
      </CommentListContainer>
    </>
  );
}

export default Comment;
