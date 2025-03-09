import { FiCheck, FiInbox, FiSend } from "react-icons/fi";
import { Avatar } from "./avatar";
import Container from "./container";
import { ScrollArea } from "./ui/scroll-area";
import { useState } from "react";
import { Message } from "@/types/chats";

type ChatWindowProps = {
  chats?: Message[];
  handleSend: (text: string) => void;
};

const response = {
  conversationId: "conv_001",
  participants: [
    {
      id: "user_001",
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "user_002",
      name: "Jane Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
  ],
  messages: [
    {
      id: "msg_001",
      senderId: "user_001",
      content: "Hey, how are you?",
      timestamp: "2025-02-15T12:00:00Z",
      read: true,
    },
    {
      id: "msg_002",
      senderId: "user_002",
      content: "I'm good! How about you?",
      timestamp: "2025-02-15T12:05:00Z",
      read: true,
    },
    {
      id: "msg_003",
      senderId: "user_001",
      content: "Doing great, thanks!",
      timestamp: "2025-02-15T12:10:00Z",
      read: false,
    },
    {
      id: "msg_004",
      senderId: "user_001",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et optio rerum nesciunt magni, explicabo nulla maiores commodi incidunt dolores, dolore illo fuga velit laborum modi asperiores veniam eum quasi quis?",
      timestamp: "2025-02-15T12:10:00Z",
      read: false,
    },
    {
      id: "msg_005",
      senderId: "user_002",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et optio rerum nesciunt magni, explicabo nulla maiores commodi incidunt dolores, dolore illo fuga velit laborum modi asperiores veniam eum quasi quis?",
      timestamp: "2025-02-15T12:10:00Z",
      read: false,
    },
    {
      id: "msg_005",
      senderId: "user_002",
      content:
        "Et optio rerum nesciunt magni, explicabo nulla maiores commodi incidunt dolores, dolore illo fuga velit laborum modi asperiores veniam eum quasi quis?",
      timestamp: "2025-02-15T12:10:00Z",
      read: false,
    },
    {
      id: "msg_004",
      senderId: "user_001",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et optio rerum nesciunt magni,  laborum modi asperiores veniam eum quasi quis?",
      timestamp: "2025-02-15T12:10:00Z",
      read: false,
    },
  ],
};

function formatTimestamp(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const isSameDay = date.toDateString() === now.toDateString();

  if (isSameDay) {
    return date.toTimeString().slice(0, 5); // "18:35"
  } else {
    return date.toLocaleString("en-US", {
      weekday: "short", // "Sun"
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // 24-hour format
    }); // "Sun, 18:25"
  }
}

export const ChatWindow = ({ chats, handleSend }: ChatWindowProps) => {
  const myId = "emmanuel-omolaju";

  const [text, setText] = useState("");
  return (
    <>
      {!chats ? (
        <section className=" min-h-[80svh] flex items-center justify-center">
          <div className="flex flex-col items-center text-center gap-2">
            <FiInbox size={76} className="text-neutral-400" />
            <h2 className="font-semibold text-neutral-900">Your messages</h2>
            <p className="text-neutral-500">
              Select a person to display their chat or start a new conversation.
            </p>
          </div>
        </section>
      ) : !chats.length ? (
        <section className=" min-h-[80svh] flex items-center justify-center">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-8xl">👋</span>
            <h2 className="font-semibold text-neutral-900">Say hello</h2>
            <p className="text-neutral-500">
              No messages here yet. Start a new conversation.
            </p>

            <InputBox text={text} setText={setText} onSend={handleSend} />
          </div>
        </section>
      ) : (
        <div className="flex w-full items-end">
          <div className="grid w-full ">
            <div className="pb-5 border-b">
              <Avatar
                name={"David Adams"}
                img="https://i.pravatar.cc/150?img=5"
                role="Last seen: 21:00"
              />
            </div>
            <ScrollArea className="h-[70svh] lg:h-[65svh]">
              {chats.map((msg, index) => (
                <div
                  className={`flex w-full gap-2 ${
                    msg.sender.username === myId
                      ? "justify-end "
                      : "justify-start"
                  } ${
                    index !== 0 &&
                    msg.sender.username ===
                      response.messages[index - 1].senderId
                      ? " mt-1 "
                      : " mt-4"
                  }`}
                >
                  <div className="flex items-start">
                    {msg.sender.username !== myId && (
                      <div>
                        <Avatar variant={"xs"} />
                      </div>
                    )}
                  </div>
                  <div>
                    <div
                      className={`p-3 text-sm rounded-xl w-fit max-w-[270px] relative ${
                        msg.sender.username === myId
                          ? "bg-brand-primary text-white rounded-tr-none "
                          : "bg-brand-primary/20 rounded-tl-none "
                      }`}
                    >
                      {msg.text}
                    </div>
                    <div className="mt-1 opacity-50 flex text-xs w-full justify-end items-center gap-1 text-right">
                      <span>{formatTimestamp(msg.updatedAt)}</span>
                      <FiCheck />
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
            <InputBox text={text} setText={setText} onSend={handleSend} />
          </div>
        </div>
      )}
    </>
  );
};

type InputBoxProps = {
  text: string;
  setText: (text: string) => void;
  onSend: (text: string) => void;
};
const InputBox = ({ text, setText, onSend }: InputBoxProps) => {
  return (
    <Container className="z-[99] !p-0 !pt-1 w-full bg-white">
      <div className="w-full flex border rounded-lg items-center">
        <input
          type="text"
          placeholder="Type a message..."
          className="p-3 w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => onSend(text)}
          disabled={!text.trim()}
          className="p-3"
        >
          <FiSend
            size={24}
            className="text-brand-primary disabled:text-neutral-400"
          />
        </button>
      </div>
    </Container>
  );
};

export default InputBox;
