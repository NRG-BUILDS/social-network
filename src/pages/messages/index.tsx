import { Avatar } from "@/components/avatar";
import { ChatWindow } from "@/components/chat-window";
import Container from "@/components/container";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router";

const Messages = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
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
              <NewMessageBtn
                setShowSearchModal={setShowSearchModal}
                showSearchModal={showSearchModal}
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <Container>
              <ChatWindow />
            </Container>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="bg-white border lg:rounded-xl">
        <Container>
          <h1 className="text-lg font-semibold">Messages</h1>
        </Container>
        <div className="border-t grid lg:grid-cols-12 divide-x">
          <div className="lg:col-span-4 relative min-h-[80svh]">
            {Array.from({ length: 5 }).map((_, i) => (
              <Link to={"/messages/3"} key={i}>
                <ChatItem />
              </Link>
            ))}

            <div className="absolute bottom-5 right-5">
              <NewMessageBtn
                setShowSearchModal={setShowSearchModal}
                showSearchModal={showSearchModal}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Messages;

const ChatItem = () => {
  return (
    <Container className="hover:bg-neutral-50">
      <div className="flex items-center gap-4">
        <div>
          <Avatar variant={"sm"} />
        </div>
        <div className="grid text-sm overflow-clip w-full">
          <span className="font-medium">Bessie Cooper</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            Hi, Robert. I'm facing some challenges
          </span>
        </div>
      </div>
    </Container>
  );
};

const NewMessageBtn = ({
  setShowSearchModal,
  showSearchModal,
}: {
  setShowSearchModal: (bool: boolean) => void;
  showSearchModal: boolean;
}) => {
  return (
    <>
      <Button
        onClick={() => setShowSearchModal(true)}
        className="rounded-xl p-3 py-6 shadow-2xl"
      >
        <FiEdit />
        <span className="">New Message</span>
      </Button>

      <Modal
        isOpen={showSearchModal}
        onOpenChange={setShowSearchModal}
        title="Search Friends"
        useDrawerOnMobile
      >
        <div>
          <input
            type="text"
            className="p-3 bg-neutral-100 rounded block w-full"
            placeholder="Search..."
          />
          <div className="pt-6 pb-10">
            <ChatItem />
            <ChatItem />
            <ChatItem />
          </div>
        </div>
      </Modal>
    </>
  );
};
