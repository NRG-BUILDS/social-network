import { Avatar } from "@/components/avatar";
import { BackButton } from "@/components/back-button";
import Container from "@/components/container";
import { PostCard } from "@/components/post-card";
import { WriteComment } from "@/components/write-post";
import useRequest from "@/hooks/useRequest";
import { CommentType, type Post } from "@/types/post";
import { LucideLoader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FiArrowLeft, FiMessageSquare } from "react-icons/fi";
import { LuDot } from "react-icons/lu";
import { useParams } from "react-router";

const Post = () => {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);
  const { slug } = useParams();
  const { data, loading, error, makeRequest } = useRequest(
    `/feed/posts/${slug}`
  );
  const {
    data: commentRes,
    loading: commentLoad,
    error: commentError,
    makeRequest: makeCommentRequest,
  } = useRequest(`/feed/posts/${slug}/comments`);
  const { makeRequest: makeCommentPost } = useRequest(
    `/feed/posts/${slug}/comments`
  );

  useEffect(() => {
    makeRequest();
    makeCommentRequest();
  }, []);
  useEffect(() => {
    if (commentRes) {
      setComments([...commentRes.data.comments]);
    }
  }, [commentRes]);

  useEffect(() => {
    if (!data) {
      makeRequest();
    } else {
      setPost({ ...data.data });
    }
  }, [data]);

  const addComment = async (comment: string) => {
    if (!comment.trim()) {
      return;
    }
    const res = await makeCommentPost({ text: comment }, "POST");
    if (res.status === "success") {
      setComments([res.data, ...comments]);
    }
  };

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
        <WriteComment onCommentClick={addComment} loading={commentLoad} />
        <CommentSection
          comments={comments}
          loading={commentLoad}
          error={commentError}
        />
      </main>
    );
  }
};

export default Post;

type Props = {
  comments: CommentType[] | null;
  loading: boolean;
  error: Error | null;
};
export const CommentSection = ({ comments, loading, error }: Props) => {
  if (!comments && (loading || error)) {
    return (
      <div className="flex items-center justify-center w-full py-5">
        <LucideLoader2 className="animate-spin text-brand-primary" />
      </div>
    );
  }
  if (comments?.length === 0) {
    return (
      <div className="flex items-center justify-center w-full py-5">
        <div className="space-y-2 text-neutral-400">
          <FiMessageSquare size={62} className="mx-auto" />
          <p className=" font-medium">
            No comments on this post...<b> yet.</b>
          </p>
        </div>
      </div>
    );
  }
  if (comments && comments?.length !== 0) {
    return (
      <div>
        <Container className="space-y-2">
          {comments.map((comment) => (
            <div key={comment.slug} className="flex gap-2 items-start">
              <div className="text-sm">
                <Avatar variant={"sm"} />
              </div>
              <div>
                <div className="p-4 bg-brand-primary/15 rounded-2xl">
                  <h3 className="font-medium mb-1 text-sm opacity-70">
                    {comment.author.name}
                  </h3>
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
