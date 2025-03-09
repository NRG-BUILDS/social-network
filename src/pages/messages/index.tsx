import { Avatar } from "@/components/avatar";
import { ChatWindow } from "@/components/chat-window";
import Container from "@/components/container";
import { LoadingScreen } from "@/components/loader";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import useMediaQuery from "@/hooks/useMediaQuery";
import useRequest from "@/hooks/useRequest";
import { Chat } from "@/types/chats";
import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router";

const Messages = () => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { loading, error, makeRequest } = useRequest("/chats");
  const [chats, setChats] = useState<Chat[]>([]);
  useEffect(() => {
    fetchChats();
  }, []);
  const fetchChats = async () => {
    makeRequest().then((res) => {
      if (res.status === "success") {
        setChats([...res.data.chats]);
      }
    });
  };

  if (loading || error) {
    return <LoadingScreen loading={loading} error={error} />;
  }
  if (isDesktop) {
    return (
      <section className="bg-white border lg:rounded-xl">
        <Container>
          <h1 className="text-lg font-semibold">Messages</h1>
        </Container>
        <div className="border-t grid lg:grid-cols-12 divide-x">
          <div className="lg:col-span-4 relative">
            {chats.length ? (
              <div>
                {chats.map((chat) => (
                  <ChatItem chat={chat} />
                ))}
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center w-full text-neutral-500 font-medium">
                <p>No chats yet</p>
              </div>
            )}
            <div className="absolute bottom-5 right-5">
              <NewMessageBtn
                setShowSearchModal={setShowSearchModal}
                showSearchModal={showSearchModal}
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <Container>
              <ChatWindow chats={[]} handleSend={(t) => console.log(t)} />
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
            {chats.map((chat, i) => (
              <Link to={`/messages/${chat.id}`} key={i}>
                <ChatItem chat={chat} />
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

const ChatItem = ({ chat }: { chat?: Chat }) => {
  return (
    <Container className="hover:bg-neutral-50!">
      <div className="flex items-center gap-4">
        <div>
          <Avatar variant={"sm"} />
        </div>
        <div className="grid text-sm overflow-clip w-full">
          <span className="font-medium">{chat?.owner.name}</span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {chat?.latestMessage?.text}
          </span>
        </div>
      </div>
    </Container>
  );
};

const NewChatItem = ({ user }: { user?: User }) => {
  return (
    <Container className="hover:bg-neutral-50!">
      <div className="flex items-center gap-4">
        <div>
          <Avatar variant={"sm"} />
        </div>
        <div className="grid text-sm overflow-clip w-full">
          <span className="font-medium">
            {user?.firstName + " " + user?.lastName}
          </span>
          <span className="whitespace-nowrap overflow-hidden text-ellipsis">
            {user?.bio}
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
  const { loading, error, makeRequest } = useRequest("/profiles");
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    const response = await makeRequest();
    if (response) {
      setUsers(response.data.users);
    }
  };

  if (loading || error) {
    return <LoadingScreen loading={loading} error={error} />;
  }
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
          <ScrollArea className="h-[60svh]">
            <div className="pt-6 pb-10">
              {users.map((user) => (
                <Link to={`/messages/new/${user.username}`} key={user.username}>
                  <NewChatItem user={user} />
                </Link>
              ))}
            </div>
          </ScrollArea>
        </div>
      </Modal>
    </>
  );
};
