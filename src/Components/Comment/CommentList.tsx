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

function CommentList({ owner, comment, createdAt, commentId }: IComment) {
  const [replyClicked, setReplyClicked] = useState(false);
  const [loggedInUser, setloggedInUser] = useRecoilState(loggedInUserAtom);

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
