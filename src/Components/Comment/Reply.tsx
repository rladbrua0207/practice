import { useEffect, useState } from "react";
import { IReply } from "../../Interface";
import ReplyList from "./ReplyList";
import ReplyWrite from "./ReplyWrite";

interface IReplyPage {
  commentId: string;
  replyClicked: boolean;
  setReplyClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteComment: boolean;
  isDeleteReply: boolean;
  setIsDeleteReply: React.Dispatch<React.SetStateAction<boolean>>;
}

function Reply({
  commentId,
  replyClicked,
  setReplyClicked,
  isDeleteComment,
  isDeleteReply,
  setIsDeleteReply,
}: IReplyPage) {
  let allReply: IReply[] = JSON.parse(localStorage.getItem("reply") as string);

  let thisReplies = allReply?.filter((reply) => reply.commentId === commentId);
  console.log(commentId, thisReplies);

  const [isAddReply, setIsAddReply] = useState(false);
  const [replyArr, setReplyArr] = useState(thisReplies ? thisReplies : []);

  useEffect(() => {
    (async () => {
      setReplyArr(thisReplies);
      setIsAddReply(false);
      setReplyClicked(false);
      setIsDeleteReply(false);
    })();
  }, [isAddReply, isDeleteReply, isDeleteComment]);

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
