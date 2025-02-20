import { ChatWindow } from "@/components/chat-window";
import Container from "@/components/container";

const Chat = () => {
  return (
    <section className="bg-white border lg:rounded-xl">
      <div className="border-t grid lg:grid-cols-12 divide-x">
        <div className="lg:col-span-8">
          <Container>
            <ChatWindow />
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Chat;
