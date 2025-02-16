import { User } from "./user";

export interface Post {
  id: string;
  author: User;
  content: string;
  images: string[];
  likes: number;
  commentsCount: number;
  createdAt: string;
}
