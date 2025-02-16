import { Avatar } from "./avatar";
import { Button } from "./ui/button";
import { FiImage } from "react-icons/fi";

// interface PostCardProps {
//   size?: "full" | "small";
// }
const WritePostCard = () => {
  return (
    <div className="bg-white border rounded p-5 px-6">
      <div className="py-3 flex items-start gap-4">
        <div className="rounded-full min-w-10 size-10 mt-3 bg-gray-400"></div>
        <div className="w-full">
          <input
            type="text"
            placeholder="What's on your mind?"
            className="w-full border-b outline-0 focus:border-brand-primary transition py-5"
          />
          <div className="py-5 flex justify-between">
            <Button variant={"ghost"} className="px-0">
              <FiImage />
              <span>Add Media</span>
            </Button>
            <Button>Post</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritePostCard;
export const WriteComment = () => {
  return (
    <div className="bg-white p-5 py-3 px-6">
      <div className="py-3 flex items-center gap-4">
        <div>
          <Avatar variant={"lg"} />
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Share your thoughts here..."
            className="w-full border rounded outline-0 focus:border-brand-primary transition p-3"
          />
        </div>
      </div>
    </div>
  );
};
