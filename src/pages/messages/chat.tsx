import { ChatWindow } from "@/components/chat-window";
import { LoadingScreen } from "@/components/loader";
import useRequest from "@/hooks/useRequest";
import useWebSocket from "@/hooks/useWebSocket";
import { Message } from "@/types/chats";
import { useLayoutEffect, useState } from "react";
import { useParams } from "react-router";

const Chat = () => {
  const { username } = useParams();
  const { chatId: chatIdParam } = useParams();
  const { makeRequest, loading, error } = useRequest(
    `/chats${chatIdParam ? `/${chatIdParam}` : null}`
  );
  const { sendMessage } = useWebSocket(
    `/chats${chatIdParam ? `/${chatIdParam}` : null}`
  );

  const [chats, setChats] = useState<Message[]>([]);
  const [chatId, setChatId] = useState<string | undefined>(chatIdParam);

  useLayoutEffect(() => {
    if (chatId) {
      makeRequest().then((res) => {
        setChats([...res.data.messages.items]);
      });
    }
  }, [chatId]);

  const handleSend = (text: string) => {
    if (!chatId && username) {
      makeRequest({ text: text, username: username }, "POST").then((res) => {
        setChats([res.data, ...chats]);
        setChatId(res.data.chatId);
      });
    }
    if (chatId) {
      sendMessage({ chatId, text });
    }
    return;
  };

  if (error || loading) {
    return <LoadingScreen loading={loading} error={error} />;
  }
  return (
    <section className="bg-white border lg:rounded-xl">
      <div className="border-t grid lg:grid-cols-12 divide-x">
        <div className="lg:col-span-8">
          <div className="p-2 md:p-5">
            <ChatWindow chats={chats} handleSend={handleSend} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
