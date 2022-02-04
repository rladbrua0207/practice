export interface IPost {
  no?: number;
  category: string;
  title: string;
  content: string;
  file?: File;
  owner?: string;
  views?: number;
  createdAt?: string;
  postId?: string;
  ownerId?: string;
}

export interface IComment {
  comment?: string;
  owner?: string;
  createdAt?: string;
  commentId?: string;
  postId?: string;
  ownerId?: string;
}

export interface IReply {
  reply: string;
  replyId?: string;
  createdAt?: string;
  commentId: string;
  owner?: string;
  ownerId?: string;
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

export interface ILoggedInUser {
  email: string;
  name: string;
  userId: string;
  username: string;
  isLoggedIn: boolean;
}
