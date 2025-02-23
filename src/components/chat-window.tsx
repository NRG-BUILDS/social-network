import { FiCheck, FiInbox, FiSend } from "react-icons/fi";
import { Button } from "./ui/button";
import { Avatar } from "./avatar";
import Container from "./container";
import { ScrollArea } from "./ui/scroll-area";

type ChatWindowProps = {
  isEmpty?: boolean;
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

export const ChatWindow = ({ isEmpty = false }: ChatWindowProps) => {
  const myId = "user_001";
  return (
    <>
      {isEmpty ? (
        <section className="min-h-[80svh] flex items-center justify-center">
          <div className="flex flex-col items-center text-center gap-2">
            <FiInbox size={76} className="text-neutral-400" />
            <h2 className="font-semibold text-neutral-900">Your messages</h2>
            <p className="text-neutral-500">
              Select a person to display their chat or start a new conversation.
            </p>
            <Button className="mt-2">New Message</Button>
          </div>
        </section>
      ) : (
        <div className="h-[80lvh] lg:h-[80svh] flex w-full items-end">
          <div className="grid w-full h-[80svh]">
            <div className="pb-5 border-b">
              <Avatar
                name={"David Adams"}
                img="https://i.pravatar.cc/150?img=5"
                role="Last seen: 21:00"
              />
            </div>
            <ScrollArea>
              {response.messages.map((msg, index) => (
                <div
                  className={`flex w-full gap-2 ${
                    msg.senderId === myId ? "justify-end " : "justify-start"
                  } ${
                    index !== 0 &&
                    msg.senderId === response.messages[index - 1].senderId
                      ? " mt-1 "
                      : " mt-4"
                  }`}
                >
                  <div className="flex items-start">
                    {msg.senderId !== myId && (
                      <div>
                        <Avatar />
                      </div>
                    )}
                  </div>
                  <div
                    className={`p-5 rounded-xl w-fit max-w-[420px] relative ${
                      msg.senderId === myId
                        ? "bg-brand-primary text-white"
                        : "bg-brand-primary/20 "
                    }`}
                  >
                    {msg.content}
                    <div className="absolute bottom-2 right-2 flex text-xs w-full justify-end items-center gap-1 text-right">
                      <span>22:50</span>
                      <FiCheck />
                    </div>
                  </div>
                  {msg.senderId === myId && (
                    <div>
                      <Avatar />
                    </div>
                  )}
                </div>
              ))}
            </ScrollArea>
            <Container className="!p-0 !pt-1 w-full bg-white">
              <div className="w-full flex border rounded-lg items-center">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="p-3 w-full"
                />
                <button className="p-3">
                  <FiSend size={24} className="text-neutral-400" />
                </button>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
};
