export interface Post {
  id: number;
  title: string;
  body: string;
  tag: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}
export interface FeedPagination {
  page: number;
  pageSize: number;
  total: number;
}
