import { useRecoilState } from "recoil";
import styled from "styled-components";
import { loggedInUserAtom } from "../../atoms";
import { IReply } from "../../Interface";

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

const CommentDeleteBtn = styled.div`
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

interface IReplyList {
  replyObject: IReply;
  setIsDeleteReply: React.Dispatch<React.SetStateAction<boolean>>;
}

function ReplyList({ replyObject, setIsDeleteReply }: IReplyList) {
  console.log(replyObject);

  const [loggedInUser, setloggedInUser] = useRecoilState(loggedInUserAtom);
  const isOwner = loggedInUser.userId === replyObject.ownerId;
  const handleReplyDelete = () => {
    if (!window.confirm(`정말 댓글을 삭제하시겠습니까?`)) {
      return;
    }
    let replies: IReply[] = JSON.parse(localStorage.getItem("reply") as string);

    const replyIndex = replies.findIndex(
      (reply) => reply.replyId === replyObject.replyId
    );
    replies = [
      ...replies.slice(0, replyIndex),
      ...replies.slice(replyIndex + 1),
    ];
    localStorage.setItem("reply", JSON.stringify(replies));
    setIsDeleteReply(true);
  };

  return (
    <div>
      <ReplyBox>
        <ReplyOwner>{replyObject.owner}</ReplyOwner>
        <Reply>{replyObject.reply}</Reply>
        <ReplyInfoBox>
          <ReplyInfoDate>{replyObject.createdAt}</ReplyInfoDate>
          {isOwner ? (
            <CommentDeleteBtn onClick={handleReplyDelete}>
              답글삭제
            </CommentDeleteBtn>
          ) : (
            <></>
          )}
        </ReplyInfoBox>
      </ReplyBox>
    </div>
  );
}

export default ReplyList;
