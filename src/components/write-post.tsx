import useRequest from "@/hooks/useRequest";
import { MyAvatar } from "./avatar";
import Container from "./container";
import { Button } from "./ui/button";
import { FiImage } from "react-icons/fi";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { generateThumbnail } from "@/lib/helperFunctions";
import { LuX } from "react-icons/lu";

interface FormType {
  text: string | null;
  fileType: string | null;
}
const WritePostCard = () => {
  const [form, setForm] = useState<FormType>({ text: null, fileType: null });
  const [_, setFile] = useState<File | null>();
  const { loading, error, makeRequest } = useRequest("/feed/posts");

  useEffect(() => {
    if (error) {
      toast.error("Failed to create toast", {
        description: "An unknown error has occured.",
      });
    }
  }, [error]);

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setForm({ ...form, fileType: "image/png" });
      setFile(files[0]);

      try {
        const imageBox = document.getElementById("imageBox");
        // Generate the thumbnail
        const thumbnailDataUrl = await generateThumbnail(files[0], [600, 600]); // Bound box size 200x200

        // Set the thumbnail as the background image of the profile div
        if (imageBox) {
          imageBox.style.backgroundImage = `url(${thumbnailDataUrl})`;
          imageBox.style.backgroundSize = "cover";
          imageBox.style.display = "block";
          imageBox.style.backgroundPosition = "center";
        }
      } catch (error) {
        console.error("Error generating thumbnail:", error);
      }
    }
  };
  const handleRemoveMedia = () => {
    const imageBox = document.getElementById("imageBox");
    if (imageBox) {
      imageBox.style.display = "none";
    }
    setFile(null);
    setForm({ ...form, fileType: null });
  };

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
      <div className="py-3 grid grid-cols-6  items-start gap-4">
        <div className="col-span-1 px-0 md:px-2 p-4">
          <MyAvatar />
        </div>
        <div className="w-full col-span-5">
          <input
            type="text"
            placeholder="What's on your mind?"
            value={form.text || ""}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="w-full border-b outline-0 focus:border-brand-primary transition py-5"
          />
          <div className="py-5 flex justify-between">
            <label htmlFor="fileInput">
              <input
                type="file"
                name="fileInput"
                id="fileInput"
                className="sr-only"
                accept="image/*"
                onChange={handleFileInput}
              />
              <span className="flex gap-2 items-center px-0">
                <FiImage />
                <span>Add Media</span>
              </span>
            </label>
            <Button
              onClick={handlePost}
              loading={loading}
              disabled={!form.text && !form.fileType}
            >
              Post
            </Button>
          </div>
          <div>
            <div
              id="imageBox"
              className="relative fade-out-5 fade-in hidden w-full aspect-square rounded-2xl"
            >
              <button
                onClick={handleRemoveMedia}
                className="absolute top-2 right-2 rounded-full flex items-center justify-center text-white text-xl p-2 bg-black/50"
              >
                <LuX />
              </button>
            </div>
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
            className="w-full outline-0 focus:ring-green-500 border md:border-0 p-2 md:p-0 transition"
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
