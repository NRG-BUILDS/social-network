import { Avatar } from "@/components/avatar";
import { BackButton } from "@/components/back-button";
import Container from "@/components/container";
import { PostCard } from "@/components/post-card";
import { WriteComment } from "@/components/write-post";
import useRequest from "@/hooks/useRequest";
import { CommentType, type Post } from "@/types/post";
import { LucideLoader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { LuDot } from "react-icons/lu";
import { useParams } from "react-router";

const Post = () => {
  const [post, setPost] = useState<Post | null>(null);
  const { slug } = useParams();
  const { data, loading, error, makeRequest } = useRequest(
    `/feed/posts/${slug}`
  );

  useEffect(() => {
    if (!data) {
      makeRequest();
    } else {
      setPost({ ...data.data });
    }
  }, [data]);

  if (loading || error) {
    return <div>Loading screen goes here...</div>;
  }
  if (post) {
    return (
      <main>
        <div className="bg-white p-5">
          <BackButton>
            <h1 className="font-semibold text-xl text-neutral-800 flex items-center gap-2">
              <FiArrowLeft />
              <span>Post</span>
            </h1>
          </BackButton>
        </div>
        <PostCard post={post} unClickable />
        <WriteComment />
        <CommentSection postSlug={slug || ""} />
      </main>
    );
  }
};

export default Post;

type Props = {
  postSlug: string;
};
export const CommentSection = ({ postSlug }: Props) => {
  const [comments, setComments] = useState<CommentType[] | null>(null);
  const { slug } = useParams();
  const { data, loading, error, makeRequest } = useRequest(
    `/feed/posts/${postSlug}/comments`
  );

  useEffect(() => {
    if (!data) {
      makeRequest();
    } else {
      setComments([...data.data.comments]);
    }
  }, [data]);

  if (loading || error) {
    return (
      <div className="flex items-center justify-center w-full py-5">
        <LucideLoader2 className="animate-spin text-brand-primary" />
      </div>
    );
  }
  if (comments?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full py-5">
        <p className="text-neutral-400 font-semibold">
          No comments on this post yet.
        </p>
      </div>
    );
  }
  if (comments && comments?.length !== 0) {
    return (
      <div>
        <Container className="space-y-2">
          {comments.map((comment) => (
            <div className="flex gap-2 items-start">
              <div key={comment.slug}>
                <Avatar variant={"sm"} />
              </div>
              <div>
                <div className="p-4 bg-brand-primary/15 rounded-2xl">
                  <h3 className="font-medium">{comment.author.name}</h3>
                  <p>{comment.text}</p>
                </div>
                <div className="p-1 text-sm text-neutral-500 flex items-center gap-1">
                  <span>{comment.reactionsCount} Likes</span>
                  <LuDot />
                  <span>{comment.repliesCount} Replies</span>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </div>
    );
  }
};
