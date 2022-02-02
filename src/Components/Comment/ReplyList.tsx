import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IComment, IPost, IReply } from "../../Interface";

const ReplyBox = styled.li`
  margin-left: 5%;
  width: 95%;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 4px;
  min-height: 65px;
  padding: 20px 30px;
  word-wrap: break-word;
`;

const ReplyOwner = styled.div`
  font-size: 1.1rem;
`;

const Reply = styled.div`
  margin: 15px 0;
  line-height: 1.1rem;
`;

const ReplyInfoBox = styled.div`
  display: flex;
  color: #8b8b8b;
  font-size: 0.8rem;
`;

const ReplyInfoDate = styled.div``;

interface IReplyList {
  commentId: string;
  replyArr: IReply[];
}

function ReplyList({ commentId, replyArr }: IReplyList) {
  return (
    <div>
      {replyArr.map((reply, index) => (
        <ReplyBox key={index}>
          <ReplyOwner>{reply.owner}</ReplyOwner>
          <Reply>{reply.reply}</Reply>
          <ReplyInfoBox>
            <ReplyInfoDate>{reply.date}</ReplyInfoDate>
          </ReplyInfoBox>
        </ReplyBox>
      ))}
    </div>
  );
}

export default ReplyList;
