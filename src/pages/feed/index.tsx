import { PostCard } from "@/components/post-card";
import WritePostCard from "@/components/write-post";

const response = {
  posts: [
    {
      id: "post_001",
      author: {
        id: "user_001",
        name: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      content: "This is a text-only post.",
      images: [],
      likes: 25,
      commentsCount: 10,
      createdAt: "2025-02-15T12:00:00Z",
    },
    {
      id: "post_002",
      author: {
        id: "user_002",
        name: "Jane Smith",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      content: "Check out these amazing photos from my trip!",
      images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      likes: 40,
      commentsCount: 15,
      createdAt: "2025-02-15T14:30:00Z",
    },
    {
      id: "post_003",
      author: {
        id: "user_003",
        name: "Michael Johnson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      content: "Does anyone have recommendations for good books on AI?",
      images: [],
      likes: 18,
      commentsCount: 7,
      createdAt: "2025-02-15T15:45:00Z",
    },
    {
      id: "post_004",
      author: {
        id: "user_004",
        name: "Emily Davis",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      content: "Here's my latest artwork!",
      images: ["https://example.com/artwork.jpg"],
      likes: 32,
      commentsCount: 12,
      createdAt: "2025-02-15T16:20:00Z",
    },
    {
      id: "post_005",
      author: {
        id: "user_005",
        name: "David Lee",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
      content: "A beautiful sunset I captured yesterday 🌅",
      images: ["https://example.com/sunset.jpg"],
      likes: 50,
      commentsCount: 20,
      createdAt: "2025-02-15T18:10:00Z",
    },
  ],
};

const Feed = () => {
  return (
    <section>
      <WritePostCard />
      <div className="space-y-4 my-4">
        {response.posts.map((post, i) => (
          <PostCard key={i} post={post} />
        ))}
      </div>
    </section>
  );
};

export default Feed;
