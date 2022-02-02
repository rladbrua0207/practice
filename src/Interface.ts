export interface IPosts {
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

export interface IComments {
  comment: string;
  owner?: string;
  date?: string;
  commentId?: string;
  postId?: string;
}
