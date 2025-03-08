import { FiMessageCircle, FiMoreHorizontal, FiThumbsUp } from "react-icons/fi";
import { Avatar } from "./avatar";
import { Link } from "react-router";
import { Post } from "@/types/post";
import Container from "./container";
import { ReactNode, useState } from "react";
import { friendlyTime } from "@/lib/helperFunctions";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import useRequest from "@/hooks/useRequest";
import { LucideLoader2 } from "lucide-react";

type Props = {
  post: Post;
  unClickable?: boolean;
};
export const PostCard = ({ post, unClickable = false }: Props) => {
  return (
    <div className="md:border rounded bg-white">
      <Container className="text-sm md:text-base flex items-center justify-between">
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
            {friendlyTime(post.createdAt)}
          </span>
        </div>
      </Container>
      <Link to={unClickable ? "#" : `/post/${post.slug}`}>
        <Container className=" border-t hover:bg-neutral-50 cursor-pointer">
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
        <ReactionButton slug={post.slug}>
          {
            <div className="flex items-center gap-2 text-neutral-500 hover:text-blue-400 transition-all">
              <span className="text-sm ">{post.reactionsCount} Reactions</span>
              <FiThumbsUp />
            </div>
          }
        </ReactionButton>
      </Container>
    </div>
  );
};

interface ReactionButtonProps {
  children: ReactNode;
  slug: string;
}
export const ReactionButton = ({ children, slug }: ReactionButtonProps) => {
  const [openTray, setOpenTray] = useState(false);
  const { loading, makeRequest } = useRequest(`/feed/reactions/${slug}`);

  const addReaction = async (
    rType: "LOVE" | "WOW" | "ANGRY" | "HAHA" | "LIKE" | "SAD"
  ) => {
    setOpenTray(false);
    const res = await makeRequest({ rType: rType }, "POST");
    if (res.status === "success") {
    }
  };
  return (
    <Popover open={openTray} onOpenChange={setOpenTray}>
      <PopoverTrigger className="cursor-pointer">
        {!loading ? (
          children
        ) : (
          <span>
            <LucideLoader2 className="animate-spin text-brand-primary" />
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="rounded-full">
        <div className="flex gap-2 text-3xl *:hover:scale-200">
          <button onClick={() => addReaction("LIKE")}>👍</button>
          <button onClick={() => addReaction("LOVE")}>💖</button>
          <button onClick={() => addReaction("HAHA")}>😂</button>
          <button onClick={() => addReaction("WOW")}>😲</button>
          <button onClick={() => addReaction("SAD")}>😢</button>
          <button onClick={() => addReaction("ANGRY")}>😠</button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
