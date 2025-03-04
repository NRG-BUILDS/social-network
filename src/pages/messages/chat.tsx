import { ChatWindow } from "@/components/chat-window";

const Chat = () => {
  return (
    <section className="bg-white border lg:rounded-xl">
      <div className="border-t grid lg:grid-cols-12 divide-x">
        <div className="lg:col-span-8">
          <div className="p-2 md:p-5">
            <ChatWindow />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chat;
