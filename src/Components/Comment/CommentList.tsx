import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInUserAtom } from "../../atoms";
import { IComment, IReply } from "../../Interface";
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
  commentObj: {
    comment?: string;
    owner?: string;
    createdAt?: string;
    commentId?: string;
    postId?: string;
    ownerId?: string;
  };
  setIsDeleteComment: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteComment: boolean;
}

function CommentList({
  commentObj,
  setIsDeleteComment,
  isDeleteComment,
}: IIsDeleteComment) {
  const [replyClicked, setReplyClicked] = useState(false);
  const [loggedInUser, setloggedInUser] = useRecoilState(loggedInUserAtom);
  const [isDeleteReply, setIsDeleteReply] = useState(false);
  const isOwner = loggedInUser.userId === commentObj.ownerId;

  const handleCommentDelete = () => {
    if (!window.confirm(`정말 댓글을 삭제하시겠습니까?`)) {
      return;
    }

    const handleReplyDelete = () => {
      let replies: IReply[] = JSON.parse(
        localStorage.getItem("reply") as string
      );
      replies = replies.filter(
        (reply) => reply.commentId !== commentObj.commentId
      );
      localStorage.setItem("reply", JSON.stringify(replies));
      setIsDeleteReply(true);
    };

    let comments: IComment[] = JSON.parse(
      localStorage.getItem("comment") as string
    );
    const commentIndex = comments.findIndex(
      (comment) => comment.commentId === commentObj.commentId
    );
    comments = [
      ...comments.slice(0, commentIndex),
      ...comments.slice(commentIndex + 1),
    ];
    localStorage.setItem("comment", JSON.stringify(comments));

    handleReplyDelete();
    setIsDeleteComment(true);
  };

  return (
    <div>
      <CommentBox>
        <CommentOwner>{commentObj.owner}</CommentOwner>
        <Comment>{commentObj.comment}</Comment>
        <CommentInfoBox>
          <CommentInfoDate>{commentObj.createdAt}</CommentInfoDate>
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
        commentId={commentObj.commentId ? commentObj.commentId : ""}
        replyClicked={replyClicked}
        setReplyClicked={setReplyClicked}
        isDeleteComment={isDeleteComment}
        isDeleteReply={isDeleteReply}
        setIsDeleteReply={setIsDeleteReply}
      ></Reply>
    </div>
  );
}

export default CommentList;
