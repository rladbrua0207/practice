import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { loggedInUserAtom } from "../../atoms";
import { IComment } from "../../Interface";
import Reply from "./Reply";

const CommentBox = styled.li`
  width: 700px;
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

const CommentReplyBtn = styled.div`
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

const CommentDeleteBtn = styled.div`
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

interface IIsDeleteComment {
  comment?: string;
  owner?: string;
  createdAt?: string;
  commentId?: string;
  postId?: string;
  ownerId?: string;
  isDeleteComment: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentList({
  owner,
  comment,
  createdAt,
  commentId,
  ownerId,
  isDeleteComment,
}: IIsDeleteComment) {
  const [replyClicked, setReplyClicked] = useState(false);
  const [loggedInUser, setloggedInUser] = useRecoilState(loggedInUserAtom);
  const isOwner = loggedInUser.userId === ownerId;

  const handleCommentDelete = () => {
    if (!window.confirm(`정말 댓글을 삭제하시겠습니까?`)) {
      return;
    }

    let comments: IComment[] = JSON.parse(
      localStorage.getItem("comment") as string
    );
    const commentIndex = comments.findIndex(
      (comment) => comment.commentId === commentId
    );
    comments = [
      ...comments.slice(0, commentIndex),
      ...comments.slice(commentIndex + 1),
    ];
    localStorage.setItem("comment", JSON.stringify(comments));

    isDeleteComment(true);
  };

  return (
    <div>
      <CommentBox>
        <CommentOwner>{owner}</CommentOwner>
        <Comment>{comment}</Comment>
        <CommentInfoBox>
          <CommentInfoDate>{createdAt}</CommentInfoDate>
          {loggedInUser.isLoggedIn ? (
            <CommentReplyBtn onClick={() => setReplyClicked(true)}>
              답글작성
            </CommentReplyBtn>
          ) : (
            <></>
          )}
          {isOwner ? (
            <CommentDeleteBtn onClick={handleCommentDelete}>
              댓글삭제
            </CommentDeleteBtn>
          ) : (
            <></>
          )}
        </CommentInfoBox>
      </CommentBox>
      <Reply
        commentId={commentId ? commentId : ""}
        replyClicked={replyClicked}
        setReplyClicked={setReplyClicked}
      ></Reply>
    </div>
  );
}

export default CommentList;
