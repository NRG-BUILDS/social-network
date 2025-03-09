export type Chat = {
  id: string;
  name: string;
  owner: {
    name: string;
    username: string;
    avatarUrl: string;
  };
  cType: "DM" | "GROUP"; // Adjust if there are more types
  description: string;
  imageUrl: string;
  latestMessage?: {
    sender: {
      name: string;
      username: string;
      avatarUrl: string;
    };
    text: string;
    fileUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
};

interface Sender {
  name: string;
  username: string;
  avatarUrl: string;
}

interface FileUploadData {
  publicId: string;
  signature: string;
  timestamp: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender: Sender;
  text: string;
  fileUrl?: string;
  createdAt: string;
  updatedAt: string;
  fileUploadData?: FileUploadData;
}
