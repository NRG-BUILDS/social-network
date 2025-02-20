import { FiMessageCircle, FiMoreHorizontal, FiThumbsUp } from "react-icons/fi";
import { Avatar } from "./avatar";
import { Link } from "react-router";
import { Post } from "@/types/post";
import Container from "./container";

type Props = {
  post: Post;
};
export const PostCard = ({ post }: Props) => {
  return (
    <div className="md:border rounded bg-white">
      <Container className=" flex items-center justify-between">
        <Avatar
          variant={"lg"}
          img={post.author.avatar}
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
      <Link to={"/post/post-id"}>
        <Container className=" border-t hover:bg-neutral-100 cursor-pointer">
          <p
            className={`${
              post.images.length === 0 && post.content.length < 90
                ? "text-2xl"
                : ""
            }`}
          >
            {post.content}
          </p>
        </Container>
      </Link>
      {post.images.length > 0 && (
        <div className="div flex flex-wrap gap-0.5 w-full bg-brand-primary/10 h-40">
          {post.images.map((img) => (
            <img src={img} className="w-auto h-full object-cover" />
          ))}
        </div>
      )}
      <Container className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-neutral-500">
          <span className="text-sm text-neutral-400"></span>
          <FiMessageCircle />
          <span className="text-sm ">{post.commentsCount} Comments</span>
        </div>
        <div className="flex items-center gap-2 text-neutral-500">
          <span className="text-sm ">{post.likes} Likes</span>
          <FiThumbsUp />
        </div>
      </Container>
    </div>
  );
};
