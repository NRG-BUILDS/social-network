import { Avatar } from "@/components/avatar";
import Container from "@/components/container";
import { PostCard } from "@/components/post-card";
import { WriteComment } from "@/components/write-post";
import { FiArrowLeft } from "react-icons/fi";
import { LuDot } from "react-icons/lu";

const post = {
  id: "post_002",
  author: {
    id: "user_002",
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=2",
  },
  content: "Check out these amazing photos from my trip!",
  images: ["https://example.com/image1.jpg", "https://example.com/image2.jpg"],
  likes: 40,
  commentsCount: 15,
  createdAt: "2025-02-15T14:30:00Z",
};

const comments = {
  postId: "12345",
  comments: [
    {
      id: "cmt_001",
      author: {
        id: "user_001",
        name: "John Doe",
        avatar: "https://example.com/avatar1.jpg",
      },
      content: "This is a great post!",
      likes: 12,
      replies: [
        {
          id: "reply_001",
          author: {
            id: "user_002",
            name: "Jane Smith",
            avatar: "https://example.com/avatar2.jpg",
          },
          content: "I totally agree!",
          likes: 5,
        },
      ],
    },
    {
      id: "cmt_002",
      author: {
        id: "user_003",
        name: "Mike Johnson",
        avatar: "https://example.com/avatar3.jpg",
      },
      content: "I have a different perspective on this.",
      likes: 8,
      replies: [],
    },
    {
      id: "cmt_002",
      author: {
        id: "user_003",
        name: "Mike Johnson",
        avatar: "https://example.com/avatar3.jpg",
      },
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, excepturi omnis delectus saepe, obcaecati ipsam doloribus nam culpa sint beatae ex nisi minima odio ipsa enim tenetur neque non quod.",
      likes: 8,
      replies: [],
    },
  ],
};

const Post = () => {
  return (
    <main>
      <div className="bg-white p-5">
        <h1 className="font-semibold text-xl text-neutral-800 flex items-center gap-2">
          <FiArrowLeft />
          <span>Post</span>
        </h1>
      </div>
      <PostCard post={post} />
      <WriteComment />
      <Container className="space-y-2">
        {comments.comments.map((comment) => (
          <div className="flex gap-2 items-start">
            <div key={comment.id}>
              <Avatar variant={"sm"} />
            </div>
            <div>
              <div className="p-4 bg-brand-primary/15 rounded-2xl">
                <h3 className="font-medium">{comment.author.name}</h3>
                <p>{comment.content}</p>
              </div>
              <div className="p-1 text-sm text-neutral-500 flex items-center gap-1">
                <span>{comment.likes} Likes</span>
                <LuDot />
                <span>{comment.replies.length} Replies</span>
              </div>
            </div>
          </div>
        ))}
      </Container>
    </main>
  );
};

export default Post;
