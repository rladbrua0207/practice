import { useEffect, useState } from "react";
import { IReply } from "../../Interface";
import ReplyList from "./ReplyList";
import ReplyWrite from "./ReplyWrite";

interface IReplyPage {
  commentId: string;
  replyClicked: boolean;
  setReplyClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

function Reply({ commentId, replyClicked, setReplyClicked }: IReplyPage) {
  const allReply: IReply[] = JSON.parse(
    localStorage.getItem("reply") as string
  );

  const thisReplies = allReply?.filter(
    (reply) => reply.commentId === commentId
  );

  const [isAddReply, setIsAddReply] = useState(false);
  const [replyArr, setReplyArr] = useState(thisReplies ? [...thisReplies] : []);

  useEffect(() => {
    (async () => {
      setReplyArr([...thisReplies]);
      setIsAddReply(false);
      setReplyClicked(false);
    })();
  }, [isAddReply]);

  return (
    <div>
      {replyClicked ? (
        <ReplyWrite
          setReplyClicked={setReplyClicked}
          commentId={commentId}
          setIsAddReply={setIsAddReply}
        ></ReplyWrite>
      ) : (
        <div></div>
      )}
      <ReplyList commentId={commentId} replyArr={replyArr}></ReplyList>
    </div>
  );
}

export default Reply;
