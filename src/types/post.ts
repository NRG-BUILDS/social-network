export interface Post {
  author: AuthorType;
  text: string;
  slug: string;
  imageUrl: string | null;
  reactionsCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
}

type AuthorType = {
  name: string;
  username: string;
  avatarUrl: string | null;
};

export type CommentType = {
  author: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  slug: string;
  text: string;
  reactionsCount: number;
  createdAt: string;
  updatedAt: string;
  repliesCount: number;
};
