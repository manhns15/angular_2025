export interface CommentUser {
  id: number;
  username: string;
}

export interface Comment {
  id: number;
  body: string;
  postId: number;
  user: CommentUser;
}
