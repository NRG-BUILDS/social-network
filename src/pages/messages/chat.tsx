import { ChatWindow } from "@/components/chat-window";
import useRequest from "@/hooks/useRequest";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const Chat = () => {
  const { username } = useParams();
  // const { chatId } = useParams();
  const { makeRequest } = useRequest(`/chats/${username}`);
  const [chats, _] = useState([]);
  useEffect(() => {
    makeRequest();
  }, []);
  return (
    <section className="bg-white border lg:rounded-xl">
      <div className="border-t grid lg:grid-cols-12 divide-x">
        <div className="lg:col-span-8">
          <div className="p-2 md:p-5">
            <ChatWindow chats={chats} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
