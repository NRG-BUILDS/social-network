import { LoadingScreen } from "@/components/loader";
import { PostCard } from "@/components/post-card";
import WritePostCard from "@/components/write-post";
import useRequest from "@/hooks/useRequest";
import { useEffect } from "react";

// type DataType = {
//   page: number;
//   itemsCount: number;
//   totalPages: number;
//   itemsPerPage: number;
//   posts: PostType[];
// };

type PostType = {
  author: AuthorType;
  text: string;
  slug: string;
  imageUrl: string | null;
  reactionsCount: number;
  commentsCount: number;
  createdAt: string;
  updatedAt: string;
};

type AuthorType = {
  name: string;
  username: string;
  avatarUrl: string | null;
};

const Feed = () => {
  const { data, loading, error, makeRequest } = useRequest("/feed/posts");
  useEffect(() => {
    makeRequest();
  }, []);
  return (
    <section>
      <WritePostCard />
      {(loading || error) && <LoadingScreen loading={loading} error={error} />}
      {data && (
        <div className="space-y-4 my-4">
          {data.data.posts.map((post: PostType, i: number) => (
            <PostCard key={i} post={post} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Feed;
