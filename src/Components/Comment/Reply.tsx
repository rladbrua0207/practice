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
  const [replyArr, setReplyArr] = useState(thisReplies ? thisReplies : []);
  const [isDeleteReply, setIsDeleteReply] = useState(false);

  useEffect(() => {
    (async () => {
      setReplyArr(thisReplies);
      setIsAddReply(false);
      setReplyClicked(false);
      setIsDeleteReply(false);
    })();
  }, [isAddReply, isDeleteReply]);

  return (
    <div>
      {replyClicked ? (
        <ReplyWrite
          setReplyClicked={setReplyClicked}
          commentId={commentId}
          setIsAddReply={setIsAddReply}
        ></ReplyWrite>
      ) : (
        <></>
      )}
      {replyArr?.map((reply, index) => (
        <ReplyList
          key={index}
          replyObject={reply}
          setIsDeleteReply={setIsDeleteReply}
        ></ReplyList>
      ))}
    </div>
  );
}

export default Reply;
