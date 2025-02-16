import { Avatar } from "@/components/avatar";
import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { FiEdit, FiInbox } from "react-icons/fi";

const Messages = () => {
  return (
    <section className="bg-white border lg:rounded-xl">
      <Container>
        <h1 className="text-lg font-semibold">Messages</h1>
      </Container>
      <div className="border-t grid lg:grid-cols-12 divide-x">
        <div className="lg:col-span-4 relative">
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <div className="absolute bottom-5 right-5">
            <Button className="rounded-xl p-3 py-6 shadow-2xl">
              <FiEdit />
              <span className="">New Message</span>
            </Button>
          </div>
        </div>
        <div className="lg:col-span-8">
          <Container>
            <ChatWindow isEmpty />
          </Container>
        </div>
      </div>
    </section>
  );
};

export default Messages;

type ChatWindowProps = {
  isEmpty?: boolean;
};
const ChatWindow = ({ isEmpty = true }: ChatWindowProps) => {
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
        <div>hello</div>
      )}
    </>
  );
};
const ChatItem = () => {
  return (
    <Container>
      <div className="flex items-center gap-4">
        <div>
          <Avatar variant={"sm"} />
        </div>
        <div className="grid text-sm overflow-clip w-full">
          <span className="font-medium">Bessie Cooper</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            Hi, Robert. I'm acing some challenges
          </span>
        </div>
      </div>
    </Container>
  );
};
