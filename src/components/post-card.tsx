import { FiMessageCircle, FiMoreHorizontal, FiThumbsUp } from "react-icons/fi";
import { Avatar } from "./avatar";
import { Link } from "react-router";
import { Post } from "@/types/post";
import Container from "./container";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { ReactNode } from "react";

type Props = {
  post: Post;
  unClickable?: boolean;
};
export const PostCard = ({ post, unClickable = false }: Props) => {
  return (
    <div className="md:border rounded bg-white">
      <Container className=" flex items-center justify-between">
        <Avatar
          img={post.author.avatarUrl}
          name={post.author.name}
          role={"Software Engineer"}
        />
        <div className="text-right flex flex-col items-end">
          <button>
            <FiMoreHorizontal />
          </button>
          <span className="text-neutral-500 whitespace-nowrap hidden md:block">
            7 hours ago
          </span>
        </div>
      </Container>
      <Link to={unClickable ? "#" : `/post/${post.slug}`}>
        <Container className=" border-t hover:bg-neutral-100 cursor-pointer">
          <p
            className={`${
              !post.imageUrl && post.text.length < 90 ? "text-2xl" : ""
            }`}
          >
            {post.text}
          </p>
        </Container>
      </Link>
      {post.imageUrl && (
        <div className="div flex flex-wrap gap-0.5 w-full bg-brand-primary/10 h-40">
          <img src={post.imageUrl} className="w-auto h-full object-cover" />
        </div>
      )}
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-500">
          <span className="text-sm text-neutral-400"></span>
          <FiMessageCircle />
          <span className="text-sm ">{post.commentsCount} Comments</span>
        </div>
        <ReactionButton>
          <div className="flex items-center gap-2 text-neutral-500">
            <span className="text-sm ">{post.reactionsCount} Reactions</span>
            <FiThumbsUp />
          </div>
        </ReactionButton>
      </Container>
    </div>
  );
};

interface ReactionButtonProps {
  children: ReactNode;
}
export const ReactionButton = ({ children }: ReactionButtonProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger>{children}</HoverCardTrigger>
      <HoverCardContent className="rounded-full">
        <div className="flex gap-2">
          <div className="rounded-full size-10 bg-brand-primary" />
          <div className="rounded-full size-10 bg-brand-primary" />
          <div className="rounded-full size-10 bg-brand-primary" />
          <div className="rounded-full size-10 bg-brand-primary" />
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
