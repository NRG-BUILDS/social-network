import useRequest from "@/hooks/useRequest";
import { Avatar } from "./avatar";
import Container from "./container";
import { Button } from "./ui/button";
import { FiImage } from "react-icons/fi";
import { useEffect, useState } from "react";
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
export const WriteComment = () => {
  return (
    <Container className="bg-white">
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
    </Container>
  );
};
