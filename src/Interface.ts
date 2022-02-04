export interface IPost {
  no?: number;
  category: string;
  title: string;
  content: string;
  file?: File;
  name?: string;
  views?: number;
  createdAt?: string;
  postId?: string;
}

export interface IComment {
  comment?: string;
  owner?: string;
  createdAt?: string;
  commentId?: string;
  postId?: string;
}

export interface IReply {
  reply: string;
  replyId?: string;
  createdAt?: string;
  commentId: string;
  owner?: string;
}

export interface IUser {
  email: string;
  name: string;
  password: string;
  passwordConfirm?: string;
  userId: string;
  username: string;
  createdAt: string;
}
