const apiKey = import.meta.env.VITE_CLOUDINARY_API_KEY;
const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export const uploadImage = async (
  file: File,
  publicId: string,
  signature: string,
  timestamp: string
) => {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("public_id", publicId);
  fd.append("signature", signature);
  fd.append("api_key", apiKey || "");
  fd.append("timestamp", timestamp);
  console.log(fd);
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: fd,
      }
    );

    if (response.ok) {
      console.log("Image uploaded successfully");
      return true;
    } else {
      console.error("Image upload failed");
      return false;
    }
  } catch (error) {
    console.error("Image upload error:", error);
    return false;
  }
};
