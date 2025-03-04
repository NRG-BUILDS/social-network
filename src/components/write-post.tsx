import useRequest from "@/hooks/useRequest";
import { MyAvatar } from "./avatar";
import Container from "./container";
import { Button } from "./ui/button";
import { FiImage } from "react-icons/fi";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";

// interface PostCardProps {
//   size?: "full" | "small";
// }
interface FormType {
  text: string | null;
  fileType: string | null;
}
const WritePostCard = () => {
  const [form, setForm] = useState<FormType>({ text: null, fileType: null });
  const { loading, error, makeRequest } = useRequest("/feed/posts");

  useEffect(() => {
    if (error) {
      toast.error("Failed to create toast", {
        description: "An unknown error has occured.",
      });
    }
  }, [error]);

  const handlePost = async () => {
    const body = {
      text: form.text ? form.text.trim() : null,
      fileType: form.fileType,
    };
    const res = await makeRequest(body, "POST");
    if (res) {
      console.log(res);
      setForm({ text: null, fileType: null });
    }
  };
  return (
    <Container className="bg-white border rounded ">
      <div className="py-3 flex items-start gap-4">
        <div className="rounded-full min-w-10 size-10 mt-3 bg-gray-400"></div>
        <div className="w-full">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={form.text || ""}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="w-full border-b outline-0 focus:border-brand-primary transition py-5"
          />
          <div className="py-5 flex justify-between">
            <Button variant={"ghost"} className="px-0">
              <FiImage />
              <span>Add Media</span>
            </Button>
            <Button
              onClick={handlePost}
              loading={loading}
              disabled={!form.text && !form.fileType}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default WritePostCard;

export const WriteComment = ({
  onCommentClick,
  loading,
}: {
  onCommentClick: (e: string) => void;
  loading: boolean;
}) => {
  const [comment, setComment] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setComment(value);
  };
  const handleClick = () => {
    onCommentClick(comment);
    setComment("");
  };
  return (
    <Container className="bg-white border-t">
      <div className="py-3 flex items-start lg:items-center gap-4">
        <div className="">
          <MyAvatar variant={"base"} />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4 lg:items-center items-end lg:border rounded *:focus:border-brand-primary transition md:p-3">
          <input
            type="text"
            value={comment}
            onChange={handleChange}
            placeholder="Share your thoughts here..."
            className="w-full  focus:ring-green-500 border p-2 transition"
          />
          <Button
            loading={loading}
            data-state={comment.trim() ? "inactive" : "active"}
            className="data-[state=active]:!sr-only transition-all"
            disabled={!comment.trim()}
            onClick={handleClick}
          >
            Reply
          </Button>
        </div>
      </div>
    </Container>
  );
};
