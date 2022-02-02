export interface IPost {
  no?: number;
  category: string;
  title: string;
  content: string;
  file?: File;
  name?: string;
  views?: number;
  date?: string;
  postId?: string;
}

export interface IComment {
  comment?: string;
  owner?: string;
  date?: string;
  commentId?: string;
  postId?: string;
}

export interface IReply {
  reply: string;
  replyId?: string;
  date?: string;
  commentId: string;
  owner?: string;
}
